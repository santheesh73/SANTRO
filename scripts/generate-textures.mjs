import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard CRC32 table implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcVal = crc32(Buffer.concat([typeBuf, data]));
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

/**
 * Creates a valid 8-bit RGBA PNG image buffer without external dependencies.
 * @param {number} width 
 * @param {number} height 
 * @param {(x: number, y: number) => [number, number, number, number?]} pixelFn 
 * @returns {Buffer}
 */
function generatePNG(width, height, pixelFn) {
  const rowStride = width * 4 + 1;
  const rawData = Buffer.alloc(rowStride * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowStride;
    rawData[rowOffset] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const [r, g, b, a = 255] = pixelFn(x, y);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = Math.max(0, Math.min(255, Math.round(r)));
      rawData[pixelOffset + 1] = Math.max(0, Math.min(255, Math.round(g)));
      rawData[pixelOffset + 2] = Math.max(0, Math.min(255, Math.round(b)));
      rawData[pixelOffset + 3] = Math.max(0, Math.min(255, Math.round(a)));
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk: 13 bytes
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth: 8
  ihdrData[9] = 6; // color type: 6 (RGBA)
  ihdrData[10] = 0; // compression method
  ihdrData[11] = 0; // filter method
  ihdrData[12] = 0; // interlace method
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT chunk: compressed raw data
  const compressedData = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressedData);

  // IEND chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Pseudo-random noise utilities
function hash(x, y) {
  let h = (x * 374761393 + y * 668265263) ^ 0x5bf03635;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}

/**
 * Toroidal (seamlessly periodic) smooth noise.
 * Guaranteed to wrap cleanly across periodX and periodY boundaries.
 */
function periodicSmoothNoise(x, y, periodX, periodY) {
  const ix0 = Math.floor(x);
  const iy0 = Math.floor(y);
  const x0 = ((ix0 % periodX) + periodX) % periodX;
  const y0 = ((iy0 % periodY) + periodY) % periodY;
  const x1 = (x0 + 1) % periodX;
  const y1 = (y0 + 1) % periodY;
  const dx = x - ix0;
  const dy = y - iy0;
  const sx = dx * dx * (3 - 2 * dx);
  const sy = dy * dy * (3 - 2 * dy);

  const n00 = hash(x0, y0);
  const n10 = hash(x1, y0);
  const n01 = hash(x0, y1);
  const n11 = hash(x1, y1);

  const nx0 = n00 * (1 - sx) + n10 * sx;
  const nx1 = n01 * (1 - sx) + n11 * sx;
  return nx0 * (1 - sy) + nx1 * sy;
}

/**
 * Toroidal (seamlessly periodic) fractal brownian motion.
 */
function periodicFbm(x, y, periodX, periodY, octaves = 4) {
  let val = 0;
  let amp = 0.5;
  let px = periodX;
  let py = periodY;
  let curX = x;
  let curY = y;
  for (let i = 0; i < octaves; i++) {
    val += periodicSmoothNoise(curX, curY, px, py) * amp;
    curX *= 2.0;
    curY *= 2.0;
    px *= 2;
    py *= 2;
    amp *= 0.5;
  }
  return val;
}

/**
 * Converts a tangent-space 3D normal vector (nx, ny, nz) into [R, G, B, 255].
 * Automatically normalizes the vector.
 */
function packNormal(vx, vy, vz) {
  const len = Math.sqrt(vx * vx + vy * vy + vz * vz) || 1.0;
  const nx = vx / len;
  const ny = vy / len;
  const nz = vz / len;
  return [
    Math.round((nx * 0.5 + 0.5) * 255),
    Math.round((ny * 0.5 + 0.5) * 255),
    Math.round((nz * 0.5 + 0.5) * 255),
    255,
  ];
}

/**
 * Generates all 12 reference-calibrated PBR architectural textures.
 */
export function generateAllTextures() {
  const outputDir = path.resolve(__dirname, '../public/3d/textures');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('='.repeat(70));
  console.log(' SANTRO M4 — ARCHITECTURAL PBR TEXTURE GENERATION');
  console.log('='.repeat(70));

  const textures = [
    // 1. Stucco Plaster Normal (512x512): Ultra-fine seamless micro-stucco grain
    {
      filename: 'stucco_normal.png',
      width: 512,
      height: 512,
      generate: (x, y) => {
        // Sample heightfield via periodic multi-frequency noise
        const px = 64;
        const py = 64;
        const scale = 0.125;
        const h0 = periodicFbm(x * scale, y * scale, px, py, 4);
        const hR = periodicFbm((x + 1) * scale, y * scale, px, py, 4);
        const hL = periodicFbm((x - 1) * scale, y * scale, px, py, 4);
        const hU = periodicFbm(x * scale, (y + 1) * scale, px, py, 4);
        const hD = periodicFbm(x * scale, (y - 1) * scale, px, py, 4);

        const dhx = (hR - hL) * 3.5;
        const dhy = (hU - hD) * 3.5;
        return packNormal(-dhx, -dhy, 1.0);
      },
    },
    // 2. Stucco Plaster Roughness (512x512): Restrained diffuse scatter 0.80 - 0.84
    {
      filename: 'stucco_roughness.png',
      width: 512,
      height: 512,
      generate: (x, y) => {
        const val = periodicFbm(x * 0.03125, y * 0.03125, 16, 16, 3);
        const rough = Math.round(204 + val * 12); // ~0.80 - 0.85
        return [rough, rough, rough, 255];
      },
    },
    // 3. Travertine / Limestone Normal (1024x1024): 1.2m x 0.6m tile seams + micro pores
    {
      filename: 'travertine_normal.png',
      width: 1024,
      height: 1024,
      generate: (x, y) => {
        // Tile grid seams: 128 x 64 pixels per tile (2:1 proportion)
        const tileW = 128;
        const tileH = 64;
        let dx = x % tileW;
        if (dx > tileW / 2) dx -= tileW; // signed distance from seam center [-63..64]
        let dy = y % tileH;
        if (dy > tileH / 2) dy -= tileH; // signed distance from seam center [-31..32]

        let vx = 0;
        let vy = 0;
        let vz = 1.0;

        // 3mm recessed V-groove joint profile (opposing slope vectors)
        if (Math.abs(dx) <= 2) {
          vx -= (dx / 2.0) * 0.45;
          vz = 0.85;
        }
        if (Math.abs(dy) <= 2) {
          vy -= (dy / 2.0) * 0.45;
          vz = 0.85;
        }

        // Add subtle porous mineral relief
        const h0 = periodicFbm(x * 0.0625, y * 0.0625, 64, 64, 3);
        const hR = periodicFbm((x + 1) * 0.0625, y * 0.0625, 64, 64, 3);
        const hU = periodicFbm(x * 0.0625, (y + 1) * 0.0625, 64, 64, 3);
        vx += (h0 - hR) * 0.15;
        vy += (h0 - hU) * 0.15;

        return packNormal(vx, vy, vz);
      },
    },
    // 4. Travertine Roughness (1024x1024): Honed stone mineral scatter 0.34 - 0.40
    {
      filename: 'travertine_roughness.png',
      width: 1024,
      height: 1024,
      generate: (x, y) => {
        const vein = periodicFbm(x * 0.02, y * 0.04, 20, 40, 3);
        const tileW = 128;
        const tileH = 64;
        let dx = x % tileW;
        if (dx > tileW / 2) dx -= tileW;
        let dy = y % tileH;
        if (dy > tileH / 2) dy -= tileH;
        const seam = Math.abs(dx) <= 1 || Math.abs(dy) <= 1;

        let rough = Math.round(87 + vein * 16); // ~0.34 - 0.40
        if (seam) rough = 145; // Recessed grout line is more matte
        return [rough, rough, rough, 255];
      },
    },
    // 5. Walnut Wood Normal (1024x1024): Directional longitudinal timber grain
    {
      filename: 'walnut_normal.png',
      width: 1024,
      height: 1024,
      generate: (x, y) => {
        // High frequency vertical grain perturbed by smooth fiber wavy deviations
        const wave = periodicSmoothNoise(x * 0.015625, y * 0.0078125, 16, 8) * 4.0;
        const u = (x / 1024) * Math.PI * 128 + wave;
        const vx = Math.cos(u) * 0.22;
        const vy = 0.0;
        const vz = 0.97;
        return packNormal(vx, vy, vz);
      },
    },
    // 6. Walnut Wood Roughness (1024x1024): Satin hand-rubbed oil finish 0.38 - 0.44
    {
      filename: 'walnut_roughness.png',
      width: 1024,
      height: 1024,
      generate: (x, y) => {
        const streak = periodicSmoothNoise(x * 0.03125, y * 0.00390625, 32, 4);
        const rough = Math.round(98 + streak * 15); // ~0.38 - 0.44
        return [rough, rough, rough, 255];
      },
    },
    // 7. Board-Formed Concrete Normal (1024x1024): 150mm horizontal formwork planks
    {
      filename: 'concrete_normal.png',
      width: 1024,
      height: 1024,
      generate: (x, y) => {
        const plankH = 128; // Formwork plank height
        let dy = y % plankH;
        if (dy > plankH / 2) dy -= plankH; // Signed distance from seam [-63..64]

        let vx = 0;
        let vy = 0;
        let vz = 1.0;

        if (Math.abs(dy) <= 3) {
          // Centered V-groove formwork bevel with opposing slope vectors
          vy = -(dy / 3.0) * 0.50;
          vz = 0.82;
        } else {
          // Horizontal wood grain transferred from timber molds
          const mold = periodicSmoothNoise(x * 0.03125, y * 0.0078125, 32, 8);
          vy = Math.sin(y * 0.6 + mold * 3.0) * 0.12;
        }

        // Add porous aggregate relief
        const pore = periodicFbm(x * 0.0625, y * 0.0625, 64, 64, 2);
        vx += (pore - 0.5) * 0.08;

        return packNormal(vx, vy, vz);
      },
    },
    // 8. Board-Formed Concrete Roughness (1024x1024): Matte mineral scatter 0.78 - 0.84
    {
      filename: 'concrete_roughness.png',
      width: 1024,
      height: 1024,
      generate: (x, y) => {
        const plankH = 128;
        const plankIndex = Math.floor(y / plankH);
        const plankVariation = (hash(plankIndex * 13, 7) - 0.5) * 12;
        const micro = periodicFbm(x * 0.03125, y * 0.03125, 32, 32, 3) * 12;
        const rough = Math.round(202 + plankVariation + micro);
        return [rough, rough, rough, 255];
      },
    },
    // 9. Water Ripple Normal Layer 1 (512x512): Calm capillary wave displacement
    {
      filename: 'water_normal_1.png',
      width: 512,
      height: 512,
      generate: (x, y) => {
        const u = (x / 512) * Math.PI * 8;
        const v = (y / 512) * Math.PI * 8;
        // Smooth analytical trochoidal capillary gradient
        const waveX = Math.sin(u + Math.cos(v * 0.8)) * 0.22;
        const waveY = Math.cos(v + Math.sin(u * 0.8)) * 0.22;
        return packNormal(waveX, waveY, 0.95);
      },
    },
    // 10. Water Ripple Normal Layer 2 (512x512): Opposing wind counter-wave
    {
      filename: 'water_normal_2.png',
      width: 512,
      height: 512,
      generate: (x, y) => {
        const u = (x / 512) * Math.PI * 12;
        const v = (y / 512) * Math.PI * 12;
        const waveX = Math.cos(u * 1.2 - v * 0.7) * 0.18;
        const waveY = Math.sin(v * 1.1 + u * 0.6) * 0.18;
        return packNormal(waveX, waveY, 0.97);
      },
    },
    // 11. Washed River Pebble Gravel Normal (512x512): Dense rounded aggregate
    {
      filename: 'gravel_normal.png',
      width: 512,
      height: 512,
      generate: (x, y) => {
        const cell = 24;
        const cx = Math.floor(x / cell) * cell + cell / 2;
        const cy = Math.floor(y / cell) * cell + cell / 2;
        const dx = x - cx;
        const dy = y - cy;
        const r = Math.sqrt(dx * dx + dy * dy);
        const maxR = cell * 0.45;
        if (r < maxR) {
          const vx = (dx / maxR) * 0.65;
          const vy = (dy / maxR) * 0.65;
          const vz = Math.sqrt(Math.max(0, 1 - (r / maxR) ** 2));
          return packNormal(vx, vy, vz);
        }
        return packNormal(0, 0, 1.0);
      },
    },
    // 12. Arid Ground Soil Normal (512x512): Earth and terrain micro-relief
    {
      filename: 'ground_normal.png',
      width: 512,
      height: 512,
      generate: (x, y) => {
        const px = 32;
        const py = 32;
        const scale = 0.0625;
        const hR = periodicFbm((x + 1) * scale, y * scale, px, py, 4);
        const hL = periodicFbm((x - 1) * scale, y * scale, px, py, 4);
        const hU = periodicFbm(x * scale, (y + 1) * scale, px, py, 4);
        const hD = periodicFbm(x * scale, (y - 1) * scale, px, py, 4);
        const vx = -(hR - hL) * 2.8;
        const vy = -(hU - hD) * 2.8;
        return packNormal(vx, vy, 1.0);
      },
    },
  ];

  let totalBytes = 0;
  for (const tex of textures) {
    const destPath = path.join(outputDir, tex.filename);
    const pngBuffer = generatePNG(tex.width, tex.height, tex.generate);
    fs.writeFileSync(destPath, pngBuffer);
    totalBytes += pngBuffer.length;
    console.log(
      `[Texture Generated] ${tex.filename.padEnd(24)} | ${tex.width}x${tex.height} | ${(pngBuffer.length / 1024).toFixed(1).padStart(6)} KB`
    );
  }

  console.log(`[Summary] Total PBR Textures: ${textures.length}`);
  console.log(`[Summary] Total Compressed Size: ${(totalBytes / 1024).toFixed(2)} KB (${(totalBytes / (1024 * 1024)).toFixed(2)} MB)`);
  console.log('='.repeat(70));
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith('generate-textures.mjs')) {
  generateAllTextures();
}

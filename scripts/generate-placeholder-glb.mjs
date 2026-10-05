import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates a valid glTF 2.0 binary (.glb) file containing a metric placeholder box
 * to validate external GLB loading in React Three Fiber without requiring external DCC software.
 */
function createPlaceholderGLB() {
  // Minimal valid glTF 2.0 scene with a box geometry
  // 8 vertices for a 1x1x1 unit cube:
  const positions = new Float32Array([
    // Front face
    -1, -1,  1,   1, -1,  1,   1,  1,  1,  -1,  1,  1,
    // Back face
    -1, -1, -1,  -1,  1, -1,   1,  1, -1,   1, -1, -1,
    // Top face
    -1,  1, -1,  -1,  1,  1,   1,  1,  1,   1,  1, -1,
    // Bottom face
    -1, -1, -1,   1, -1, -1,   1, -1,  1,  -1, -1,  1,
    // Right face
     1, -1, -1,   1,  1, -1,   1,  1,  1,   1, -1,  1,
    // Left face
    -1, -1, -1,  -1, -1,  1,  -1,  1,  1,  -1,  1, -1,
  ]);

  const indices = new Uint16Array([
     0,  1,  2,   0,  2,  3, // front
     4,  5,  6,   4,  6,  7, // back
     8,  9, 10,   8, 10, 11, // top
    12, 13, 14,  12, 14, 15, // bottom
    16, 17, 18,  16, 18, 19, // right
    20, 21, 22,  20, 22, 23, // left
  ]);

  // Combine binary buffers: positions (24 * 12 bytes = 288 bytes) + indices (36 * 2 bytes = 72 bytes)
  const posBytes = Buffer.from(positions.buffer);
  const idxBytes = Buffer.from(indices.buffer);

  // Align to 4 bytes
  const binBuffer = Buffer.concat([posBytes, idxBytes]);
  const binPadding = (4 - (binBuffer.length % 4)) % 4;
  const paddedBin = Buffer.concat([binBuffer, Buffer.alloc(binPadding, 0)]);

  const gltfJSON = {
    asset: {
      version: '2.0',
      generator: 'SANTRO M1 Pipeline Generator',
    },
    scene: 0,
    scenes: [
      {
        name: 'ValidationScene',
        nodes: [0],
      },
    ],
    nodes: [
      {
        name: 'PLACEHOLDER_House_Massing',
        mesh: 0,
        translation: [0, 1.5, 0],
        scale: [12, 3, 8],
      },
    ],
    meshes: [
      {
        name: 'GEO_Placeholder_Box',
        primitives: [
          {
            attributes: {
              POSITION: 0,
            },
            indices: 1,
            material: 0,
          },
        ],
      },
    ],
    materials: [
      {
        name: 'MAT_Placeholder_Stucco',
        pbrMetallicRoughness: {
          baseColorFactor: [0.925, 0.921, 0.894, 1.0],
          roughnessFactor: 0.82,
          metallicFactor: 0.0,
        },
      },
    ],
    accessors: [
      {
        bufferView: 0,
        byteOffset: 0,
        componentType: 5126, // FLOAT
        count: 24,
        type: 'VEC3',
        max: [1, 1, 1],
        min: [-1, -1, -1],
      },
      {
        bufferView: 1,
        byteOffset: 0,
        componentType: 5123, // UNSIGNED_SHORT
        count: 36,
        type: 'SCALAR',
        max: [23],
        min: [0],
      },
    ],
    bufferViews: [
      {
        buffer: 0,
        byteOffset: 0,
        byteLength: posBytes.length,
        target: 34962, // ARRAY_BUFFER
      },
      {
        buffer: 0,
        byteOffset: posBytes.length,
        byteLength: idxBytes.length,
        target: 34963, // ELEMENT_ARRAY_BUFFER
      },
    ],
    buffers: [
      {
        byteLength: binBuffer.length,
      },
    ],
  };

  const jsonString = JSON.stringify(gltfJSON);
  const jsonBuffer = Buffer.from(jsonString, 'utf8');
  const jsonPadding = (4 - (jsonBuffer.length % 4)) % 4;
  const paddedJson = Buffer.concat([jsonBuffer, Buffer.alloc(jsonPadding, 0x20)]); // padded with spaces

  // Calculate header lengths
  const headerLength = 12;
  const jsonChunkHeaderLength = 8;
  const binChunkHeaderLength = 8;
  const totalLength = headerLength + jsonChunkHeaderLength + paddedJson.length + binChunkHeaderLength + paddedBin.length;

  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0); // "glTF"
  header.writeUInt32LE(2, 4);          // version 2
  header.writeUInt32LE(totalLength, 8); // total length

  const jsonChunkHeader = Buffer.alloc(8);
  jsonChunkHeader.writeUInt32LE(paddedJson.length, 0);
  jsonChunkHeader.writeUInt32LE(0x4e4f534a, 4); // "JSON"

  const binChunkHeader = Buffer.alloc(8);
  binChunkHeader.writeUInt32LE(paddedBin.length, 0);
  binChunkHeader.writeUInt32LE(0x004e4942, 4); // "BIN\0"

  const finalGLB = Buffer.concat([
    header,
    jsonChunkHeader,
    paddedJson,
    binChunkHeader,
    paddedBin,
  ]);

  const outputDir = path.resolve(__dirname, '../public/3d/placeholders');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'house_placeholder.glb');
  fs.writeFileSync(outputPath, finalGLB);
  console.log(`[GLB Generator] Successfully generated valid binary GLB: ${outputPath} (${finalGLB.length} bytes)`);
}

createPlaceholderGLB();

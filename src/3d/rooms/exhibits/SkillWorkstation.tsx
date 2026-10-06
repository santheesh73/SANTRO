'use client';

import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { skillsData } from '@/content/skills';
import { createDynamicCanvasTexture } from '../textures/createExhibitionTexture';

export function SkillWorkstation() {
  // 1. Monitor 01 Canvas Texture: System Topology & Telemetry
  const monitor01Texture = useMemo(() => {
    return createDynamicCanvasTexture(
      (ctx, width, height) => {
        // Dark Matte Terminal Header
        ctx.fillStyle = '#14161C';
        ctx.fillRect(0, 0, width, height);

        // Header
        ctx.fillStyle = '#00F0FF';
        ctx.fillRect(24, 24, 6, 20);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('ENGINEERING LAB // SYSTEM TOPOLOGY', 38, 39);

        ctx.fillStyle = '#8E8E93';
        ctx.font = '11px monospace';
        ctx.fillText('ACTIVE NODE: CLIENT_WEBGPU_INFERENCE_PIPELINE', width - 360, 39);

        // Divider
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.strokeRect(24, 52, width - 48, 1);

        // Telemetry Metrics Grid (Top Half)
        const metrics = [
          { label: 'LOCAL INFERENCE', val: 'SUB-42ms' },
          { label: 'EGRESS BANDWIDTH', val: '0 KB/s' },
          { label: 'GPU MEMORY ALLOC', val: '1.2 GB' },
          { label: 'PIPELINE FPS', val: '60.0 LOCKED' },
        ];
        const cardW = (width - 48 - 3 * 16) / 4;
        metrics.forEach((m, i) => {
          const cx = 24 + i * (cardW + 16);
          ctx.fillStyle = '#1A1D24';
          ctx.fillRect(cx, 68, cardW, 58);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.strokeRect(cx, 68, cardW, 58);

          ctx.fillStyle = '#8E8E93';
          ctx.font = '10px monospace';
          ctx.fillText(m.label, cx + 12, 88);

          ctx.fillStyle = '#00F0FF';
          ctx.font = 'bold 15px monospace';
          ctx.fillText(m.val, cx + 12, 112);
        });

        // Architecture Pipeline Flow Diagram (Bottom Half)
        ctx.fillStyle = '#1A1D24';
        ctx.fillRect(24, 142, width - 48, height - 166);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.strokeRect(24, 142, width - 48, height - 166);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '600 13px monospace';
        ctx.fillText('DISTRIBUTED EXECUTION GRAPH //', 40, 168);

        // Node sequence boxes
        const nodes = [
          { name: '1. USER INTENT', sub: 'Natural language stream' },
          { name: '2. LOCAL AST PARSER', sub: 'Grammar tree & token embedding' },
          { name: '3. WEBGPU ONNX KERNEL', sub: 'Quantized INT4 weights' },
          { name: '4. ZERO-COPY STREAM', sub: 'Sub-50ms reactive frame' },
        ];
        const nodeW = (width - 96 - 3 * 24) / 4;
        nodes.forEach((node, i) => {
          const nx = 40 + i * (nodeW + 24);
          ctx.fillStyle = '#222630';
          ctx.fillRect(nx, 185, nodeW, 70);
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
          ctx.strokeRect(nx, 185, nodeW, 70);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 11px monospace';
          ctx.fillText(node.name, nx + 10, 210);

          ctx.fillStyle = '#8E8E93';
          ctx.font = '10px monospace';
          ctx.fillText(node.sub, nx + 10, 235);

          // Arrow between nodes
          if (i < 3) {
            ctx.fillStyle = '#00F0FF';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('→', nx + nodeW + 8, 224);
          }
        });
      },
      { width: 1024, height: 512, backgroundColor: '#101216' }
    );
  }, []);

  // 2. Monitor 02 Canvas Texture: Core Code & Verification Diagnostics
  const monitor02Texture = useMemo(() => {
    return createDynamicCanvasTexture(
      (ctx, width, height) => {
        ctx.fillStyle = '#14161C';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#10B981';
        ctx.fillRect(24, 24, 6, 20);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('DIAGNOSTICS // VERIFICATION STATUS', 38, 39);

        ctx.fillStyle = '#10B981';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('ALL HEALTH CHECKS PASSING [0 ERRORS]', width - 340, 39);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.strokeRect(24, 52, width - 48, 1);

        // Terminal Log lines
        const lines = [
          '[INFO] Initializing WebGL 2.0 / WebGPU context with 16x MSAA buffer...',
          '[PASS] Vector index: 5,000,000 embeddings verified across HNSW graph hierarchy.',
          '[PASS] Transformer attention layer warmup: 18.2ms latency validated.',
          '[PASS] Catmull-Rom centripetal camera path continuity: 0.000m maximum error.',
          '[INFO] Micro-texture PBR budget: 12 normal/roughness assets within VRAM limit.',
          '[PASS] Spatial rooms registered: 10/10 verified with strict sequence order.',
          '[LIVE] Listening for user interaction across architectural exhibit bounds...',
        ];

        lines.forEach((line, i) => {
          ctx.fillStyle = line.includes('[PASS]')
            ? '#34D399'
            : line.includes('[LIVE]')
            ? '#60A5FA'
            : '#9CA3AF';
          ctx.font = '12px monospace';
          ctx.fillText(line, 36, 85 + i * 28);
        });
      },
      { width: 1024, height: 512, backgroundColor: '#101216' }
    );
  }, []);

  // 3. Technical Rack Canvas Texture: Verified Skill Domains
  const skillsRackTexture = useMemo(() => {
    return createDynamicCanvasTexture(
      (ctx, width, height) => {
        ctx.fillStyle = '#111317';
        ctx.fillRect(0, 0, width, height);

        // Title Header
        ctx.fillStyle = '#E5E5EA';
        ctx.font = 'bold 24px monospace';
        ctx.fillText('TECHNICAL CAPABILITY // DOMAINS', 36, 46);

        ctx.fillStyle = '#8E8E93';
        ctx.font = '12px monospace';
        ctx.fillText('VERIFIED PRODUCTION ARCHITECTURES', width - 300, 46);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.strokeRect(36, 62, width - 72, 1);

        // Grid of 6 domains (2 columns, 3 rows)
        const colW = (width - 72 - 32) / 2;
        const rowH = (height - 80 - 2 * 20) / 3;

        skillsData.forEach((domain, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          const x = 36 + col * (colW + 32);
          const y = 84 + row * (rowH + 20);

          // Domain Card Box
          ctx.fillStyle = '#181B22';
          ctx.fillRect(x, y, colW, rowH);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.strokeRect(x, y, colW, rowH);

          // Indicator pip
          ctx.fillStyle = '#00F0FF';
          ctx.fillRect(x + 16, y + 18, 4, 16);

          // Domain Name
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 15px monospace';
          ctx.fillText(domain.name, x + 28, y + 31);

          // Description
          ctx.fillStyle = '#8E8E93';
          ctx.font = '11px sans-serif';
          ctx.fillText(domain.description, x + 16, y + 54);

          // Skills Chips
          let chipX = x + 16;
          const chipY = y + 74;
          domain.skills.forEach((skill) => {
            ctx.font = 'bold 12px monospace';
            const sWidth = ctx.measureText(skill).width;
            const chipWidth = sWidth + 18;

            ctx.fillStyle = '#242833';
            ctx.fillRect(chipX, chipY, chipWidth, 24);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.strokeRect(chipX, chipY, chipWidth, 24);

            ctx.fillStyle = '#E5E5EA';
            ctx.fillText(skill, chipX + 9, chipY + 16);

            chipX += chipWidth + 8;
          });
        });
      },
      {
        width: 1024,
        height: 640,
        backgroundColor: '#111317',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 2,
      }
    );
  }, []);

  useEffect(() => {
    return () => {
      monitor01Texture?.dispose();
      monitor02Texture?.dispose();
      skillsRackTexture?.dispose();
    };
  }, [monitor01Texture, monitor02Texture, skillsRackTexture]);

  return (
    <group name="Engineering_Lab_Spatial_Exhibits">
      {/* 1. Screen 01 Display Overlay on Desk Monitor 01 (X: -4.2, Y: 1.05, Z: -9.5) */}
      {monitor01Texture && (
        <mesh position={[-4.2, 1.05, -9.478]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.63, 0.40]} />
          <meshBasicMaterial map={monitor01Texture} toneMapped={false} />
        </mesh>
      )}

      {/* 2. Screen 02 Display Overlay on Desk Monitor 02 (X: -4.9, Y: 1.05, Z: -9.6) with slight angle */}
      {monitor02Texture && (
        <mesh position={[-4.9, 1.05, -9.578]} rotation={[0, 0.12, 0]}>
          <planeGeometry args={[0.63, 0.40]} />
          <meshBasicMaterial map={monitor02Texture} toneMapped={false} />
        </mesh>
      )}

      {/* 3. Wall-Mounted Technical Stack Rack Display Stele (East interior partition of lab) */}
      <group position={[-2.4, 1.6, -11.5]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Dark Anodized Aluminum Stele Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.0, 1.35, 0.05]} />
          <meshStandardMaterial color="#1F1F21" roughness={0.28} metalness={0.9} />
        </mesh>

        {/* Display Canvas Texture */}
        {skillsRackTexture && (
          <mesh position={[0, 0, 0.026]}>
            <planeGeometry args={[1.96, 1.31]} />
            <meshBasicMaterial map={skillsRackTexture} toneMapped={false} />
          </mesh>
        )}

        {/* Hairline Cyan Indicator Bar */}
        <mesh position={[0, 0.66, 0.028]}>
          <boxGeometry args={[1.90, 0.008, 0.005]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
        </mesh>
      </group>
    </group>
  );
}

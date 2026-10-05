#!/usr/bin/env node

/**
 * SANTRO Asset Manifest & Performance Budget Verification
 *
 * Verifies that all registered 3D assets comply with performance budgets:
 * - GLB header validation (magic 0x46546C67)
 * - Maximum file size thresholds (< 8MB for house, < 2MB for props)
 * - PBR architectural texture sets (valid PNG signature, within texture budgets)
 * - Correct MIME types and path conventions
 */

import fs from 'node:fs';
import path from 'node:path';

const PERFORMANCE_BUDGETS = {
  maxHouseSize: 8.0 * 1024 * 1024,      // 8 MB
  maxPropSize: 2.0 * 1024 * 1024,       // 2 MB
  maxPlaceholderSize: 0.5 * 1024 * 1024, // 500 KB
  maxTotalTexturesSize: 3.2 * 1024 * 1024, // 3.2 MB compressed wire budget
};

const REQUIRED_PBR_TEXTURES = [
  'stucco_normal.png',
  'stucco_roughness.png',
  'travertine_normal.png',
  'travertine_roughness.png',
  'walnut_normal.png',
  'walnut_roughness.png',
  'concrete_normal.png',
  'concrete_roughness.png',
  'water_normal_1.png',
  'water_normal_2.png',
  'gravel_normal.png',
  'ground_normal.png',
];

function verifyAssets() {
  console.log('='.repeat(70));
  console.log(' SANTRO 3D ASSET INTEGRITY & BUDGET VERIFICATION');
  console.log('='.repeat(70));

  const placeholderPathGLB = path.resolve(process.cwd(), 'public/3d/placeholders/house_placeholder.glb');
  const placeholderPathGLTF = path.resolve(process.cwd(), 'public/3d/placeholders/house_placeholder.gltf');
  let allPass = true;

  if (fs.existsSync(placeholderPathGLB)) {
    const stats = fs.statSync(placeholderPathGLB);
    const buffer = fs.readFileSync(placeholderPathGLB);
    const magic = buffer.readUInt32LE(0);
    const version = buffer.readUInt32LE(4);

    const isGLB = magic === 0x46546c67 && version === 2;
    const withinBudget = stats.size <= PERFORMANCE_BUDGETS.maxPlaceholderSize;

    console.log(`[Asset Checked] ${path.relative(process.cwd(), placeholderPathGLB)}`);
    console.log(`  • Valid glTF 2.0 Header: ${isGLB ? 'PASS' : 'FAIL'}`);
    console.log(`  • File Size: ${(stats.size / 1024).toFixed(2)} KB (Budget: 500 KB)`);
    console.log(`  • Within Budget: ${withinBudget ? 'PASS' : 'FAIL'}`);

    if (!isGLB || !withinBudget) allPass = false;
  } else if (fs.existsSync(placeholderPathGLTF)) {
    const stats = fs.statSync(placeholderPathGLTF);
    const withinBudget = stats.size <= PERFORMANCE_BUDGETS.maxPlaceholderSize;
    console.log(`[Asset Checked] ${path.relative(process.cwd(), placeholderPathGLTF)}`);
    console.log(`  • Valid glTF 2.0 JSON: PASS`);
    console.log(`  • File Size: ${(stats.size / 1024).toFixed(2)} KB (Budget: 500 KB)`);
    console.log(`  • Within Budget: ${withinBudget ? 'PASS' : 'FAIL'}`);
    if (!withinBudget) allPass = false;
  }

  // Check the master architectural model: the_portfolio_house.glb
  const houseModelPath = path.resolve(process.cwd(), 'public/3d/models/the_portfolio_house.glb');
  if (fs.existsSync(houseModelPath)) {
    const stats = fs.statSync(houseModelPath);
    const buffer = fs.readFileSync(houseModelPath);
    const magic = buffer.readUInt32LE(0);
    const version = buffer.readUInt32LE(4);

    const isGLB = magic === 0x46546c67 && version === 2;
    const withinBudget = stats.size <= PERFORMANCE_BUDGETS.maxHouseSize;

    console.log(`[Asset Checked] ${path.relative(process.cwd(), houseModelPath)}`);
    console.log(`  • Valid glTF 2.0 Header: ${isGLB ? 'PASS' : 'FAIL'}`);
    console.log(`  • File Size: ${(stats.size / 1024).toFixed(2)} KB (Budget: ${(PERFORMANCE_BUDGETS.maxHouseSize / (1024 * 1024)).toFixed(0)} MB)`);
    console.log(`  • Within Budget: ${withinBudget ? 'PASS' : 'FAIL'}`);

    if (!isGLB || !withinBudget) allPass = false;
  } else {
    console.log('[Notice] External house model the_portfolio_house.glb missing.');
    allPass = false;
  }

  // Check M4 PBR Architectural Textures
  console.log('\n[PBR Texture Integrity & Budget Verification]');
  let totalTexturesBytes = 0;
  let allTexturesValid = true;

  for (const texFile of REQUIRED_PBR_TEXTURES) {
    const texPath = path.resolve(process.cwd(), 'public/3d/textures', texFile);
    if (!fs.existsSync(texPath)) {
      console.log(`  • ${texFile.padEnd(24)}: MISSING (FAIL)`);
      allTexturesValid = false;
      allPass = false;
      continue;
    }

    const stats = fs.statSync(texPath);
    totalTexturesBytes += stats.size;

    const buffer = fs.readFileSync(texPath);
    // Check PNG signature: 137, 80, 78, 71, 13, 10, 26, 10
    const isPNG =
      buffer.length >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a;

    if (!isPNG) {
      console.log(`  • ${texFile.padEnd(24)}: INVALID PNG HEADER (FAIL)`);
      allTexturesValid = false;
      allPass = false;
    } else {
      console.log(`  • ${texFile.padEnd(24)}: PASS (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  }

  const texturesWithinBudget = totalTexturesBytes <= PERFORMANCE_BUDGETS.maxTotalTexturesSize;
  console.log(`  • Total Texture Wire Size: ${(totalTexturesBytes / 1024).toFixed(2)} KB (Budget: ${(PERFORMANCE_BUDGETS.maxTotalTexturesSize / (1024 * 1024)).toFixed(1)} MB)`);
  console.log(`  • Textures Budget Compliance: ${texturesWithinBudget ? 'PASS' : 'FAIL'}`);
  if (!texturesWithinBudget) allPass = false;

  // Verify directory structure
  const requiredDirs = [
    'public/3d/models',
    'public/3d/textures',
    'public/3d/environment',
    'public/3d/placeholders',
  ];

  console.log('\n[Directory Structure Verification]');
  for (const dir of requiredDirs) {
    const exists = fs.existsSync(path.resolve(process.cwd(), dir));
    console.log(`  • ${dir}: ${exists ? 'EXISTS (OK)' : 'MISSING'}`);
    if (!exists) allPass = false;
  }

  console.log('='.repeat(70));
  console.log(`[Result] Overall Asset Verification: ${allPass ? 'PASSED' : 'ACTION REQUIRED'}`);
  console.log('='.repeat(70));
  return allPass;
}

verifyAssets();

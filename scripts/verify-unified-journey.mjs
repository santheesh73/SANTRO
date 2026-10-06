import * as THREE from 'three';

console.log('='.repeat(75));
console.log(' SANTRO M7 — UNIFIED CONTINUOUS CINEMATIC JOURNEY VERIFICATION');
console.log('='.repeat(75));

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failures++;
  } else {
    console.log(`[PASS] ${message}`);
  }
}

// 1. Waypoints
const EXTERIOR_WAYPOINTS = [
  { progress: 0.0, position: [4.2, 12.5, 26.0], target: [0.0, 3.8, 2.0], fov: 48, state: 'EXTERIOR_ESTABLISHING' },
  { progress: 0.20, position: [2.1, 5.8, 19.5], target: [0.0, 3.0, 1.8], fov: 50, state: 'EXTERIOR_APPROACH' },
  { progress: 0.35, position: [0.2, 2.2, 16.5], target: [0.0, 2.0, 1.0], fov: 52, state: 'EXTERIOR_APPROACH' },
  { progress: 0.50, position: [-1.2, 1.65, 14.8], target: [0.0, 1.6, 0.0], fov: 54, state: 'FACADE_REVEAL' },
  { progress: 0.65, position: [-0.8, 1.65, 10.5], target: [0.0, 1.6, -0.5], fov: 55, state: 'FACADE_REVEAL' },
  { progress: 0.80, position: [-0.3, 1.62, 6.5], target: [0.0, 1.6, -2.0], fov: 55, state: 'ENTRANCE_APPROACH' },
  { progress: 1.0, position: [0.0, 1.6, 2.2], target: [0.0, 1.6, -6.0], fov: 56, state: 'DOOR_TRANSITION' },
];

const INTERIOR_WAYPOINTS = [
  { progress: 0.0, position: [0.0, 1.60, 2.2], target: [0.0, 1.60, -6.0], fov: 56, state: 'DOOR_THRESHOLD' },
  { progress: 0.12, position: [0.10, 1.60, -0.6], target: [0.40, 1.60, -5.0], fov: 57, state: 'FOYER_ENTRY' },
  { progress: 0.24, position: [0.20, 1.60, -1.8], target: [1.60, 1.60, -4.2], fov: 58, state: 'FOYER_HOLD' },
  { progress: 0.38, position: [0.10, 1.60, -3.8], target: [0.0, 1.60, -10.0], fov: 58, state: 'CORRIDOR_ENTRY' },
  { progress: 0.52, position: [0.0, 1.60, -6.0], target: [-0.60, 1.55, -10.5], fov: 58, state: 'CORRIDOR_TRAVEL' },
  { progress: 0.66, position: [-0.35, 1.60, -7.8], target: [-3.20, 1.40, -8.5], fov: 60, state: 'GALLERY_REVEAL' },
  { progress: 0.80, position: [0.0, 1.60, -10.2], target: [0.0, 1.50, -15.0], fov: 56, state: 'GALLERY_ENTRY' },
  { progress: 1.0, position: [0.0, 1.60, -14.5], target: [0.0, 1.30, -19.5], fov: 54, state: 'INTERIOR_ROOM_APPROACH' },
];

// Splines
const extPosSpline = new THREE.CatmullRomCurve3(EXTERIOR_WAYPOINTS.map(w => new THREE.Vector3(...w.position)), false, 'centripetal', 0.5);
const extTgtSpline = new THREE.CatmullRomCurve3(EXTERIOR_WAYPOINTS.map(w => new THREE.Vector3(...w.target)), false, 'centripetal', 0.5);
const intPosSpline = new THREE.CatmullRomCurve3(INTERIOR_WAYPOINTS.map(w => new THREE.Vector3(...w.position)), false, 'centripetal', 0.5);
const intTgtSpline = new THREE.CatmullRomCurve3(INTERIOR_WAYPOINTS.map(w => new THREE.Vector3(...w.target)), false, 'centripetal', 0.5);

function extProgressToSplineU(p) {
  const n = EXTERIOR_WAYPOINTS.length;
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  for (let i = 0; i < n - 1; i++) {
    const p0 = EXTERIOR_WAYPOINTS[i].progress;
    const p1 = EXTERIOR_WAYPOINTS[i + 1].progress;
    if (p >= p0 && p <= p1) {
      return (i + (p - p0) / (p1 - p0)) / (n - 1);
    }
  }
  return 1;
}

function intProgressToSplineU(p) {
  const n = INTERIOR_WAYPOINTS.length;
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  for (let i = 0; i < n - 1; i++) {
    const p0 = INTERIOR_WAYPOINTS[i].progress;
    const p1 = INTERIOR_WAYPOINTS[i + 1].progress;
    if (p >= p0 && p <= p1) {
      return (i + (p - p0) / (p1 - p0)) / (n - 1);
    }
  }
  return 1;
}

function evaluateUnifiedPosition(p, out) {
  if (p <= 0.50) {
    const extP = p / 0.50;
    const u = extProgressToSplineU(extP);
    extPosSpline.getPoint(u, out);
  } else {
    const intP = (p - 0.50) / 0.50;
    const u = intProgressToSplineU(intP);
    intPosSpline.getPoint(u, out);
  }
}

function evaluateUnifiedTarget(p, out) {
  if (p <= 0.50) {
    const extP = p / 0.50;
    const u = extProgressToSplineU(extP);
    extTgtSpline.getPoint(u, out);
  } else {
    const intP = (p - 0.50) / 0.50;
    const u = intProgressToSplineU(intP);
    intTgtSpline.getPoint(u, out);
  }
}

// 1. Boundary Handoff Continuity Verification at p = 0.50
const posLeft = new THREE.Vector3();
const posRight = new THREE.Vector3();
const tgtLeft = new THREE.Vector3();
const tgtRight = new THREE.Vector3();

// Approaching p = 0.50 from exterior side (p = 0.49999)
evaluateUnifiedPosition(0.49999, posLeft);
evaluateUnifiedTarget(0.49999, tgtLeft);

// Approaching p = 0.50 from interior side (p = 0.50001)
evaluateUnifiedPosition(0.50001, posRight);
evaluateUnifiedTarget(0.50001, tgtRight);

const posDiff = posLeft.distanceTo(posRight);
const tgtDiff = tgtLeft.distanceTo(tgtRight);

assert(
  posDiff < 0.01,
  `Unified Handoff Positional Continuity at p=0.50 (diff: ${(posDiff * 1000).toFixed(3)}mm)`
);
assert(
  tgtDiff < 0.01,
  `Unified Handoff Look-Target Continuity at p=0.50 (diff: ${(tgtDiff * 1000).toFixed(3)}mm)`
);

// 2. Continuous Trajectory Sampling & Velocity Smoothness Check (500 samples)
let maxDeltaPos = 0;
let prevPos = new THREE.Vector3();
const currPos = new THREE.Vector3();

evaluateUnifiedPosition(0.0, prevPos);

for (let s = 1; s <= 500; s++) {
  const p = s / 500;
  evaluateUnifiedPosition(p, currPos);
  const stepDist = prevPos.distanceTo(currPos);
  maxDeltaPos = Math.max(maxDeltaPos, stepDist);
  prevPos.copy(currPos);
}

assert(
  maxDeltaPos < 0.45,
  `Maximum trajectory step distance across 500 samples: ${maxDeltaPos.toFixed(3)}m (smooth continuous motion)`
);

// 3. Ground Clearance Across Full Unified Journey
let minGlobalY = Infinity;
for (let s = 0; s <= 500; s++) {
  const p = s / 500;
  evaluateUnifiedPosition(p, currPos);
  minGlobalY = Math.min(minGlobalY, currPos.y);
}

assert(
  minGlobalY >= 1.45,
  `Minimum global trajectory height: ${minGlobalY.toFixed(2)}m (clears floor safety limit 1.45m)`
);

console.log('='.repeat(75));
if (failures === 0) {
  console.log('[RESULT] All Unified Journey validations PASSED.');
  process.exit(0);
} else {
  console.error(`[RESULT] ${failures} validation checks FAILED.`);
  process.exit(1);
}

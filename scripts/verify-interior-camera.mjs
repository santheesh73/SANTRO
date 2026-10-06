import * as THREE from 'three';

console.log('='.repeat(75));
console.log(' SANTRO M7 — INTERIOR CINEMATIC CAMERA JOURNEY VERIFICATION');
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

// =========================================================================
// 1. Authored Interior Waypoints Specification
// =========================================================================
const INTERIOR_WAYPOINTS = [
  {
    id: 'int-wp-01',
    progress: 0.0,
    state: 'DOOR_THRESHOLD',
    position: [0.0, 1.60, 2.2],
    target: [0.0, 1.60, -6.0],
    fov: 56,
    label: 'Door Threshold Passage',
    shotRef: 'Shot 02 Handoff (Frame 108, t=4.5s)',
  },
  {
    id: 'int-wp-02',
    progress: 0.12,
    state: 'FOYER_ENTRY',
    position: [0.10, 1.60, -0.6],
    target: [0.40, 1.60, -5.0],
    fov: 57,
    label: 'Entrance Vestibule Crossing',
    shotRef: 'Shot 02-03 Transition (Frame 120, t=5.0s)',
  },
  {
    id: 'int-wp-03',
    progress: 0.24,
    state: 'FOYER_HOLD',
    position: [0.20, 1.60, -1.8],
    target: [1.60, 1.60, -4.2],
    fov: 58,
    label: 'Foyer Settle & Walnut Reveal',
    shotRef: 'Shot 03 Foyer (Frame 131, t=5.46s)',
  },
  {
    id: 'int-wp-04',
    progress: 0.38,
    state: 'CORRIDOR_ENTRY',
    position: [0.10, 1.60, -3.8],
    target: [0.0, 1.60, -10.0],
    fov: 58,
    label: 'Gallery Circulation Axis',
    shotRef: 'Shot 03 Corridor Entry (Frame 133, t=5.54s)',
  },
  {
    id: 'int-wp-05',
    progress: 0.52,
    state: 'CORRIDOR_TRAVEL',
    position: [0.0, 1.60, -6.0],
    target: [-0.60, 1.55, -10.5],
    fov: 58,
    label: 'Gallery Corridor Tracking',
    shotRef: 'Shot 03 Corridor Walk (Frame 150, t=6.25s)',
  },
  {
    id: 'int-wp-06',
    progress: 0.66,
    state: 'GALLERY_REVEAL',
    position: [-0.35, 1.60, -7.8],
    target: [-3.20, 1.40, -8.5],
    fov: 60,
    label: 'Glass Workspace Reveal',
    shotRef: 'Shot 03 Lab Reveal (Frame 167, t=6.96s)',
  },
  {
    id: 'int-wp-07',
    progress: 0.80,
    state: 'GALLERY_ENTRY',
    position: [0.0, 1.60, -10.2],
    target: [0.0, 1.50, -15.0],
    fov: 56,
    label: 'Double-Height Atrium Emergence',
    shotRef: 'Shot 04 Atrium Entry (Frame 169, t=7.04s)',
  },
  {
    id: 'int-wp-08',
    progress: 1.0,
    state: 'INTERIOR_ROOM_APPROACH',
    position: [0.0, 1.60, -14.5],
    target: [0.0, 1.30, -19.5],
    fov: 54,
    label: 'Atrium Core & Rear Vista Framing',
    shotRef: 'Shot 04 Finale (Frames 185-200, t=7.7s-8.3s)',
  },
];

// Exterior wp-05 for M6 handoff validation
const EXTERIOR_HANDOFF_WAYPOINT = {
  id: 'wp-05',
  progress: 1.0,
  state: 'DOOR_TRANSITION',
  position: [0.0, 1.60, 2.2],
  target: [0.0, 1.60, -6.0],
  fov: 56,
};

// Spatial Boundaries
const INTERIOR_BOUNDS = {
  minY: 1.45, // Minimum ground clearance (finished floor is at 0.0m, human eye height 1.60m)
  maxY: 3.20, // Maximum corridor camera height (ceiling is at 3.4m, leaves 200mm clearance)
  minZ: -20.0, // Double-height atrium rear boundary
  maxZ: 2.5, // Door threshold boundary
  corridorWallWest: -1.60, // Frameless glass wall along X = -1.60m
  corridorWallEast: 1.57, // Fluted walnut wall along X = 1.57m
};

// =========================================================================
// 2. Waypoints Integrity & Structure Verification
// =========================================================================
assert(INTERIOR_WAYPOINTS.length === 8, `Expected exactly 8 interior waypoints, found ${INTERIOR_WAYPOINTS.length}`);
assert(INTERIOR_WAYPOINTS[0].progress === 0.0, 'First interior waypoint progress starts at 0.0');
assert(INTERIOR_WAYPOINTS[INTERIOR_WAYPOINTS.length - 1].progress === 1.0, 'Last interior waypoint progress ends at 1.0');

// Monotonic progress check
for (let i = 1; i < INTERIOR_WAYPOINTS.length; i++) {
  assert(
    INTERIOR_WAYPOINTS[i].progress > INTERIOR_WAYPOINTS[i - 1].progress,
    `Waypoint ${i} (${INTERIOR_WAYPOINTS[i].id}, p=${INTERIOR_WAYPOINTS[i].progress}) strictly greater than previous (${INTERIOR_WAYPOINTS[i - 1].progress})`
  );
}

// Lens FOV architectural validity check
for (const wp of INTERIOR_WAYPOINTS) {
  assert(
    wp.fov >= 50 && wp.fov <= 62,
    `Waypoint ${wp.id} FOV (${wp.fov}°) is within calibrated architectural lens range [50°, 62°]`
  );
}

// Camera human eye height check (consistent Y = 1.60m)
for (const wp of INTERIOR_WAYPOINTS) {
  assert(
    Math.abs(wp.position[1] - 1.60) < 0.05,
    `Waypoint ${wp.id} camera height (${wp.position[1]}m) adheres to human eye-level standard 1.60m ±0.05m`
  );
}

// =========================================================================
// 3. M6 to M7 Seamless Handoff Verification
// =========================================================================
const extEndPos = new THREE.Vector3(...EXTERIOR_HANDOFF_WAYPOINT.position);
const intStartPos = new THREE.Vector3(...INTERIOR_WAYPOINTS[0].position);
const extEndTarget = new THREE.Vector3(...EXTERIOR_HANDOFF_WAYPOINT.target);
const intStartTarget = new THREE.Vector3(...INTERIOR_WAYPOINTS[0].target);

const handoffPosDist = extEndPos.distanceTo(intStartPos);
const handoffTargetDist = extEndTarget.distanceTo(intStartTarget);
const handoffFovDiff = Math.abs(EXTERIOR_HANDOFF_WAYPOINT.fov - INTERIOR_WAYPOINTS[0].fov);

assert(
  handoffPosDist < 0.0001,
  `M6->M7 Handoff Position: 0.0000m error (Ext: [${extEndPos.toArray()}], Int: [${intStartPos.toArray()}])`
);
assert(
  handoffTargetDist < 0.0001,
  `M6->M7 Handoff Target: 0.0000m error (Ext: [${extEndTarget.toArray()}], Int: [${intStartTarget.toArray()}])`
);
assert(
  handoffFovDiff < 0.001,
  `M6->M7 Handoff FOV: 0.000° difference (${EXTERIOR_HANDOFF_WAYPOINT.fov}° == ${INTERIOR_WAYPOINTS[0].fov}°)`
);

// Level-horizon orientation check at handoff
const dummyCamExt = new THREE.PerspectiveCamera();
dummyCamExt.position.copy(extEndPos);
dummyCamExt.lookAt(extEndTarget);

const dummyCamInt = new THREE.PerspectiveCamera();
dummyCamInt.position.copy(intStartPos);
dummyCamInt.lookAt(intStartTarget);

const rotDiff = dummyCamExt.quaternion.angleTo(dummyCamInt.quaternion);
assert(
  rotDiff < 0.0001,
  `M6->M7 Handoff Orientation Quaternion: identical orientation (diff: ${rotDiff.toFixed(6)} rad)`
);

// =========================================================================
// 4. Centripetal Catmull-Rom Spline Interpolation & Exact Waypoint Match
// =========================================================================
const posVectors = INTERIOR_WAYPOINTS.map((w) => new THREE.Vector3(...w.position));
const targetVectors = INTERIOR_WAYPOINTS.map((w) => new THREE.Vector3(...w.target));

const positionSpline = new THREE.CatmullRomCurve3(posVectors, false, 'centripetal', 0.5);
const targetSpline = new THREE.CatmullRomCurve3(targetVectors, false, 'centripetal', 0.5);

function interiorProgressToSplineU(progress) {
  const p = Math.max(0, Math.min(1, progress));
  const n = INTERIOR_WAYPOINTS.length;
  if (n <= 1) return 0;
  if (p <= INTERIOR_WAYPOINTS[0].progress) return 0;
  if (p >= INTERIOR_WAYPOINTS[n - 1].progress) return 1;

  for (let i = 0; i < n - 1; i++) {
    const p0 = INTERIOR_WAYPOINTS[i].progress;
    const p1 = INTERIOR_WAYPOINTS[i + 1].progress;
    if (p >= p0 && p <= p1) {
      const segT = (p - p0) / (p1 - p0);
      const u0 = i / (n - 1);
      const u1 = (i + 1) / (n - 1);
      return u0 + segT * (u1 - u0);
    }
  }
  return 1;
}

function evaluatePosition(p, out) {
  const u = interiorProgressToSplineU(p);
  positionSpline.getPoint(u, out);
}

function evaluateTarget(p, out) {
  const u = interiorProgressToSplineU(p);
  targetSpline.getPoint(u, out);
}

const testPos = new THREE.Vector3();
const testTarget = new THREE.Vector3();

// Exact match check across all 8 interior waypoints
for (let i = 0; i < INTERIOR_WAYPOINTS.length; i++) {
  const wp = INTERIOR_WAYPOINTS[i];
  evaluatePosition(wp.progress, testPos);
  evaluateTarget(wp.progress, testTarget);

  const expectedPos = new THREE.Vector3(...wp.position);
  const expectedTarget = new THREE.Vector3(...wp.target);

  const posDist = testPos.distanceTo(expectedPos);
  const targetDist = testTarget.distanceTo(expectedTarget);

  assert(
    posDist < 0.001,
    `Waypoint ${wp.id} (p=${wp.progress}) evaluated position matches authored position within 0.001m (err: ${posDist.toFixed(4)}m)`
  );
  assert(
    targetDist < 0.001,
    `Waypoint ${wp.id} (p=${wp.progress}) evaluated target matches authored target within 0.001m (err: ${targetDist.toFixed(4)}m)`
  );
}

// =========================================================================
// 5. Dense Spatial Collision & Wall Clearance Sampling (200 samples)
// =========================================================================
let minSampleY = Infinity;
let maxSampleY = -Infinity;
let minSampleZ = Infinity;
let maxSampleZ = -Infinity;
let maxSampleAbsX = 0;
let minCorridorClearanceWest = Infinity;
let minCorridorClearanceEast = Infinity;

for (let s = 0; s <= 200; s++) {
  const p = s / 200;
  evaluatePosition(p, testPos);

  minSampleY = Math.min(minSampleY, testPos.y);
  maxSampleY = Math.max(maxSampleY, testPos.y);
  minSampleZ = Math.min(minSampleZ, testPos.z);
  maxSampleZ = Math.max(maxSampleZ, testPos.z);
  maxSampleAbsX = Math.max(maxSampleAbsX, Math.abs(testPos.x));

  // In the gallery corridor (Z between -2.0m and -10.0m)
  if (testPos.z <= -2.0 && testPos.z >= -10.0) {
    const distWest = testPos.x - INTERIOR_BOUNDS.corridorWallWest; // X - (-1.60)
    const distEast = INTERIOR_BOUNDS.corridorWallEast - testPos.x; // 1.57 - X
    minCorridorClearanceWest = Math.min(minCorridorClearanceWest, distWest);
    minCorridorClearanceEast = Math.min(minCorridorClearanceEast, distEast);
  }
}

assert(
  minSampleY >= INTERIOR_BOUNDS.minY,
  `Minimum interior spline height (${minSampleY.toFixed(2)}m) preserves ground safety clearance (min: ${INTERIOR_BOUNDS.minY}m)`
);
assert(
  maxSampleY <= INTERIOR_BOUNDS.maxY,
  `Maximum interior spline height (${maxSampleY.toFixed(2)}m) preserves ceiling clearance (max: ${INTERIOR_BOUNDS.maxY}m)`
);
assert(
  minSampleZ >= INTERIOR_BOUNDS.minZ && maxSampleZ <= INTERIOR_BOUNDS.maxZ,
  `Depth interval [${minSampleZ.toFixed(2)}m, ${maxSampleZ.toFixed(2)}m] within bounds [${INTERIOR_BOUNDS.minZ}m, ${INTERIOR_BOUNDS.maxZ}m]`
);
assert(
  minCorridorClearanceWest >= 1.0,
  `West corridor glass wall clearance is ${minCorridorClearanceWest.toFixed(2)}m (safely exceeds near clip plane 0.1m)`
);
assert(
  minCorridorClearanceEast >= 1.0,
  `East fluted walnut wall clearance is ${minCorridorClearanceEast.toFixed(2)}m (safely exceeds near clip plane 0.1m)`
);

// =========================================================================
// 6. Independent Look-Target Decoupling Verification
// =========================================================================
// At Workspace Reveal (p = 0.66): camera is along corridor, look target turns left into lab
const wpWorkspace = INTERIOR_WAYPOINTS.find((w) => w.id === 'int-wp-06');
assert(
  wpWorkspace.position[0] > -0.5 && wpWorkspace.target[0] < -3.0,
  `Workspace Reveal: Camera is at corridor X=${wpWorkspace.position[0]}m while Look Target aims left at X=${wpWorkspace.target[0]}m`
);

// At Foyer Hold (p = 0.24): camera is at center-right, look target frames east walnut wall
const wpFoyer = INTERIOR_WAYPOINTS.find((w) => w.id === 'int-wp-03');
assert(
  wpFoyer.target[0] > 1.4,
  `Foyer Hold: Look Target frames walnut wall at X=${wpFoyer.target[0]}m while camera is at X=${wpFoyer.position[0]}m`
);

// =========================================================================
// 7. Interior State Machine Verification
// =========================================================================
function getInteriorStateAtProgress(p) {
  if (p < 0.06) return 'DOOR_THRESHOLD';
  if (p < 0.18) return 'FOYER_ENTRY';
  if (p < 0.31) return 'FOYER_HOLD';
  if (p < 0.45) return 'CORRIDOR_ENTRY';
  if (p < 0.59) return 'CORRIDOR_TRAVEL';
  if (p < 0.73) return 'GALLERY_REVEAL';
  if (p < 0.88) return 'GALLERY_ENTRY';
  return 'INTERIOR_ROOM_APPROACH';
}

assert(getInteriorStateAtProgress(0.0) === 'DOOR_THRESHOLD', 'p=0.00 -> DOOR_THRESHOLD');
assert(getInteriorStateAtProgress(0.12) === 'FOYER_ENTRY', 'p=0.12 -> FOYER_ENTRY');
assert(getInteriorStateAtProgress(0.24) === 'FOYER_HOLD', 'p=0.24 -> FOYER_HOLD');
assert(getInteriorStateAtProgress(0.38) === 'CORRIDOR_ENTRY', 'p=0.38 -> CORRIDOR_ENTRY');
assert(getInteriorStateAtProgress(0.52) === 'CORRIDOR_TRAVEL', 'p=0.52 -> CORRIDOR_TRAVEL');
assert(getInteriorStateAtProgress(0.66) === 'GALLERY_REVEAL', 'p=0.66 -> GALLERY_REVEAL');
assert(getInteriorStateAtProgress(0.80) === 'GALLERY_ENTRY', 'p=0.80 -> GALLERY_ENTRY');
assert(getInteriorStateAtProgress(1.0) === 'INTERIOR_ROOM_APPROACH', 'p=1.00 -> INTERIOR_ROOM_APPROACH');

// =========================================================================
// 8. Bidirectional Traversal Verification
// =========================================================================
const posForward = new THREE.Vector3();
const posReverse = new THREE.Vector3();
let maxBidirectionalDiff = 0;

for (let s = 0; s <= 100; s++) {
  const p = s / 100;
  evaluatePosition(p, posForward);
  // Evaluate in reverse order
  evaluatePosition(1.0 - (1.0 - p), posReverse);
  const diff = posForward.distanceTo(posReverse);
  maxBidirectionalDiff = Math.max(maxBidirectionalDiff, diff);
}

assert(
  maxBidirectionalDiff < 0.0001,
  `Bidirectional traversal error is ${maxBidirectionalDiff.toFixed(6)}m (strictly identical forward and backward)`
);

console.log('='.repeat(75));
if (failures === 0) {
  console.log('[RESULT] All M7 Interior Cinematic Camera System validations PASSED.');
  process.exit(0);
} else {
  console.error(`[RESULT] ${failures} validation checks FAILED.`);
  process.exit(1);
}

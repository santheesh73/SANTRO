import * as THREE from 'three';

console.log('='.repeat(70));
console.log(' SANTRO M6 — EXTERIOR CINEMATIC CAMERA JOURNEY VERIFICATION');
console.log('='.repeat(70));

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failures++;
  } else {
    console.log(`[PASS] ${message}`);
  }
}

// 1. Waypoints Specification
const EXTERIOR_WAYPOINTS = [
  {
    id: 'wp-01',
    progress: 0.0,
    state: 'EXTERIOR_ESTABLISHING',
    position: [4.2, 12.5, 26.0],
    target: [0.0, 3.8, 2.0],
    fov: 48,
    label: 'Exterior Establishing',
    shotRef: 'Shot 01 (Frame 000, t=0.0s)',
  },
  {
    id: 'wp-02',
    progress: 0.20,
    state: 'EXTERIOR_APPROACH',
    position: [2.1, 5.8, 19.5],
    target: [0.0, 3.0, 1.8],
    fov: 50,
    label: 'Exterior Approach Glide',
    shotRef: 'Shot 01 (Frame 034, t=1.4s)',
  },
  {
    id: 'wp-02b',
    progress: 0.35,
    state: 'EXTERIOR_APPROACH',
    position: [0.2, 2.2, 16.5],
    target: [0.0, 2.0, 1.0],
    fov: 52,
    label: 'Terrace Plinth Descent',
    shotRef: 'Shot 01-02 Transition',
  },
  {
    id: 'wp-03',
    progress: 0.50,
    state: 'FACADE_REVEAL',
    position: [-1.2, 1.65, 14.8],
    target: [0.0, 1.6, 0.0],
    fov: 54,
    label: 'Pool Terrace Reveal',
    shotRef: 'Shot 02 (Frame 070, t=2.9s)',
  },
  {
    id: 'wp-03b',
    progress: 0.65,
    state: 'FACADE_REVEAL',
    position: [-0.8, 1.65, 10.5],
    target: [0.0, 1.6, -0.5],
    fov: 55,
    label: 'Lap Pool Crossing',
    shotRef: 'Shot 02 Walk',
  },
  {
    id: 'wp-04',
    progress: 0.80,
    state: 'ENTRANCE_APPROACH',
    position: [-0.3, 1.62, 6.5],
    target: [0.0, 1.6, -2.0],
    fov: 55,
    label: 'Entrance Portal Approach',
    shotRef: 'Shot 02 (Frame 095, t=3.9s)',
  },
  {
    id: 'wp-05',
    progress: 1.0,
    state: 'DOOR_TRANSITION',
    position: [0.0, 1.6, 2.2],
    target: [0.0, 1.6, -6.0],
    fov: 56,
    label: 'Door Threshold Transition',
    shotRef: 'Shot 02 (Frame 108, t=4.5s)',
  },
];

// Boundaries
const BOUNDARIES = {
  minY: 1.45,
  maxY: 16.0,
  minZ: 1.8,
  maxZ: 32.0,
  minX: -8.0,
  maxX: 8.0,
};

// 1. Waypoint Integrity Check
assert(EXTERIOR_WAYPOINTS.length >= 5, `Expected at least 5 waypoints, got ${EXTERIOR_WAYPOINTS.length}`);
assert(EXTERIOR_WAYPOINTS[0].progress === 0.0, 'First waypoint progress starts at 0.0');
assert(EXTERIOR_WAYPOINTS[EXTERIOR_WAYPOINTS.length - 1].progress === 1.0, 'Last waypoint progress ends at 1.0');

// Monotonic progress check
for (let i = 1; i < EXTERIOR_WAYPOINTS.length; i++) {
  assert(
    EXTERIOR_WAYPOINTS[i].progress > EXTERIOR_WAYPOINTS[i - 1].progress,
    `Waypoint ${i} progress (${EXTERIOR_WAYPOINTS[i].progress}) > Waypoint ${i - 1} (${EXTERIOR_WAYPOINTS[i - 1].progress})`
  );
}

// 2. Optical FOV Range Check
for (const wp of EXTERIOR_WAYPOINTS) {
  assert(
    wp.fov >= 40 && wp.fov <= 65,
    `Waypoint ${wp.id} FOV (${wp.fov}°) is within architectural lens range [40°, 65°]`
  );
}

// 3. 3D Centripetal Catmull-Rom Spline Interpolation & Safety Verification
const posVectors = EXTERIOR_WAYPOINTS.map((w) => new THREE.Vector3(...w.position));
const targetVectors = EXTERIOR_WAYPOINTS.map((w) => new THREE.Vector3(...w.target));

const positionSpline = new THREE.CatmullRomCurve3(posVectors, false, 'centripetal', 0.5);
const targetSpline = new THREE.CatmullRomCurve3(targetVectors, false, 'centripetal', 0.5);

const tempPos = new THREE.Vector3();
const tempTarget = new THREE.Vector3();
let minSampleY = Infinity;
let maxSampleY = -Infinity;
let maxAcceleration = 0;
let prevVelocity = new THREE.Vector3();

for (let s = 0; s <= 100; s++) {
  const p = s / 100;
  positionSpline.getPointAt(p, tempPos);
  targetSpline.getPointAt(p, tempTarget);

  minSampleY = Math.min(minSampleY, tempPos.y);
  maxSampleY = Math.max(maxSampleY, tempPos.y);

  if (s > 0) {
    const tangent = positionSpline.getTangentAt(p);
    if (s > 1) {
      const accel = tangent.clone().sub(prevVelocity).length() * 100; // normalized delta
      maxAcceleration = Math.max(maxAcceleration, accel);
    }
    prevVelocity.copy(tangent);
  }

  if (tempPos.y < BOUNDARIES.minY) {
    assert(false, `Progress ${p.toFixed(2)}: Camera Y (${tempPos.y.toFixed(2)}m) below ground clearance (${BOUNDARIES.minY}m)`);
  }
}

assert(
  minSampleY >= BOUNDARIES.minY,
  `Minimum spline height (${minSampleY.toFixed(2)}m) preserves ground safety clearance (min: ${BOUNDARIES.minY}m)`
);
assert(
  maxSampleY <= BOUNDARIES.maxY,
  `Maximum spline height (${maxSampleY.toFixed(2)}m) stays within altitude boundary (${BOUNDARIES.maxY}m)`
);

// 4. State Machine Transition Verification
function getStateAtProgress(p) {
  if (p < 0.18) return 'EXTERIOR_ESTABLISHING';
  if (p < 0.42) return 'EXTERIOR_APPROACH';
  if (p < 0.68) return 'FACADE_REVEAL';
  if (p < 0.92) return 'ENTRANCE_APPROACH';
  return 'DOOR_TRANSITION';
}

assert(getStateAtProgress(0.0) === 'EXTERIOR_ESTABLISHING', 'p=0.0 -> EXTERIOR_ESTABLISHING');
assert(getStateAtProgress(0.3) === 'EXTERIOR_APPROACH', 'p=0.3 -> EXTERIOR_APPROACH');
assert(getStateAtProgress(0.55) === 'FACADE_REVEAL', 'p=0.55 -> FACADE_REVEAL');
assert(getStateAtProgress(0.8) === 'ENTRANCE_APPROACH', 'p=0.8 -> ENTRANCE_APPROACH');
assert(getStateAtProgress(1.0) === 'DOOR_TRANSITION', 'p=1.0 -> DOOR_TRANSITION');

// 5. Door Opening Mechanics Check (CAMERA_SPEC.md §6)
const doorTrigger = {
  startZ: 4.5,
  endZ: 2.2,
  maxAngleRad: -1.484, // -85 deg
};

function computeDoorAngle(camZ) {
  if (camZ >= doorTrigger.startZ) return 0.0;
  if (camZ <= doorTrigger.endZ) return doorTrigger.maxAngleRad;
  const t = (doorTrigger.startZ - camZ) / (doorTrigger.startZ - doorTrigger.endZ);
  const eased = t * t * (3 - 2 * t); // smoothstep
  return eased * doorTrigger.maxAngleRad;
}

assert(computeDoorAngle(5.0) === 0.0, 'Door is closed when camera Z >= 4.5m');
assert(computeDoorAngle(2.0) === doorTrigger.maxAngleRad, 'Door is fully open (-85 deg) when camera Z <= 2.2m');
const midAngle = computeDoorAngle(3.35); // midpoint
assert(midAngle < -0.6 && midAngle > -0.9, `Door midpoint angle (${midAngle.toFixed(3)} rad) smoothly eased`);

console.log('='.repeat(70));
if (failures === 0) {
  console.log('[RESULT] All M6 Exterior Cinematic Camera System validations PASSED.');
  process.exit(0);
} else {
  console.error(`[RESULT] ${failures} validation checks FAILED.`);
  process.exit(1);
}

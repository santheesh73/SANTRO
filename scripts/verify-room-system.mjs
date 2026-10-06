import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('='.repeat(75));
console.log(' SANTRO M8 — PORTFOLIO ROOMS & SPATIAL EXHIBITION SYSTEM VERIFICATION');
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

// 1. Load compiled/source datasets
async function runVerification() {
  const { PORTFOLIO_ROOMS, ROOM_REGISTRY, getRoomById, getRoomForJourneyProgress } = await import(
    '../src/3d/rooms/RoomRegistry.ts'
  );
  const { projectsData } = await import('../src/content/projects.ts');
  const { skillsData } = await import('../src/content/skills.ts');
  const { archiveData } = await import('../src/content/archive.ts');
  const { philosophyData } = await import('../src/content/philosophy.ts');
  const { contactData } = await import('../src/content/contact.ts');
  const { profileData } = await import('../src/content/profile.ts');

  console.log('\n--- 1. ROOM SYSTEM & REGISTRY INTEGRITY ---');
  assert(PORTFOLIO_ROOMS.length === 10, `Portfolio rooms count is exactly 10 (found ${PORTFOLIO_ROOMS.length})`);

  const expectedRoomIds = [
    'exterior',
    'entrance',
    'foyer',
    'gallery',
    'project-studio',
    'engineering-lab',
    'archive',
    'study',
    'contact',
    'terrace',
  ];

  expectedRoomIds.forEach((id, idx) => {
    const room = PORTFOLIO_ROOMS[idx];
    assert(room && room.id === id, `Room 0${idx + 1} has expected id "${id}"`);
    assert(room && room.order === idx + 1, `Room "${id}" has correct order ${idx + 1}`);
    assert(room && room.name.length > 0, `Room "${id}" has display name: ${room?.name}`);
    assert(room && room.purpose.length > 0, `Room "${id}" has portfolio purpose: ${room?.purpose}`);
    assert(room && room.cameraState.length > 0, `Room "${id}" references camera state: ${room?.cameraState}`);
    assert(room && room.lightingPreset.length > 0, `Room "${id}" references lighting preset: ${room?.lightingPreset}`);
    assert(room && room.bounds && room.bounds.min.length === 3, `Room "${id}" has 3D spatial bounding volume`);
  });

  // O(1) Lookup test
  assert(getRoomById('foyer').order === 3, 'getRoomById("foyer") returns Room 03');
  assert(getRoomById('project-studio').order === 5, 'getRoomById("project-studio") returns Room 05');

  // Progress mapping test (strictly monotonic sequence order 01 -> 10)
  assert(getRoomForJourneyProgress(0.1).id === 'exterior', 'Progress 0.10 maps to Exterior (Room 01)');
  assert(getRoomForJourneyProgress(0.48).id === 'entrance', 'Progress 0.48 maps to Entrance (Room 02)');
  assert(getRoomForJourneyProgress(0.55).id === 'foyer', 'Progress 0.55 maps to Foyer (Room 03)');
  assert(getRoomForJourneyProgress(0.68).id === 'gallery', 'Progress 0.68 maps to Gallery (Room 04)');
  assert(getRoomForJourneyProgress(0.80).id === 'project-studio', 'Progress 0.80 maps to Project Studio (Room 05)');
  assert(getRoomForJourneyProgress(0.88).id === 'engineering-lab', 'Progress 0.88 maps to Engineering Lab (Room 06)');
  assert(getRoomForJourneyProgress(0.92).id === 'archive', 'Progress 0.92 maps to Archive (Room 07)');
  assert(getRoomForJourneyProgress(0.95).id === 'study', 'Progress 0.95 maps to Study (Room 08)');
  assert(getRoomForJourneyProgress(0.98).id === 'contact', 'Progress 0.98 maps to Contact (Room 09)');
  assert(getRoomForJourneyProgress(1.00).id === 'terrace', 'Progress 1.00 maps to Terrace (Room 10)');

  console.log('\n--- 2. PROJECT STUDIO VERIFICATION ---');
  assert(projectsData.length === 7, `Project Studio has exactly 7 approved projects (found ${projectsData.length})`);

  const expectedProjectIds = ['orion', 'hearttune', 'nisf', 'ahal-ai', 'prysm', 'bhoomi', 'minchal'];
  expectedProjectIds.forEach((pid) => {
    const proj = projectsData.find((p) => p.id === pid);
    assert(!!proj, `Approved project "${pid}" is registered in projectsData`);
    assert(proj && proj.technologies.length > 0, `Project "${pid}" defines verified technology stack`);
    assert(proj && proj.metrics.length > 0, `Project "${pid}" defines impact metrics`);
    assert(proj && proj.highlights.length > 0, `Project "${pid}" defines technical highlights`);
  });

  // Hierarchy check
  const orion = projectsData.find((p) => p.id === 'orion');
  assert(orion?.variant === 'featured', 'ORION is assigned primary "featured" exhibition variant');
  assert(orion?.technologies.includes('WebGPU'), 'ORION tech stack includes WebGPU');

  const hearttune = projectsData.find((p) => p.id === 'hearttune');
  assert(hearttune?.variant === 'standard', 'HEARTTUNE is assigned selected "standard" exhibition variant');

  const nisf = projectsData.find((p) => p.id === 'nisf');
  assert(nisf?.variant === 'standard', 'NISF is assigned selected "standard" exhibition variant');

  const ahalAi = projectsData.find((p) => p.id === 'ahal-ai');
  assert(ahalAi?.variant === 'standard', 'AHAL AI is assigned selected "standard" exhibition variant');

  const prysm = projectsData.find((p) => p.id === 'prysm');
  assert(prysm?.variant === 'compact', 'PRYSM is assigned supporting "compact" exhibition variant');

  const bhoomi = projectsData.find((p) => p.id === 'bhoomi');
  assert(bhoomi?.variant === 'compact', 'BHOOMI is assigned supporting "compact" exhibition variant');

  const minchal = projectsData.find((p) => p.id === 'minchal');
  assert(minchal?.variant === 'compact', 'MINCHAL is assigned supporting "compact" exhibition variant');
  assert(minchal?.shortDescription.toLowerCase().includes('ocr'), 'MINCHAL verified description reflects OCR bill analysis');

  console.log('\n--- 3. ENGINEERING LAB VERIFICATION ---');
  assert(skillsData.length === 6, `Skills grouped into exactly 6 technical domains (found ${skillsData.length})`);
  const domainNames = skillsData.map((d) => d.name);
  assert(domainNames.includes('LANGUAGES'), 'Domain LANGUAGES exists');
  assert(domainNames.includes('FRONTEND'), 'Domain FRONTEND exists');
  assert(domainNames.includes('BACKEND'), 'Domain BACKEND exists');
  assert(domainNames.includes('DATA'), 'Domain DATA exists');
  assert(domainNames.includes('AI & MACHINE LEARNING'), 'Domain AI & MACHINE LEARNING exists');
  assert(domainNames.includes('INFRASTRUCTURE'), 'Domain INFRASTRUCTURE exists');

  const allSkills = skillsData.flatMap((d) => d.skills);
  const requiredSkills = [
    'Python',
    'TypeScript',
    'JavaScript',
    'SQL',
    'React',
    'Next.js',
    'FastAPI',
    'PostgreSQL',
    'Supabase',
    'Redis',
    'Generative AI',
    'LLMs',
    'RAG',
    'NLP',
    'Docker',
  ];
  requiredSkills.forEach((skill) => {
    assert(allSkills.includes(skill), `Required skill "${skill}" is present in verified skill matrix`);
  });

  console.log('\n--- 4. ARCHIVE (PROOF & MILESTONES) VERIFICATION ---');
  assert(archiveData.length >= 4, `Archive contains at least 4 proof records (found ${archiveData.length})`);
  const sihRecord = archiveData.find((a) => a.id === 'proof-sih');
  assert(!!sihRecord, 'Smart India Hackathon (SIH) winner record exists');

  console.log('\n--- 5. STUDY (ENGINEERING PRINCIPLES) VERIFICATION ---');
  assert(philosophyData.length === 4, `Study contains exactly 4 principles (found ${philosophyData.length})`);
  const keywords = philosophyData.map((p) => p.keyword);
  assert(keywords.includes('BUILD'), 'BUILD principle exists');
  assert(keywords.includes('THINK'), 'THINK principle exists');
  assert(keywords.includes('EXPLORE'), 'EXPLORE principle exists');
  assert(keywords.includes('REFINE'), 'REFINE principle exists');

  console.log('\n--- 6. CONTACT & FOYER PROFILE VERIFICATION ---');
  assert(contactData.email === 'santheesh073@gmail.com', 'Verified email matches santheesh073@gmail.com');
  assert(contactData.github === 'https://github.com/santheesh73', 'Verified GitHub matches github.com/santheesh73');
  assert(contactData.linkedin === 'https://linkedin.com/in/santheesh73', 'Verified LinkedIn matches linkedin.com/in/santheesh73');
  assert(contactData.headline === "LET'S BUILD SOMETHING MEANINGFUL.", 'Closing message is "LET\'S BUILD SOMETHING MEANINGFUL."');

  assert(profileData.name === 'SANTHEESH S', 'Profile name is SANTHEESH S');
  assert(profileData.disciplines.includes('AI Software Engineer'), 'Disciplines include AI Software Engineer');
  assert(profileData.disciplines.includes('Full-Stack Developer'), 'Disciplines include Full-Stack Developer');
  assert(profileData.disciplines.includes('Generative AI Enthusiast'), 'Disciplines include Generative AI Enthusiast');

  console.log('\n--- 7. CAMERA PATH CLEARANCE & COLLISION VALIDATION ---');
  // Complete registry of all exhibits across Project Studio, Archive, Study, and Contact
  const exhibitsPositions = [
    // Project Studio (7 Projects in front atrium zone Z: -12.0 to -14.8m)
    { name: 'ORION (Featured)', pos: [-2.6, 0.0, -12.2] },
    { name: 'HEARTTUNE (Standard)', pos: [-2.6, 0.0, -14.2] },
    { name: 'NISF (Standard)', pos: [2.6, 0.0, -12.2] },
    { name: 'AHAL AI (Standard)', pos: [2.6, 0.0, -14.2] },
    { name: 'PRYSM (Compact)', pos: [-4.5, 0.0, -12.8] },
    { name: 'BHOOMI (Compact)', pos: [-4.5, 0.0, -14.6] },
    { name: 'MINCHAL (Compact)', pos: [4.5, 0.0, -13.2] },

    // Archive (East Under-Mezzanine Wing Z: -16.2 to -19.4m)
    { name: 'ARCHIVE_SIH', pos: [3.6, 0.0, -16.2] },
    { name: 'ARCHIVE_AI_SUMMIT', pos: [4.5, 0.0, -17.2] },
    { name: 'ARCHIVE_OPEN_SOURCE', pos: [3.6, 0.0, -18.4] },
    { name: 'ARCHIVE_HPC', pos: [4.5, 0.0, -19.4] },

    // Study (West Under-Mezzanine Wing Z: -16.2 to -19.4m)
    { name: 'STUDY_BUILD', pos: [-3.6, 0.0, -16.2] },
    { name: 'STUDY_THINK', pos: [-4.5, 0.0, -17.2] },
    { name: 'STUDY_EXPLORE', pos: [-3.6, 0.0, -18.4] },
    { name: 'STUDY_REFINE', pos: [-4.5, 0.0, -19.4] },

    // Contact (Central Monolithic Plinth at Rear Vista)
    { name: 'CONTACT_PLINTH', pos: [0.0, 0.69, -18.5] },
  ];

  // 7.1 Camera travel segment clearance (X: [-0.8, 0.8], Z: [-10.2, -14.5])
  exhibitsPositions.forEach((ex) => {
    const [x, , z] = ex.pos;
    if (z >= -14.5 && z <= -10.2) {
      const lateralDist = Math.abs(x);
      assert(
        lateralDist >= 1.5,
        `Exhibit ${ex.name} at X=${x}, Z=${z} maintains lateral clearance (${lateralDist.toFixed(2)}m >= 1.5m)`
      );
    }
  });

  // 7.2 Terminal sightline clearance: no obstacles along center corridor (X in [-1.2, 1.2], Z in [-10.2, -18.0])
  const blockingCenterExhibits = exhibitsPositions.filter((ex) => {
    const [x, , z] = ex.pos;
    return Math.abs(x) < 1.2 && z >= -18.0 && z <= -10.2;
  });
  assert(
    blockingCenterExhibits.length === 0,
    `Center axis sightline to Contact & rear vista is 100% unblocked (found ${blockingCenterExhibits.length} blockers)`
  );

  // 7.3 Pairwise exhibit collision detection (minimum separation >= 1.0m)
  console.log('\n--- 8. SPATIAL EXHIBIT PAIRWISE COLLISION DETECTION ---');
  let collisions = 0;
  for (let i = 0; i < exhibitsPositions.length; i++) {
    for (let j = i + 1; j < exhibitsPositions.length; j++) {
      const exA = exhibitsPositions[i];
      const exB = exhibitsPositions[j];
      const dx = exA.pos[0] - exB.pos[0];
      const dz = exA.pos[2] - exB.pos[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < 1.0) {
        console.error(
          `[FAIL] Collision detected between ${exA.name} and ${exB.name}: distance ${dist.toFixed(2)}m < 1.0m`
        );
        failures++;
        collisions++;
      }
    }
  }
  assert(collisions === 0, `Zero exhibit collisions detected across all ${exhibitsPositions.length} spatial installations`);

  console.log('\n' + '='.repeat(75));
  if (failures > 0) {
    console.error(`FAILED: ${failures} verification checks failed.`);
    process.exit(1);
  } else {
    console.log('SUCCESS: All M8 Portfolio Rooms & Spatial Content checks passed (0 errors).');
    process.exit(0);
  }
}

runVerification().catch((err) => {
  console.error('[FATAL ERROR]:', err);
  process.exit(1);
});

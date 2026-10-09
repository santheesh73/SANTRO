/**
 * SANTRO M10 — Portfolio Content Integration & Readability Verification Suite
 *
 * Automated verification confirming:
 * 1. Strict Centralized Content Model typing & dataset integrity
 * 2. Exactly 7 approved projects with verified status and zero fabricated metrics/URLs
 * 3. Verified skills domain mapping matching M10 Section 11
 * 4. Verifiable Archive proof records without fabricated awards
 * 5. Philosophy pillars (BUILD, THINK, EXPLORE, REFINE)
 * 6. Verified Contact destinations and channels
 * 7. Identity & Foyer narrative alignment
 * 8. Camera beat contentId correlation
 * 9. Accessible companion layer integration
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`[PASS] ${message}`);
  } else {
    failedChecks++;
    console.error(`[FAIL] ${message}`);
  }
}

console.log('===========================================================================');
console.log(' SANTRO M10 — PORTFOLIO CONTENT INTEGRATION & READABILITY VERIFICATION');
console.log('===========================================================================\n');

// --- 1. SOURCE CODE INTEGRITY & MODEL FILES ---
console.log('--- 1. SOURCE CODE INTEGRITY & TYPED CONTENT DATASETS ---');
const contentFiles = [
  'src/content/types.ts',
  'src/content/projects.ts',
  'src/content/skills.ts',
  'src/content/archive.ts',
  'src/content/philosophy.ts',
  'src/content/contact.ts',
  'src/content/profile.ts',
  'src/content/index.ts',
  'src/components/ui/ProjectDetailCompanion.tsx',
];

for (const relPath of contentFiles) {
  const fullPath = path.join(ROOT_DIR, relPath);
  assert(fs.existsSync(fullPath), `Content file exists: ${relPath}`);
}

// Read raw file contents for verification
const typesSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/content/types.ts'), 'utf-8');
const projectsSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/content/projects.ts'), 'utf-8');
const skillsSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/content/skills.ts'), 'utf-8');
const archiveSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/content/archive.ts'), 'utf-8');
const philosophySrc = fs.readFileSync(path.join(ROOT_DIR, 'src/content/philosophy.ts'), 'utf-8');
const contactSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/content/contact.ts'), 'utf-8');
const profileSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/content/profile.ts'), 'utf-8');
const configsSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/3d/rooms/experience/roomExperienceConfigs.ts'), 'utf-8');
const pageSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/app/page.tsx'), 'utf-8');
const hudSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/ViewportHUD.tsx'), 'utf-8');

// --- 2. PROJECTS AUDIT & VERIFICATION ---
console.log('\n--- 2. APPROVED PROJECTS & VERIFIED METRIC INTEGRITY ---');
const APPROVED_PROJECT_IDS = ['orion', 'hearttune', 'nisf', 'ahal-ai', 'prysm', 'bhoomi', 'minchal'];

for (const id of APPROVED_PROJECT_IDS) {
  assert(projectsSrc.includes(`id: '${id}'`), `Approved project "${id}" is defined in projectsData`);
}

// Verify no extraneous project IDs
const idMatches = [...projectsSrc.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
assert(idMatches.length === 7, `Exactly 7 projects in projectsData (found ${idMatches.length})`);
for (const id of idMatches) {
  assert(APPROVED_PROJECT_IDS.includes(id), `Project "${id}" is in approved 7 projects collection`);
}

// Verify problem and solution fields exist for all projects
const problemCount = (projectsSrc.match(/problem:\s*'/g) || []).length;
const solutionCount = (projectsSrc.match(/solution:\s*'/g) || []).length;
assert(problemCount === 7, `All 7 projects define problem statements (found ${problemCount})`);
assert(solutionCount === 7, `All 7 projects define engineered solutions (found ${solutionCount})`);

// Verify status fields exist for all projects
const statusMatches = [...projectsSrc.matchAll(/status:\s*'([^']+)'/g)].map(m => m[1]);
assert(statusMatches.length === 7, `All 7 projects define status (found ${statusMatches.length})`);
const validStatuses = ['implemented', 'in-progress', 'planned', 'prototype', 'concept'];
for (const s of statusMatches) {
  assert(validStatuses.includes(s), `Status "${s}" is a recognized M10 status tier`);
}

// PRYSM specific rule: must document concept / specification in progress honestly
assert(projectsSrc.includes(`id: 'prysm'`), 'PRYSM is registered');
assert(/id:\s*'prysm'[\s\S]*?status:\s*'concept'/.test(projectsSrc), 'PRYSM status is recorded as "concept" (specification in progress)');

// Verify zero fabricated live URLs or fake domains
assert(!projectsSrc.includes('orion.santheesh.dev'), 'Zero fabricated domain orion.santheesh.dev present');
assert(!projectsSrc.includes('fake') && !projectsSrc.includes('placeholder.com'), 'Zero fake or placeholder URLs');

// Verify zero unverified percentage metrics in project attributes
const percentageMatch = projectsSrc.match(/value:\s*'\d+(\.\d+)?%'/g);
assert(!percentageMatch, `Zero unverified percentage metrics in projectsData (found ${percentageMatch ? percentageMatch.length : 0})`);

// --- 3. ENGINEERING LAB SKILLS DOMAINS ---
console.log('\n--- 3. ENGINEERING LAB & TECHNICAL SKILLS AUDIT ---');
const requiredSkills = [
  // Programming
  'Python', 'JavaScript', 'TypeScript', 'SQL',
  // Frontend
  'React', 'Next.js',
  // Backend & Data
  'FastAPI', 'PostgreSQL', 'Supabase', 'Redis',
  // AI
  'Generative AI', 'Large Language Models (LLMs)', 'Retrieval-Augmented Generation (RAG)', 'Natural Language Processing (NLP)',
  // Deployment
  'Docker',
];

for (const skill of requiredSkills) {
  assert(skillsSrc.includes(`'${skill}'`), `Verified skill "${skill}" is present in skillsData`);
}

// Verify 5 distinct domains
const domainMatches = [...skillsSrc.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
assert(domainMatches.length === 5, `Skills grouped into exactly 5 domains matching Section 11 (found ${domainMatches.length})`);
assert(domainMatches.includes('programming'), 'Domain programming exists');
assert(domainMatches.includes('frontend'), 'Domain frontend exists');
assert(domainMatches.includes('backend-data'), 'Domain backend-data exists');
assert(domainMatches.includes('ai-intelligent'), 'Domain ai-intelligent exists');
assert(domainMatches.includes('dev-deployment'), 'Domain dev-deployment exists');

// --- 4. ARCHIVE PROOF & VERIFIABLE PROGRESS ---
console.log('\n--- 4. ARCHIVE PROOF RECORDS & HACKATHONS ---');
assert(archiveSrc.includes("'proof-sih'"), 'Smart India Hackathon record exists');
assert(archiveSrc.includes("'proof-osdhack'"), 'OSDHack 2026 record exists');
assert(archiveSrc.includes("'proof-opensource'"), 'Open Source record exists');
assert(archiveSrc.includes("'proof-milestones'"), 'Systems Architecture milestone record exists');
// Verify zero fabricated award rankings (no "First Place" or "Top 5 Finalist (1,200+ Teams)")
assert(!archiveSrc.includes('First Place'), 'Zero fabricated "First Place" award claims');
assert(!archiveSrc.includes('1,200+ Teams'), 'Zero fabricated "1,200+ Teams" rankings');

// --- 5. STUDY ENGINEERING PHILOSOPHY ---
console.log('\n--- 5. STUDY ENGINEERING PHILOSOPHY (BUILD/THINK/EXPLORE/REFINE) ---');
assert(philosophySrc.includes("'BUILD'"), 'BUILD principle pillar exists');
assert(philosophySrc.includes("'THINK'"), 'THINK principle pillar exists');
assert(philosophySrc.includes("'EXPLORE'"), 'EXPLORE principle pillar exists');
assert(philosophySrc.includes("'REFINE'"), 'REFINE principle pillar exists');

// --- 6. CONTACT DESTINATIONS & FUNCTIONAL CHANNELS ---
console.log('\n--- 6. CONTACT DESTINATIONS & FUNCTIONALITY ---');
assert(contactSrc.includes("LET'S BUILD SOMETHING MEANINGFUL."), 'Contact closing statement matches specification');
assert(contactSrc.includes('santheesh073@gmail.com'), 'Verified email santheesh073@gmail.com is present');
assert(contactSrc.includes('https://github.com/santheesh73'), 'Verified GitHub URL is present');
assert(contactSrc.includes('https://linkedin.com/in/santheesh73'), 'Verified LinkedIn URL is present');
assert(contactSrc.includes('mailto:santheesh073@gmail.com'), 'Email channel uses valid mailto scheme');

// --- 7. PERSONAL IDENTITY & FOYER ---
console.log('\n--- 7. PERSONAL IDENTITY & FOYER ALIGNMENT ---');
assert(profileSrc.includes('SANTHEESH S'), 'Profile name matches "SANTHEESH S"');
assert(profileSrc.includes('AI Software Engineer'), 'Discipline includes AI Software Engineer');
assert(profileSrc.includes('Full-Stack Developer'), 'Discipline includes Full-Stack Developer');
assert(profileSrc.includes('Generative AI Enthusiast'), 'Discipline includes Generative AI Enthusiast');
assert(profileSrc.includes('Sri Shakthi Institute of Engineering and Technology'), 'Education institution matches verified record');

// --- 8. M9 CAMERA BEAT CONTENT BINDINGS ---
console.log('\n--- 8. M9 CAMERA BEATS & CONTENT BINDINGS ---');
for (const id of APPROVED_PROJECT_IDS) {
  assert(configsSrc.includes(`contentId: '${id}'`), `Camera beat binds to project contentId "${id}"`);
}
// Verify labels do not contain unverified claims
assert(!configsSrc.includes('2M particle GPU simulation'), 'Zero speculative 2M particle claims in beat descriptions');
assert(!configsSrc.includes('National Champion'), 'Zero unverified National Champion claims in beat descriptions');

// --- 9. ACCESSIBLE COMPANION LAYER INTEGRATION ---
console.log('\n--- 9. ACCESSIBLE COMPANION LAYER INTEGRATION ---');
assert(pageSrc.includes('ProjectDetailCompanion'), 'ProjectDetailCompanion is mounted in Home page');
assert(hudSrc.includes('openProjectModal'), 'ViewportHUD binds to openProjectModal');
assert(hudSrc.includes('INSPECT'), 'ViewportHUD provides button to inspect project companion');

// --- SUMMARY ---
console.log('\n===========================================================================');
if (failedChecks === 0) {
  console.log(`SUCCESS: All M10 Portfolio Content & Readability checks PASSED (${passedChecks}/${totalChecks} checks).`);
  console.log('===========================================================================');
  process.exit(0);
} else {
  console.error(`FAILURE: ${failedChecks} checks failed (${passedChecks}/${totalChecks} passed).`);
  console.log('===========================================================================');
  process.exit(1);
}

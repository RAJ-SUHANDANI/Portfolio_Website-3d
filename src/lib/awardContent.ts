export type AwardProject = {
  slug: string;
  number: string;
  name: string;
  category: string;
  year: string;
  lead: string;
  description: string;
  challenge: string;
  solution: string;
  decisions: { title: string; body: string }[];
  stack: string[];
  github: string;
  live?: string;
  image?: string;
  imageAlt?: string;
  proof: string;
  surface: 'carbon' | 'coral' | 'paper' | 'sapphire' | 'sage';
  accent: string;
  feature: boolean;
};

const raw = (repo: string, path: string) =>
  'https://raw.githubusercontent.com/RAJ-SUHANDANI/' + repo + '/main/' + path;

export const awardProjects: AwardProject[] = [
  {
    slug: 'beyond-gravity', number: '01', name: 'Beyond Gravity', year: '2026',
    category: 'Interactive documentary / creative technology',
    lead: 'A documentary you can step inside.',
    description: 'An immersive science story told through a procedural 3D vehicle, chapter-driven motion, spatial exploration and a hands-on physics lab.',
    challenge: 'Make complex engineering concepts accessible without reducing the experience to another scrolling article or decorative WebGL scene.',
    solution: 'Combine a guided cinematic narrative with freely explorable 3D, explanatory diagrams, narration, and interactive models that react to the visitor.',
    decisions: [
      { title: '3D with a purpose', body: 'The custom vehicle geometry is an explorable educational instrument. Interactions connect directly to mechanisms described in the documentary.' },
      { title: 'Two ways through', body: 'A chapter-led film works for guided visitors; independent Explore and Experiment modes offer a more hands-on route.' },
      { title: 'Responsible storytelling', body: 'Conceptual mechanisms are identified as reconstructions, not proprietary engineering drawings or verified physical prototypes.' }
    ],
    stack: ['React 19', 'Three.js', 'React Three Fiber', 'TypeScript', 'Motion'],
    github: 'https://github.com/RAJ-SUHANDANI/Beyond_Gravity',
    live: 'https://beyondgravity-delta.vercel.app/',
    image: raw('Beyond_Gravity', 'docs/qa/desktop-chromium-future-lab.png'),
    imageAlt: 'Beyond Gravity interactive science lab screenshot from the project repository',
    proof: 'PROCEDURAL 3D · PHYSICS · NARRATIVE', surface: 'carbon', accent: '#d9f26b', feature: true
  },
  {
    slug: 'memeismine', number: '02', name: 'Meme Is Mine', year: '2026',
    category: 'Creator platform / image and video',
    lead: 'Culture moves fast. Creation should too.',
    description: 'A free web-based studio for finding meme templates, composing image and video reactions, and taking an idea from reference to export.',
    challenge: 'Make expressive editing approachable without hiding creative control behind automated generation or a heavyweight desktop workflow.',
    solution: 'Bring template discovery, an image and video editor, and a personal browser-based studio together in a focused, creator-first environment.',
    decisions: [
      { title: 'Humans make the joke', body: 'The interface helps people find material, position text and export; it does not pretend to understand humor or fabricate the creative result.' },
      { title: 'Honest persistence', body: 'Drafts and bookmarks stay in the current browser with manual backup, while verified Appwrite accounts manage identity and template reactions.' },
      { title: 'Real-world media limits', body: 'Remote source availability and supported exports vary by browser; the product documents these boundaries instead of promising universal support.' }
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Appwrite', 'FFmpeg.wasm', 'Motion'],
    github: 'https://github.com/RAJ-SUHANDANI/MemeIsMine',
    live: 'https://memeismine.vercel.app/',
    image: raw('MemeIsMine', 'public/editor-preview.jpg'),
    imageAlt: 'Meme Is Mine browser-based meme editor screenshot from the project repository',
    proof: 'EDITING · AUTH · MEDIA WORKFLOWS', surface: 'coral', accent: '#f56a46', feature: true
  },
  {
    slug: 'convotools', number: '03', name: 'ConvoTools', year: '2026',
    category: 'Developer utility / browser-first product',
    lead: 'The useful thing, without the friction.',
    description: 'A practical toolkit for transforming documents, images, audio, video and structured data right in the browser.',
    challenge: 'Offer many very different file workflows while keeping task discovery and data handling understandable and approachable.',
    solution: 'Design a shared file-first workspace and searchable tool catalog, with on-demand engines, local activity and honest limitations for complex conversions.',
    decisions: [
      { title: 'Task first, not marketing first', body: 'Visitors can start with a file or a named utility without navigating through lengthy feature tours.' },
      { title: 'Browser-local by design', body: 'Common processing happens client-side; some optional engines fetch runtime assets. Preferences and activity remain on the device.' },
      { title: 'Clear availability', body: 'The registry declares 42 tools; four AI laboratory entries are explicitly unavailable rather than represented as functional features.' }
    ],
    stack: ['Next.js', 'TypeScript', 'PDF.js', 'FFmpeg.wasm', 'Motion', 'Playwright'],
    github: 'https://github.com/RAJ-SUHANDANI/ConvoTools',
    live: 'https://convotool.vercel.app/',
    proof: '42 LISTED TOOLS · LOCAL PROCESSING', surface: 'sapphire', accent: '#96b7ed', feature: true
  },
  {
    slug: 'savora', number: '04', name: 'Savora', year: '2026',
    category: 'Full-stack / reservation platform',
    lead: 'Good hospitality needs invisible engineering.',
    description: 'A complete restaurant experience with seasonal menus, guided bookings, customer accounts and operational tools for staff.',
    challenge: 'A polished reservation interface means little if two guests can book the same table for overlapping times.',
    solution: 'Build booking integrity into PostgreSQL itself, pairing a guided guest flow with staff-facing floor plan and reservation management.',
    decisions: [
      { title: 'Database as the source of truth', body: 'A PostgreSQL GiST exclusion constraint prevents active overlapping reservations at the storage layer rather than relying on browser validation.' },
      { title: 'Two distinct contexts', body: 'Guests get a streamlined booking flow; staff get the tools needed to manage the restaurant in a dedicated workspace.' },
      { title: 'A demonstrable system', body: 'The documented demo includes seeded accounts and an in-process PostgreSQL option for exploring the complete flow.' }
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Auth.js'],
    github: 'https://github.com/RAJ-SUHANDANI/Savora',
    live: 'https://savora-booking-engine.vercel.app/',
    image: raw('Savora', 'docs/screenshots/05-reserve-desktop.jpg'),
    imageAlt: 'Savora reservation booking interface screenshot from the project repository',
    proof: 'DATABASE INTEGRITY · FULL-STACK UX', surface: 'paper', accent: '#ca815d', feature: true
  },
  {
    slug: 'veyra', number: '05', name: 'Veyra', year: '2026',
    category: 'Productivity / spatial interface',
    lead: 'A different way to see the work.',
    description: 'A creative productivity workspace combining projects, task boards, analytics, client portals and a data-reactive 3D Pulse.',
    challenge: 'Transform scattered project signals into a coherent workspace, without making the decorative layer more important than the tasks themselves.',
    solution: 'Bring project context and a visually legible 3D risk indicator into the same interactive interface, including an instantly explorable local demo.',
    decisions: [
      { title: 'Signals become spatial', body: 'The Pulse 3D orb reflects calculated workspace state instead of requiring an external AI API.' },
      { title: 'Local demo with real interactions', body: 'The documented localStorage data layer lets visitors explore the dashboard without signing up or configuring paid services.' },
      { title: 'Client visibility', body: 'Shareable read-only project views communicate progress separately from the working team dashboard.' }
    ],
    stack: ['Next.js', 'TypeScript', 'Three.js', 'Recharts', 'Tailwind CSS'],
    github: 'https://github.com/RAJ-SUHANDANI/Veyra',
    live: 'https://veyra-saas-ai.vercel.app/',
    image: raw('Veyra', 'screenshots/05-pulse.png'),
    imageAlt: 'Veyra 3D Pulse visualization screenshot from the project repository',
    proof: 'DASHBOARDS · 3D DATA VISUALIZATION', surface: 'sage', accent: '#98c5b7', feature: true
  },
  {
    slug: 'pulsefit', number: '06', name: 'PulseFit', year: '2026',
    category: 'Fitness dashboard',
    lead: 'Progress you can actually see.',
    description: 'Workout logging, habits, goals and interactive analytics designed around training consistency.',
    challenge: 'Make recurring fitness data useful rather than overwhelming.',
    solution: 'A responsive dashboard connects training activity with trend visualizations and habit tracking.',
    decisions: [{ title: 'Make data legible', body: 'Performance views use charts and readable summaries to connect daily sessions with long-term patterns.' }],
    stack: ['Next.js', 'Supabase', 'Recharts', 'GSAP'],
    github: 'https://github.com/RAJ-SUHANDANI/PulseFit',
    live: 'https://pulsefit-fitness.vercel.app',
    proof: 'ACTIVITY · PROGRESS · CHARTS', surface: 'sage', accent: '#98c5b7', feature: false
  },
  {
    slug: 'vaultiq', number: '07', name: 'VaultIQ', year: '2026',
    category: 'Finance dashboard',
    lead: 'Clarity for everyday finances.',
    description: 'A personal finance workspace for budgets, transactions, goals and spending insights.',
    challenge: 'Make personal finance less fragmented.',
    solution: 'Connect transactions, categories and goals through an organized, visual dashboard.',
    decisions: [{ title: 'Context matters', body: 'Trends and budget progress help transform raw transactions into understandable information.' }],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Recharts'],
    github: 'https://github.com/RAJ-SUHANDANI/VaultIQ',
    live: 'https://vaultiq-eight.vercel.app',
    proof: 'FINANCE · AUTH · CHARTS', surface: 'sapphire', accent: '#96b7ed', feature: false
  },
  {
    slug: 'gymspot', number: '08', name: 'GymSpot', year: '2026',
    category: 'Search and marketplace',
    lead: 'Find a place to move.',
    description: 'Gym discovery and facility management in a unified user and owner experience.',
    challenge: 'Present local facilities clearly while giving owners an operational interface.',
    solution: 'Search and comparison flows sit alongside owner and administration tools.',
    decisions: [{ title: 'Distinct audiences', body: 'Discovery for visitors is separated from owner and administrative operations.' }],
    stack: ['React', 'TypeScript', 'Supabase', 'Vite'],
    github: 'https://github.com/RAJ-SUHANDANI/GymSpot',
    live: 'https://gymspot-omega.vercel.app',
    proof: 'DISCOVERY · DASHBOARDS', surface: 'paper', accent: '#ca815d', feature: false
  },
  {
    slug: 'studynotion', number: '09', name: 'StudyNotion', year: '2026',
    category: 'Education / open-source adaptation',
    lead: 'Learning as an interface.',
    description: 'An educational course platform adaptation with catalog, account and enrollment workflows.',
    challenge: 'Combine multi-step learning tasks with clean navigation.',
    solution: 'React and Redux organize course browsing, shopping and enrollment views with an enhanced visual layer.',
    decisions: [{ title: 'Credit the foundation', body: 'This is an adaptation of an existing open-source learning platform, with improvements to the presentation and interactions.' }],
    stack: ['React', 'Redux Toolkit', 'Three.js', 'GSAP'],
    github: 'https://github.com/RAJ-SUHANDANI/StudyNotion',
    live: 'https://studynotion-psi-three.vercel.app',
    proof: 'EDUCATION · STATE MANAGEMENT', surface: 'sapphire', accent: '#96b7ed', feature: false
  },
  {
    slug: 'auditai', number: '10', name: 'AuditAI', year: '2026',
    category: 'AI / developer utilities',
    lead: 'Design critique in your workflow.',
    description: 'An experimental interface for reviewing screenshots and identifying design concerns.',
    challenge: 'Turn broad feedback into specific, actionable observations.',
    solution: 'Structure interface review into readable recommendations and supporting evidence.',
    decisions: [{ title: 'Review before claims', body: 'Only features verified by the live build should be presented as fully functional.' }],
    stack: ['Next.js', 'TypeScript', 'React'],
    github: 'https://github.com/RAJ-SUHANDANI/AuditAI',
    live: 'https://audit-ai-nine-beta.vercel.app/',
    proof: 'INTERFACE ANALYSIS · EXPERIMENT', surface: 'coral', accent: '#f56a46', feature: false
  }
];

export const featuredProjects = awardProjects.filter((project) => project.feature);
export const getAwardProject = (slug: string) => awardProjects.find((project) => project.slug === slug);
# The Proof Lab

**Raj Suhandani — interactive creative developer portfolio**

This is the exploratory **award** branch of [Portfolio_Website-3d](https://github.com/RAJ-SUHANDANI/Portfolio_Website-3d). The production \`main\` branch is deliberately unchanged.

The goal is to make real engineering work feel tangible, through art direction and interactions that are useful, not just novel. Award recognition is an ambition, not a product claim.

## Experience

- **Homepage:** editorial typography and a procedural, pointer-responsive WebGL kinetic instrument with selectable Orbit, Align and Pulse states.
- **Exhibition:** five featured projects with documented capabilities, actual repository screenshots where available, and clearly marked conceptual visuals where not.
- **Case studies:** statically generated pages for ten projects with problem, approach, engineering decisions, stack, source links and live links when documented.
- **Interactive studies:** a lightweight shape experiment and a clickable file-workflow diagram. ConvoTools' file diagram is an illustration, not a screenshot of the live app.
- **About, résumé, and contact:** fast, direct, accessible routes with the supplied handwritten signature used throughout.
- **Essential edition:** \`/classic\` is a useful non-WebGL index of every case study, rather than a coming-soon placeholder.

### Signature artwork

\`public/brand-signature.svg\` is a vector trace of the user-supplied transparent signature logo (not a substitute typeface). \`public/favicon.svg\` isolates the signature's handwritten **R** for clarity at small sizes. \`src/app/opengraph-image.tsx\` generates a branded social card as static build output.

## Engineering

Built on the existing dependency stack: Next.js 16, React 19, TypeScript, React Three Fiber, Three.js, Drei, Framer Motion and Lucide.

- \`src/components/AwardPortfolio.tsx\` — interactions, navigation, exhibition, visual experiments.
- \`src/components/AwardArtifactScene.tsx\` — original 3D sculpture, reduced-GPU visibility behavior, WebGL fallback.
- \`src/lib/awardContent.ts\` — case-study data and documented links.
- \`src/app/award.css\` — responsive identity and all award-route styling.
- \`src/app/work/[slug]/page.tsx\` — accessible server-rendered case study routes.
- \`src/app/globals.css\` — minimal global CSS reset.
- \`public/sitemap.xml\` and \`public/robots.txt\` — basic indexability.

The site is statically exported, so it does not need a running Next.js server. Heavy 3D is dynamically imported, limited on smaller devices, stopped while its hero is offscreen, and replaced with a CSS sculpture when WebGL or motion preferences require it. Navigation and project links work without WebGL. All controls have actual state.

## Run and verify

\`\`\`bash
npm install
npm run typecheck
npm run build
npm run dev
\`\`\`

The repository's pull-request workflow also verifies TypeScript and the production build. A successful build is **not** a claim that full real-device visual, accessibility or Core Web Vitals testing has been completed.

Recommended manual passes before merging:

1. 320 / 375 / 430 / 768 / 1024 / 1440 / 1920 px viewports, desktop Chrome and Safari/iOS.
2. Keyboard navigation: skip link, index modal, Ctrl/Cmd+K search, links, Escape, tab order.
3. Reduced motion, WebGL-disabled devices, low-power phones and scroll performance.
4. Image source integrity and color contrast on all case studies.
5. Real-user or lab Core Web Vitals and accessibility review with assistive technologies.
6. Verify every live product link, repository attribution and content claim.

## Featured work

- [Beyond Gravity](https://github.com/RAJ-SUHANDANI/Beyond_Gravity)
- [Meme Is Mine](https://github.com/RAJ-SUHANDANI/MemeIsMine)
- [ConvoTools](https://github.com/RAJ-SUHANDANI/ConvoTools)
- [Savora](https://github.com/RAJ-SUHANDANI/Savora)
- [Veyra](https://github.com/RAJ-SUHANDANI/Veyra)

The implementation distinguishes documented behavior from measured outcomes. It does not invent visitors, customers, performance scores, endorsements, or revenue.

**Review the draft pull request before any merge into \`main\`.**
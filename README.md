# Raj Manish Suhandani — Interactive 3D Developer Portfolio

A personal creative-developer website built with **Next.js, TypeScript, React Three Fiber, Three.js, Drei and Framer Motion**. Custom procedural 3D laptop, editorial typography, project case studies, searchable navigation, experience timeline, socials and an ATS-oriented resume.

## Install
Requires Node.js 22.
```bash
npm install
npm run dev
npm run typecheck
npm run build
```
The project uses a static Next.js export (`out/`). No payment, third-party API key or server database required. Publish with Cloudflare Pages or other static hosting.

## Routes
- `/` immersive 3D experience
- `/work/[slug]` seven documented project pages
- `/resume` readable resume plus download links
- `/classic` placeholder for a future no-3D website

## Career and source details
Professional information is sourced from the user's October 2026 resume and InfoLabz certificate, the user-confirmed Ocavior internship, and README documentation from their GitHub projects. Ocavior's exact starting month and year have not been independently documented: website displays a provisional date. The InfoLabz certificate explicitly confirms July 3–17, 2026.

## Performance
WebGL laptop lazily imported on supported desktop environments, with mobile/reduced-motion fallback; `frameloop="demand"` and capped DPR. Keyboard-accessible navigation and reduced motion preferences. Independently verify browser compatibility and performance on target devices before launch.

## Portfolio data
`src/lib/data.ts` contains all project details and professional profile information. The resume PDF is also provided separately in this conversation for verification. 

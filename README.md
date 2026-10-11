# Raj Suhandani | Interactive 3D Portfolio

An original developer portfolio built to introduce my work, explain the thinking behind my projects, and make it easy to explore each application. The site combines editorial typography, an interactive 3D laptop, practical project case studies, and direct links to my work.

**Developer:** Raj Manish Suhandani  
**Location:** Bhavnagar, Gujarat, India  
**LinkedIn:** https://www.linkedin.com/in/raj-suhandani-a4a393321  
**GitHub:** https://github.com/RAJ-SUHANDANI

## What you will find

The homepage begins with a desktop 3D laptop that responds to interaction. It continues into an About section with my portrait, a technology skills section, selected projects, a searchable project archive, professional experience, a resume section, and links to my socials.

The portfolio uses a consistent design system with graphite, porcelain and soft green accents. The 3D scene adds depth to the introduction without making the rest of the site harder to use.

### Main pages

| Route | Purpose |
| --- | --- |
| `/` | Interactive portfolio, biography, skills, projects, experience and contact links |
| `/work/[slug]` | Dedicated pages explaining each project and linking to its live application and source code |
| `/resume` | Resume summary with links to the downloadable PDF and plain text file |
| `/classic` | Reserved for a future traditional portfolio |

## Featured projects

Each project card opens a portfolio case study. The case study summarizes its purpose, implementation, technology stack and features, then provides a live application button and a GitHub source link where available. Links below come from the project repository documentation.

| Project | What it does | Live application | Source |
| --- | --- | --- | --- |
| **Veyra** | Workspace management with task boards, analytics, client portals and a 3D Pulse visualization | [Open Veyra](https://veyra-saas-ai.vercel.app) | [GitHub](https://github.com/RAJ-SUHANDANI/Veyra) |
| **Savora** | Restaurant reservations, menus, customer accounts, staff tools and database booking safeguards | [Open Savora](https://savora-booking-engine.vercel.app) | [GitHub](https://github.com/RAJ-SUHANDANI/Savora) |
| **PulseFit** | Workout logs, progress charts, fitness goals and habit tracking | [Open PulseFit](https://pulsefit-fitness.vercel.app) | [GitHub](https://github.com/RAJ-SUHANDANI/PulseFit) |
| **VaultIQ** | Expense tracking, budgeting, financial analytics and savings goals | [Open VaultIQ](https://vaultiq-eight.vercel.app) | [GitHub](https://github.com/RAJ-SUHANDANI/VaultIQ) |
| **GymSpot** | Gym discovery with member, facility owner and administration views | [Open GymSpot](https://gymspot-omega.vercel.app) | [GitHub](https://github.com/RAJ-SUHANDANI/GymSpot) |
| **StudyNotion** | Enhanced course discovery and enrollment with React, Redux, Three.js and GSAP | [Open StudyNotion](https://studynotion-psi-three.vercel.app) | [GitHub](https://github.com/RAJ-SUHANDANI/StudyNotion) |
| **AuditAI** | Exploration of an AI assisted developer code review interface | No verified public demo | [GitHub](https://github.com/RAJ-SUHANDANI/AuditAI) |

Project descriptions summarize the corresponding repositories. AuditAI currently has a default Next.js README and no documented deployment URL, so its page directs users to the source rather than inventing a link.

## Experience and education

**Social Media Manager Intern at Ocavior:** Content planning, copywriting for LinkedIn, Instagram and Facebook, campaign ideas, and brand communication. The start month is not yet documented.

**React Development Intern at InfoLabz IT Services Pvt. Ltd.:** Completed the summer internship from 3 to 17 July 2026 in Ahmedabad. Learned and applied JavaScript ES6, React and API integration, and created an application using API data.

**Government Engineering College, Bhavnagar:** Bachelor of Engineering in Information and Communication Technology, 2023 to 2027, CGPA **8.04/10**.

## Technology stack

| Area | Libraries and tools |
| --- | --- |
| Application | Next.js 16, React 19, TypeScript |
| 3D experience | Three.js, React Three Fiber, Drei |
| Animation | Framer Motion and CSS transitions |
| Icons | Lucide React |
| Styling | Custom responsive CSS with a consistent design system |
| Navigation | Next.js App Router, project routes and keyboard quick search |
| Deployment | Static Next.js export compatible with static hosting |

All code dependencies come from free and open source packages. No premium component subscription is required.

## Performance and accessibility

The site uses one procedural 3D laptop instead of a large downloaded model. Its WebGL experience loads separately from the main content. The 3D canvas uses demand based rendering and a limited device pixel ratio. On mobile devices, browsers without WebGL, or when reduced motion is preferred, the hero displays a static CSS workstation instead.

The About portrait is an optimized WebP image. The design includes accessible link text, keyboard navigation, visible focus states, responsive layouts and reduced motion behavior.

These design choices aim to keep the site responsive. Real performance must still be checked on the deployed site across devices and browsers.

## Getting started

You need **Node.js 22** and npm.

```bash
git clone https://github.com/RAJ-SUHANDANI/Portfolio_Website-3d.git
cd Portfolio_Website-3d
npm install
npm run dev
```

Open **http://localhost:3000** to view the development server.

### Quality checks

```bash
npm run typecheck
npm run build
```

The GitHub Actions workflow in `.github/workflows/quality.yml` runs the TypeScript check and production build when code is pushed to `main` or submitted in a pull request.

## Deployment

The project is configured for static export in `next.config.ts`. The production build creates an `out/` directory.

```bash
npm run build
```

You can deploy the `out/` folder to Cloudflare Pages or another static hosting service. Hosting is independent from the six external project applications linked above. The portfolio repository does not automatically deploy those applications.

## Repository guide

```text
public/
  Raj-Suhandani-Resume.pdf       Downloadable resume
  Raj-Suhandani-Resume.txt       ATS friendly plain text version
  raj-suhandani-portrait.webp    Optimized personal portrait
src/
  app/
    page.tsx                     Portfolio entry route
    globals.css                  Layout, typography and responsive styling
    resume/page.tsx              Resume route
    work/[slug]/page.tsx         Individual project case studies
    classic/page.tsx             Future classic portfolio
  components/
    Portfolio.tsx                Main page and interactions
    Laptop3D.tsx                 Procedural 3D laptop
  lib/
    data.ts                      Projects, skills and experience
.github/workflows/quality.yml    Build checks
```

## Updating content

Project names, descriptions, highlights, tech stacks and live URLs are stored in `src/lib/data.ts`. Add or edit a project there and its case study will be generated through `/work/[slug]`.

The downloadable resume is `public/Raj-Suhandani-Resume.pdf`, while `public/Raj-Suhandani-Resume.txt` provides an accessible text alternative. Keep the PDF, text file and on page biography consistent when details change.

The About image is `public/raj-suhandani-portrait.webp`. Replace it with an optimized image of the same name to update the photograph without editing the component.

## Design principles

Good development work is easier to appreciate when the interface is clear. The portfolio aims to use 3D deliberately, present actual applications instead of invented examples, and let visitors reach the projects and resume without unnecessary animation.

## Contact

For opportunities, collaboration or feedback, connect through [LinkedIn](https://www.linkedin.com/in/raj-suhandani-a4a393321), browse [GitHub](https://github.com/RAJ-SUHANDANI), or email **rajsuhandani11@gmail.com**.

© 2026 Raj Manish Suhandani.

# Portfolio — Editorial Workbench Redesign

Work-in-progress redesign of [Raj Suhandani's portfolio](https://rajsuhandani.vercel.app/), developed on the isolated **redesign** branch. The original main branch remains unchanged until the new experience has passed review.

## Creative direction

An editorial developer portfolio that pairs confident typography and authentic project visuals with purposeful 3D. Not a component showcase: the work itself is the centerpiece.

### Featured work
- **Meme Is Mine** — image/video meme editor, template discovery, browser export and local Studio
- **ConvoTools** — browser-first file workspace with 42 catalog entries, four of them marked coming soon
- **Veyra** — product planning and meaningful 3D signal display
- **Savora** — reliable restaurant reservations and data integrity

All nine projects remain searchable in the archive and accessible through individual case-study routes.

## Implementation notes

- Retains Next.js App Router, React, TypeScript, custom CSS and the existing React Three Fiber laptop.
- Adds a dedicated editorial homepage and accessible mobile/desktop navigation.
- Uses authentic repository screenshots when available, with labeled illustration for ConvoTools.
- Preserves existing case-study routes, extending them to the two new projects.
- Does not introduce Tailwind, additional animation libraries or paid component registries.
- Nonessential hero WebGL is disabled for reduced-motion users and small screens.

## Verification
Run:
- npm install
- npm run typecheck
- npm run build

Then visually test the homepage, menu, project filters, every case-study page, mobile and keyboard interaction, with particular attention to broken remote screenshots. GitHub Actions runs type-check and build for this branch. Production deploy/merge is not automatic.

## Source-of-truth constraints

- Meme Is Mine draft collections are browser-local; they do not automatically sync across devices.
- ConvoTools' four AI lab entries are labeled **coming soon**.
- The ConvoTools portfolio mockup is an **illustration based on its interface**, not an actual screenshot.

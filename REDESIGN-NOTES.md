# Portfolio redesign

The redesigned portfolio uses captures from each of the nine deployed project websites. The screenshots are stored in `public/project-captures` and were captured using a real Chromium browser at desktop and phone viewports. The JSON capture report records origin URLs and HTTP results.

Run `npm run typecheck` and `npm run build`. The dedicated browser workflow builds the project, checks all nine case studies, validates project filters, carousel, keyboard menu, image loads, viewport switches, and saves full-page screenshots for desktop and mobile review.

The visual direction emphasizes personal writing, the authentic project screenshots, and Raj's real signature. The header logo and `favicon.svg` are high-resolution vector contour traces of the **original 2048 × 682 transparent signature PNG supplied by the user**. The earlier rough low-resolution trace has been replaced. The vector preserves the source handwritten shape without adding synthetic brush strokes or extra outlines. The favicon crops the signature to the handwritten **Raj** section.

The featured Meme Is Mine and ConvoTools previews use CSS grid, `min-width: 0`, and `object-fit: contain` so desktop screenshots are fully visible within browser frames; the phone preview sits in its own grid column. At narrow breakpoints the desktop capture remains unobstructed. Browser tests assert no clipping, overflow, or overlap.

The social preview image (`public/social-card.jpg`) is composed from the same signature and authentic captured website screenshots by `scripts/create-social-card.mjs`. Open Graph and X/Twitter metadata reference this image using the current deployment base URL.

Main stays untouched. All changes are limited to the `redesign` branch and PR #2 until approved.

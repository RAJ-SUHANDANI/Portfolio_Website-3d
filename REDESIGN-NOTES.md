# Portfolio redesign

The redesigned portfolio uses captures from each of the nine deployed project websites. The screenshots are stored in `public/project-captures` and were captured using a real Chromium browser at desktop and phone viewports. The JSON capture report records origin URLs and HTTP results.

Run `npm run typecheck` and `npm run build`. The dedicated browser workflow builds the project, checks all nine case studies, validates project filters, carousel, keyboard menu, image loads, viewport switches, and saves full-page screenshots for desktop and mobile review.

The visual direction emphasizes personal writing, the authentic project screenshots, and Raj's real signature. The header logo and `favicon.svg` are high-resolution vector contour traces of the **original 2048 × 682 transparent signature PNG supplied by the user**. The earlier rough low-resolution trace has been replaced. The vector preserves the source handwritten shape without adding synthetic brush strokes or extra outlines. The favicon crops the signature to the handwritten **Raj** section.

The featured Meme Is Mine and ConvoTools previews use CSS grid, `min-width: 0`, and `object-fit: contain` so desktop screenshots are fully visible within browser frames; the phone preview sits in its own grid column. At narrow breakpoints the desktop capture remains unobstructed. Browser tests assert no clipping, overflow, or overlap.

The social preview image (`public/social-card.jpg`) is composed from the same signature and authentic captured website screenshots by `scripts/create-social-card.mjs`. Open Graph and X/Twitter metadata reference this image using the current deployment base URL.

Main stays untouched. All changes are limited to the `redesign` branch and PR #2 until approved.

## New interaction references

- [Skiper UI 08, Words preloader](https://skiper-ui.com/v1/skiper8): the original is Pro gated; we created a standalone introductory word sequence without copying paid source and skip it after the first view in a session.
- [Amicro btn-33](https://amicro.dev/buttons/btn-33), [hover card](https://amicro.dev/animations), and [focus blur](https://amicro.dev/text-animations): custom magnetic CTAs, accessible resume hover card, and keyboard-aware focus links. Source design inspiration from Amicro, MIT license.
- [Animate UI Icon Button](https://animate-ui.com/docs/primitives/animate-ui/icon-button): original icon particle reaction. Counts are **per-browser likes only** until a real shared database is configured; the site never invents global totals.
- [Animate UI Stars](https://animate-ui.com/docs/backgrounds/stars): three lightweight, CSS-rendered star layers, offscreen pause and reduced motion support, no canvas dependency.
- [Animate UI Theme Toggler](https://animate-ui.com/docs/primitives/animate-ui/theme-toggler-button): saved light and dark preference with icon rotation and global semantic color overrides. Verify contrast in both modes.
- The scroll phone mirrors each page chapter, using real captured website mobile screenshots wherever project images are involved and live content for editorial sections. It stays outside the reading column, hides on narrow viewports, and is ignored by assistive tech.

**Global like totals remain an open backend requirement.** The portfolio is statically exported and has no dedicated likes storage. Rather than create fake numbers, each device persists a personal heart reaction and displays its own 0 or 1 with an explicit `Your like` label. A dedicated, rate-limited backend is needed before offering shared counts.

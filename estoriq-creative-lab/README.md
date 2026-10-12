# Estoriq Creative Lab — Prototype v0.1

A **Vite + React** creative studio website prototype intended for **owner QC only**. Do not deploy to the production domain or merge a release without explicit approval.

## Pages/sections

- Premium landing hero and creative studio positioning
- Curated work grid with **Studio / Director’s Archive / Originals** filters
- Accessible project-detail modal
- Services and expertise section
- LANGKATERA originals teaser (clearly identified as an *abstract concept*)
- About/studio philosophy and contact via known Behance profile
- Mobile navigation and responsive layouts

## Run locally

Use Node 22.12+ or Node 20.19+.

```bash
npm install
npm run dev
```

For production-style build testing:

```bash
npm run build
npm run preview
```

For an offline, portable **single-file QC preview**, after building run:

```bash
npm run qc:html
```

This creates `review-preview.html` with inlined compiled CSS/JS. It is for local review only. It is not a public deployment.

## Creative direction

Editorial, minimal, dark-chrome visual system with warm copper accent and intentionally art-directed original SVG concept imagery. **No actual client work or client images are included yet.**

## Release blockers — QC required

1. Approve brand logo, typography, content copy, visual direction.
2. Supply/approve portfolio images, video and project descriptions, especially client permissions.
3. Distinguish Studio works from the director’s personal archive and verify all credits.
4. Approve contact email, enquiry workflow and final domain.
5. Complete accessibility, SEO, privacy/legal and production cross-device tests.
6. Explicit owner approval before hosting/deployment/production release.

## Repository workflow

Create an isolated feature branch and draft pull request. Do **not** modify `main` during QC. A production build should only be deployed after sign-off.

# Estoriq Creative Lab — Website Prototype V0.2

**Owner QC build only. Not approved for public production release.**

A Vite + React responsive prototype for Estoriq Creative Lab, focused on studio lead generation and clear professional attribution.

## What changed since V0.1

- Rewritten information architecture: hero → case-study-first work → services → studio → director archive → originals → enquiry.
- Three individual interactive case-study **slots** rather than studio/archive/IP category cards.
- Stronger direct CGI positioning and primary calls to action.
- Explicit credits distinction: Director's Archive is not studio-commissioned work.
- Mobile-first QA features, keyboard Escape in project dialogs, accessible labels, reduced-motion support.
- Contact uses existing verified Behance address until company email / enquiry path approved.
- Artwork and project information are **concept placeholders**, not real/approved client work.

## QC & build

Run `npm install`, `npm run dev`, `npm run build`, then `npm run qc:html` to create self-contained `review-preview.html` for checking via hosted HTML preview. Never deploy / merge into main without owner approval.

## Release blockers

1. Owner approves page layout, brand typography, palette and microcopy.
2. Owner provides/approves actual commercial project visuals and case studies, final credits, permissions.
3. Director's Archive correctly credits individual role and employer.
4. Business email/contact method approved.
5. Accessibility, link, speed, mobile/desktop and SEO QA.
6. Production deployment requires explicit approval.

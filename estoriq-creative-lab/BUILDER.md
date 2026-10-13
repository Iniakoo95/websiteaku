# Estoriq Studio Canvas — Figma-inspired Website Builder (Alpha)

Custom Estoriq interface with the free open-source GrapesJS visual HTML editor embedded inside Vite + React. The original React website remains accessible without `mode` query string. **No public production publishing is wired.**

## Open

- `npm install && npm run dev`
- `http://localhost:5173/?mode=builder`
- Desktop Chrome recommended; editing on phone supported in a constrained panel layout, desktop/tablet advised for serious layout work.
- `?mode=studio` / `?mode=editor` are backwards compatible aliases.

## Available in this alpha

- Insert / Layers / Assets side panel, custom top toolbar, selection and element inspector
- Drag HTML content blocks and sections, reorder layers, resize handles, inline text editing
- Layout, font, borders, colors and full CSS style manager via right panel
- Freeform Frame with absolute-positioned shape; X/Y/width/height, opacity, rotation controls
- Desktop  / Tablet / Mobile canvas widths with GrapesJS device modes
- Undo / redo, duplicate / delete, live preview overlay
- Local browser autosave and manual Save Draft
- Import/export GrapesJS JSON, standalone HTML export (static only; not production deployment)
- Upload images from device as data URLs to local project (1.5 MB/image, can fill browser quota)
- Seed design mirrors Estoriq portfolio V0.2 sections, but is an independent editable HTML representation, not the JSX App component tree.

## Deliberate constraints

- **Not full Figma**. Freeform positioning works inside frames, while responsive web sections need semantic layout (flex/grid).
- No cloud sync, account login, collaboration/cursors, vector pen/Boolean, components/variants, auto-layout inspector, asset hosting, video upload, or actual design-to-React automatic synchronization.
- Changes to custom canvas **do not change existing React homepage** until owner reviews exported JSON/HTML and developer integrates it.
- Studio canvas URL is a QC implementation, not an authenticated CMS. Avoid uploading confidential client assets if using public third-party CDN preview.
- localStorage is per origin and browser (and can be cleared). Export a project JSON file regularly. Local draft limits depend on device.
- CSS/HTML export is static; external media/fonts may need network. No backend or user form is included.
- Hosting/editor in production needs authentication and a separate project database before use with private work.

## Test / preview

`npm run build` compiles the app. CI creates a static snapshot in `dist` on the **feature branch only**, for browsing via a temporary external GitHub-content preview. No GitHub Pages settings or custom domain is changed. Verify all interactions in a real browser before treating this as stable.

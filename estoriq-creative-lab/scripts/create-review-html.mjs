import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(process.cwd())
const assetsDir = path.join(root, 'dist', 'assets')
const assetNames = await readdir(assetsDir)
const cssFile = assetNames.find(name => name.endsWith('.css'))
const jsFile = assetNames.find(name => name.endsWith('.js'))

if (!cssFile || !jsFile) {
  throw new Error('Missing build assets; run npm run build first')
}

const html = await readFile(path.join(root, 'dist', 'index.html'), 'utf8')
const css = await readFile(path.join(assetsDir, cssFile), 'utf8')
const js = await readFile(path.join(assetsDir, jsFile), 'utf8')

// Replacement functions are essential: JavaScript bundles can contain $&, $', $1
// and other sequences interpreted specially by String.replace replacement strings.
const safeJs = js.replace(/<\/script/gi, '<\\/script')

const scriptPattern = /<script\b[^>]*\bsrc=["']\.\/assets\/[^"']+\.js["'][^>]*><\/script>/i
const stylePattern = /<link\b[^>]*\brel=["']stylesheet["'][^>]*>/i

if (!scriptPattern.test(html) || !stylePattern.test(html)) {
  throw new Error('Expected built JS and CSS asset references not found in dist/index.html')
}

const inlined = html
  .replace(scriptPattern, () => `<script type="module">${safeJs}</script>`)
  .replace(stylePattern, () => `<style>${css}</style>`)
  .replace(
    'href="./favicon.svg"',
    'href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 64 64\'%3E%3Crect width=\'64\' height=\'64\' fill=\'%23111113\'/%3E%3Ctext x=\'18\' y=\'48\' fill=\'white\' font-size=\'40\'%3EE%3C/text%3E%3C/svg%3E"'
  )

const scripts = [...inlined.matchAll(/<script\b/gi)].length
const closingScripts = [...inlined.matchAll(/<\/script\s*>/gi)].length
const injectedAssetTags = [...inlined.matchAll(/<script\b[^>]*\bsrc=["']\.\/assets\//gi)].length

if (scripts !== 2 || closingScripts !== 1 || injectedAssetTags !== 0) {
  // React DOM's own compiled JS includes the literal text "<script>" for
  // DOM initialization, so two script opening tokens is expected in raw text.
  throw new Error(`Invalid QC HTML: ${scripts} script opening tokens, ${closingScripts} closing tokens, ${injectedAssetTags} external script tags`)
}

await writeFile(path.join(root, 'review-preview.html'), inlined, 'utf8')
console.log('QC HTML validated and written to review-preview.html')

import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(process.cwd())
const assetsDir = path.join(root, 'dist', 'assets')
const assetNames = await readdir(assetsDir)
const cssFile = assetNames.find(name => name.endsWith('.css'))
const jsFile = assetNames.find(name => name.endsWith('.js'))
if (!cssFile || !jsFile) throw new Error('Missing build assets; run npm run build first')
const html = await readFile(path.join(root, 'dist', 'index.html'), 'utf8')
const css = await readFile(path.join(assetsDir, cssFile), 'utf8')
const js = await readFile(path.join(assetsDir, jsFile), 'utf8')

// Replacement functions matter: compiled JavaScript may contain $&, $', $1 etc.
const scriptPattern = /<script\b[^>]*\bsrc=["']\.\/assets\/[^"']+\.js["'][^>]*><\/script>/i
const stylePattern = /<link\b[^>]*\brel=["']stylesheet["'][^>]*>/i
if (!scriptPattern.test(html) || !stylePattern.test(html)) throw new Error('Build did not include expected assets')
const safeJs = js.replace(/<\/script/gi, '<\\/script')
const inlined = html
  .replace(scriptPattern, () => `<script type="module">${safeJs}</script>`)
  .replace(stylePattern, () => `<style>${css}</style>`)
  .replace('href="./favicon.svg"', 'href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 64 64\'%3E%3Crect width=\'64\' height=\'64\' fill=\'%23202120\'/%3E%3Ctext x=\'20\' y=\'48\' fill=\'white\' font-size=\'43\'%3Ee%3C/text%3E%3C/svg%3E"')
const opens = (inlined.match(/<script\b/gi) || []).length
const closes = (inlined.match(/<\/script\s*>/gi) || []).length
if (opens !== 2 || closes !== 1 || inlined.includes('src="./assets/')) throw new Error(`Invalid single-file HTML structure: ${opens}/${closes}`)
await writeFile(path.join(root, 'review-preview.html'), inlined)
console.log('Generated and validated review-preview.html')

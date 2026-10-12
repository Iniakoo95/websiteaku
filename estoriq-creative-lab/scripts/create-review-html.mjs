import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(process.cwd())
const assetsDir = path.join(root, 'dist', 'assets')
const assetNames = await readdir(assetsDir)
const cssFile = assetNames.find(x => x.endsWith('.css'))
const jsFile = assetNames.find(x => x.endsWith('.js'))
if (!cssFile || !jsFile) throw new Error('Missing build assets; run npm run build first')
const html = await readFile(path.join(root, 'dist', 'index.html'), 'utf8')
const css = await readFile(path.join(assetsDir, cssFile), 'utf8')
const js = await readFile(path.join(assetsDir, jsFile), 'utf8')
const inlined = html
 .replace(/<link\s+rel="stylesheet"[^>]*>/, `<style>${css}</style>`)
 .replace(/<script[^>]*src="\.\/assets\/[^\"]+"[^>]*><\/script>/, `<script type="module">${js.replace(/<\/script/gi,'<\\/script')}</script>`)
 .replace('href="./favicon.svg"', 'href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 64 64\'%3E%3Crect width=\'64\' height=\'64\' fill=\'%23111113\'/%3E%3Ctext x=\'18\' y=\'48\' fill=\'white\' font-size=\'40\'%3EE%3C/text%3E%3C/svg%3E"')
await writeFile(path.join(root, 'review-preview.html'), inlined)
console.log('Created review-preview.html — opens directly in a browser, no hosting needed')

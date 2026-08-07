import { readFile, readdir } from 'node:fs/promises'

const root = new URL('../', import.meta.url)

async function listJsx(relative) {
  return (await readdir(new URL(relative, root))).filter((name) => name.endsWith('.jsx'))
}

const app = await readFile(new URL('src/App.jsx', root), 'utf8')
const gitignore = await readFile(new URL('.gitignore', root), 'utf8')
const components = await listJsx('src/components/')
const pages = await listJsx('src/pages/')
const hooks = (await readdir(new URL('src/hooks/', root))).filter((name) => name.endsWith('.js'))
const routeCount = (app.match(/<Route\s/g) ?? []).length - 1

const checks = [
  [routeCount >= 7, `path routes >= 7 (actual ${routeCount})`],
  [app.includes('path="*"'), 'Not Found wildcard route exists'],
  [components.length >= 8, `reusable component files >= 8 (actual ${components.length})`],
  [pages.length >= 6, `page files >= 6 (actual ${pages.length})`],
  [hooks.includes('useNotes.js') && hooks.includes('useNote.js'), 'custom hooks exist'],
  [gitignore.split(/\r?\n/).includes('.env'), '.env is ignored'],
]

let failed = 0
for (const [ok, label] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`)
  if (!ok) failed += 1
}

if (failed) process.exit(1)

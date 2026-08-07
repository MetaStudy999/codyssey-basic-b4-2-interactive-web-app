import { access, readFile, readdir } from 'node:fs/promises'

const root = new URL('../', import.meta.url)

async function listJsx(relative) {
  return (await readdir(new URL(relative, root))).filter((name) => name.endsWith('.jsx'))
}

async function exists(relative) {
  try {
    await access(new URL(relative, root))
    return true
  } catch {
    return false
  }
}

const app = await readFile(new URL('src/App.jsx', root), 'utf8')
const gitignore = await readFile(new URL('.gitignore', root), 'utf8')
const pages = await listJsx('src/pages/')
const hooks = (await readdir(new URL('src/hooks/', root))).filter((name) => name.endsWith('.js'))
const routeCount = (app.match(/<Route\s/g) ?? []).length - 1

const reusableComponents = [
  'Button',
  'TextField',
  'TextAreaField',
  'SelectField',
  'LoadingState',
  'ErrorState',
  'EmptyState',
  'PageHeader',
  'StatusBanner',
  'NoteCard',
  'NoteList',
  'NoteForm',
  'ConfirmDialog',
]
const reusableChecks = await Promise.all(
  reusableComponents.map((name) => exists(`src/components/${name}.jsx`)),
)
const reusableCount = reusableChecks.filter(Boolean).length

const checks = [
  [routeCount >= 7, `path routes >= 7 (actual ${routeCount})`],
  [app.includes('path="*"'), 'Not Found wildcard route exists'],
  [reusableCount >= 8, `declared prop-based reusable components >= 8 (actual ${reusableCount})`],
  [reusableCount === reusableComponents.length, 'all declared reusable component files exist'],
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

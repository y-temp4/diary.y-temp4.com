import * as fs from 'fs'
import * as path from 'path'
import remark from 'remark'
import html from 'remark-html'
import matter from 'gray-matter'
import { formatDate } from 'lib/date'

const DIR = path.join(process.cwd(), 'contents')
const EXTENSION = '.md'

type Fs = typeof fs

export function listContentFiles({ fs }: { fs: Fs }) {
  const filenames = fs.readdirSync(DIR)
  return filenames.filter((filename) => path.parse(filename).ext === EXTENSION)
}

export async function readContentFile({
  fs,
  filename,
  slug,
}: {
  fs: Fs
  filename: string
  slug?: string
}) {
  if (slug === undefined) {
    slug = path.parse(filename).name
  }
  const raw = fs.readFileSync(path.join(DIR, `${slug}${EXTENSION}`), 'utf8')
  const matterResult = matter(raw)
  const { title = '', createdAt: rawCteatedAt, category } = matterResult.data
  const parsedContent = await remark().use(html).process(matterResult.content)
  const content = parsedContent.toString()
  return {
    title,
    createdAt: formatDate(rawCteatedAt),
    content,
    slug,
    category,
  } as {
    title: string
    createdAt: string
    content: string
    slug: string
    category?: string[]
  }
}

export async function readContentFiles({ fs }: { fs: Fs }) {
  const promisses = listContentFiles({ fs }).map((filename) =>
    readContentFile({ fs, filename })
  )
  const contents = await Promise.all(promisses)
  return contents.sort(sortWithProp('createdAt', true))
}

function sortWithProp(name: string, reversed: boolean) {
  return (a: any, b: any) => {
    if (reversed) {
      return a[name] < b[name] ? 1 : -1
    } else {
      return a[name] < b[name] ? -1 : 1
    }
  }
}

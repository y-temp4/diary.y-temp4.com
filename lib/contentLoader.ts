import * as fs from 'fs'
import * as path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import matter from 'gray-matter'
import strip from 'strip-markdown'
import { formatDate } from 'lib/date'
import { Post } from 'types/post'

const DIR = path.join(process.cwd(), 'contents')
const EXTENSION = '.md'

export function listContentFiles() {
  const filenames = fs.readdirSync(DIR)
  return filenames.filter((filename) => path.parse(filename).ext === EXTENSION)
}

export async function readContentFile(filename: string): Promise<Post> {
  const slug = filename.endsWith(EXTENSION)
    ? filename.slice(0, -EXTENSION.length)
    : filename
  const raw = fs.readFileSync(path.join(DIR, `${slug}${EXTENSION}`), 'utf8')
  const matterResult = matter(raw)
  const { title = '', createdAt: rawCreatedAt, category } = matterResult.data
  const parsedContent = await remark().use(html).process(matterResult.content)
  const content = parsedContent.toString()
  const MAX_LENGTH = 90
  const description = `${(
    await remark().use(strip).process(matterResult.content)
  )
    .toString()
    .substring(0, MAX_LENGTH)} ...`
  return {
    title,
    createdAt: formatDate(rawCreatedAt),
    content,
    slug,
    category,
    description,
  }
}

export async function readContentFiles() {
  const promises = listContentFiles().map((filename) =>
    readContentFile(filename)
  )
  const contents = await Promise.all(promises)
  return contents.sort(sortByProp('createdAt', true))
}

function sortByProp(name: string, reversed: boolean) {
  return (a: any, b: any) => {
    if (reversed) {
      return a[name] < b[name] ? 1 : -1
    } else {
      return a[name] < b[name] ? -1 : 1
    }
  }
}

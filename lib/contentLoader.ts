import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import removeComments from 'remark-remove-comments'
import matter from 'gray-matter'
import strip from 'strip-markdown'
import { formatDate } from 'lib/date'
import { Post } from 'types/post'

const POSTS_DIR = path.join(process.cwd(), 'contents')
const POST_EXTENSION = '.md'

export function listContentFiles() {
  const filenames = fs.readdirSync(POSTS_DIR)
  return filenames.filter(
    (filename) => path.parse(filename).ext === POST_EXTENSION
  )
}

export async function readContentFile(filename: string): Promise<Post> {
  const slug = path.parse(filename).name
  const raw = fs.readFileSync(
    path.join(POSTS_DIR, `${slug}${POST_EXTENSION}`),
    'utf8'
  )
  const matterResult = matter(raw)
  const { title = '', createdAt: rawCreatedAt, category } = matterResult.data
  const parsedContent = await remark()
    .use(remarkHtml, { sanitize: false })
    .use(removeComments)
    .process(matterResult.content)
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
  return contents.sort(sortByProp('createdAt'))
}

function sortByProp<T>(name: keyof T, reversed: boolean = true) {
  return (a: T, b: T) => {
    if (reversed) {
      return a[name] < b[name] ? 1 : -1
    } else {
      return a[name] < b[name] ? -1 : 1
    }
  }
}

import Link from 'next/link'
import type { Post } from 'types'
import { CategoryLink } from 'components/CategoryLink'

export function PostList({
  posts,
  showCategory = true,
}: {
  posts: Post[]
  showCategory?: boolean
}) {
  return (
    <>
      {posts.map((post) => (
        <article className="mb-4 flex flex-col" key={post.createdAt}>
          <time className="text-sm text-gray-700 block">{post.createdAt}</time>
          <h2 className="text-2xl font-bold">
            <Link href={`/posts/${post.slug}`} className="hover:no-underline">
              {post.title}
            </Link>
          </h2>
          {showCategory && post.category && (
            <ul className="mt-2">
              {post.category.map((category) => (
                <li key={category}>
                  <CategoryLink category={category} />
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </>
  )
}

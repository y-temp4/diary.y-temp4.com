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
        <article className="mb-4" key={post.createdAt}>
          <h2 className="text-2xl font-bold">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </h2>
          <time className="text-sm text-gray-700 block mb-1">
            {post.createdAt}
          </time>
          {showCategory && post.category && (
            <ul>
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

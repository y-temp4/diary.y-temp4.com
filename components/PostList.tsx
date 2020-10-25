import Link from 'next/link'
import type { Post } from 'types'

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post) => (
        <article className="mb-4" key={post.createdAt}>
          <h2 className="text-xl font-bold">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </h2>
          <time className="text-sm text-gray-700 block">{post.createdAt}</time>
          {post.category && (
            <ul>
              {post.category.map((category) => (
                <li key={category}>
                  <Link href={`/categories/${category}`}>
                    <a className="no-underline border text-sm px-2 py-1 bg-gray-200 hover:bg-gray-400">
                      {category}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </>
  )
}

import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import * as path from 'path'
import Layout from 'components/Layout'
import { PostList } from 'components/PostList'
import {
  listContentFiles,
  readContentFile,
  readContentFiles,
} from 'lib/contentLoader'
import type { Post } from 'types'

export default function PostPage({
  post,
  relatedPosts,
}: {
  post: Post
  relatedPosts: Post[]
}) {
  return (
    <Layout
      title={post.title}
      pagePath={`/posts/${post.slug}`}
      description={post.description}
    >
      <h1 className="font-bold text-2xl">{post.title}</h1>
      <time className="text-sm text-gray-700 mb-1 block">{post.createdAt}</time>
      {post.category && (
        <ul className="mb-3">
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
      <article
        className="post-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {!!relatedPosts.length && (
        <>
          <h2 className="mt-8 mb-3 font-bold text-2xl border-l-4 pl-3 border-gray-600">
            Related posts
          </h2>
          <PostList posts={relatedPosts} showCategory={false} />
        </>
      )}
      <style jsx global>{`
        .post-body > p {
          margin-bottom: 1em;
        }
      `}</style>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await readContentFile(`${params?.slug}`)
  const postCategories = post.category || []
  const relatedPosts = (await readContentFiles()).filter((relatedPost) => {
    const hasCategory = (relatedPost.category || []).some((category) =>
      postCategories.includes(category)
    )
    const isSamePost = relatedPost.slug === params?.slug
    return hasCategory && !isSamePost
  })
  return {
    props: {
      post,
      relatedPosts,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listContentFiles().map((filename) => ({
    params: {
      slug: path.parse(filename).name,
    },
  }))
  return { paths, fallback: false }
}

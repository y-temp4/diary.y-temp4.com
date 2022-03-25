import { GetStaticProps, GetStaticPaths } from 'next'
import { useEffect, useState } from 'react'
import * as path from 'path'
import Layout from 'components/Layout'
import { CategoryLink } from 'components/CategoryLink'
import { PostList } from 'components/PostList'
import {
  listContentFiles,
  readContentFile,
  readContentFiles,
} from 'lib/contentLoader'
import type { Post } from 'types'

export default function PostPage({
  postData,
  relatedPosts,
}: {
  postData: Post
  relatedPosts: Post[]
}) {
  const [post, setPost] = useState(postData)
  useEffect(() => {
    setPost(postData)
  }, [postData])
  if (process.env.NODE_ENV === 'development') {
    useEffect(() => {
      const fn = async () => {
        const res = await fetch(`/api/posts/${post.slug}`).then((res) =>
          res.json()
        )
        setPost(res.postData)
      }
      fn()
    }, [post.slug])
  }
  return (
    <Layout
      title={post.title}
      pagePath={`/posts/${post.slug}`}
      description={post.description}
    >
      <h1 className="font-bold text-3xl">{post.title}</h1>
      <time className="text-gray-700 mb-1 block">{post.createdAt}</time>
      {post.category && (
        <ul className="mb-3">
          {post.category.map((category) => (
            <li key={category}>
              <CategoryLink category={category} />
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
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await readContentFile(`${params?.slug}`)
  const postCategories = postData.category || []
  const relatedPosts = (await readContentFiles()).filter((relatedPost) => {
    const hasCategory = (relatedPost.category || []).some((category) =>
      postCategories.includes(category)
    )
    const isSamePost = relatedPost.slug === params?.slug
    return hasCategory && !isSamePost
  })
  return {
    props: {
      postData,
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

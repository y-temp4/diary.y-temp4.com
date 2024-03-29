import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from 'components/Layout'
import { PostList } from 'components/PostList'
import { readContentFiles } from 'lib/contentLoader'
import { categories } from 'constants/categories'
import type { Post } from 'types'

export default function Category({ posts }: { posts: Post[] }) {
  const router = useRouter()
  const { category } = router.query
  return (
    <Layout pagePath={`/categories/${category}`}>
      <h2 className="text-xl mb-5">Category: {category}</h2>
      <PostList posts={posts} showCategory={false} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await readContentFiles()
  const categoryPosts = posts.filter((post) =>
    (post.category || []).includes(`${params?.category}`)
  )
  return {
    props: {
      posts: categoryPosts,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.map((category) => ({
    params: { category },
  }))
  return { paths, fallback: false }
}

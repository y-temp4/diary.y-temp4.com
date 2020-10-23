import fs from 'fs'
import Link from 'next/link'
import Layout from 'components/Layout'
import { readContentFiles } from 'lib/contentLoader'

const IndexPage = ({ posts }) => (
  <Layout>
    {posts.map((post) => (
      <div key={post.slug} className="post-teaser">
        <h2 className="text-xl font-bold">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>
        <time className="text-sm text-gray-700">{post.createdAt}</time>
        <ul>
          {post.category.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </div>
    ))}
  </Layout>
)

export default IndexPage

export async function getStaticProps() {
  const posts = await readContentFiles({ fs })
  return {
    props: {
      posts,
    },
  }
}

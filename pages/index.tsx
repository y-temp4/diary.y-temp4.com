import fs from 'fs'
import Layout from 'components/Layout'
import { PostList } from 'components/PostList'
import type { Post } from 'types'

import { readContentFiles } from 'lib/contentLoader'

const IndexPage = ({ posts }: { posts: Post[] }) => (
  <Layout>
    <PostList posts={posts} />
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

import fs from 'fs'
import Head from 'next/head'
import Layout from 'components/Layout'
import { PostList } from 'components/PostList'
import type { Post } from 'types'
import { generateRss } from 'lib/rss'
import { readContentFiles } from 'lib/contentLoader'
import { baseURL } from 'constants/domain'

const IndexPage = ({ posts }: { posts: Post[] }) => (
  <>
    <Head>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS feed for blog posts"
        href={`${baseURL}/rss.xml`}
      />
    </Head>
    <Layout>
      <PostList posts={posts} />
    </Layout>
  </>
)

export default IndexPage

export async function getStaticProps() {
  const posts = await readContentFiles({ fs })
  const rss = generateRss(posts)
  fs.writeFileSync('./public/rss.xml', rss)
  return {
    props: {
      posts,
    },
  }
}

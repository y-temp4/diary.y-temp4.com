import fs from 'fs'
import Link from 'next/link'
import Head from 'next/head'
import Layout from 'components/Layout'
import { PostList } from 'components/PostList'
import type { Post } from 'types'
import { generateRss } from 'lib/rss'
import { generateSitemap } from 'lib/sitemap'
import { readContentFiles } from 'lib/contentLoader'
import { baseURL } from 'constants/domain'
import { categories } from 'constants/categories'

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
    <footer className="max-w-screen-sm mx-auto mb-10 px-3 flex justify-between">
      <a href="http://y-temp4.com" target="_blank" className="block">
        About me
      </a>
      <Link href="/rss.xml">
        <a className="block">rss</a>
      </Link>
    </footer>
  </>
)

export default IndexPage

export async function getStaticProps() {
  const posts = await readContentFiles({ fs })
  const rss = generateRss(posts)
  const sitemap = generateSitemap(posts, categories)
  fs.writeFileSync('./public/rss.xml', rss)
  fs.writeFileSync('./public/sitemap.xml', sitemap)
  return {
    props: {
      posts,
    },
  }
}

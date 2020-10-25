import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import * as fs from 'fs'
import * as path from 'path'
import Layout from 'components/Layout'
import { listContentFiles, readContentFile } from 'lib/contentLoader'
import type { Post } from 'types'

export default function PostPage(params: Post & { content: string }) {
  return (
    <Layout title={params.title} pagePath={`posts/${params.slug}`}>
      <h1 className="font-bold text-2xl">{params.title}</h1>
      <time className="text-sm text-gray-700 mb-1 block">
        {params.createdAt}
      </time>
      {params.category && (
        <ul className="mb-3">
          {params.category.map((category) => (
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
        dangerouslySetInnerHTML={{ __html: params.content }}
      />
      <style jsx global>{`
        .post-body > p {
          margin-bottom: 1em;
        }
      `}</style>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  const content = await readContentFile({ fs, slug: params.slug })
  return {
    props: {
      ...content,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listContentFiles({ fs }).map((filename) => ({
    params: {
      slug: path.parse(filename).name,
    },
  }))
  return { paths, fallback: false }
}

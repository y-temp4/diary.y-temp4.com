import fs from 'fs'
import path from 'path'
import Layout from 'components/Layout'
import { listContentFiles, readContentFile } from 'lib/contentLoader'

export default function Post(params) {
  return (
    <Layout title={params.title}>
      <h1 className="font-bold text-2xl">{params.title}</h1>
      <time className="text-sm text-gray-700 mb-3 block">
        {params.createdAt}
      </time>
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

export async function getStaticProps({ params }) {
  const content = await readContentFile({ fs, slug: params.slug })
  return {
    props: {
      ...content,
    },
  }
}

export async function getStaticPaths() {
  const paths = listContentFiles({ fs }).map((filename) => ({
    params: {
      slug: path.parse(filename).name,
    },
  }))
  return { paths, fallback: false }
}

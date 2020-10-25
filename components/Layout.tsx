import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
  description?: string
  pagePath?: string
}

const Layout = ({
  children,
  title = `y-temp4's Diary`,
  description = `y-temp4's English Diary.`,
  pagePath = '',
}: Props) => {
  const baseURL = 'https://diary.y-temp4.com'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={`${baseURL}${pagePath}`} />
        <meta property="og:image" content={`${baseURL}/ogp.jpg`} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${baseURL}/ogp.jpg`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${baseURL}/ogp.jpg`} />
        <link rel="canonical" href={`${baseURL}${pagePath}`} />
      </Head>
      <header className="text-center mt-10 mb-12">
        <h1 className="font-bold text-2xl">
          <Link href="/">y-temp4's Diary</Link>
        </h1>
      </header>
      <main className="max-w-screen-sm mx-auto mb-10 px-3">{children}</main>
    </>
  )
}
export default Layout

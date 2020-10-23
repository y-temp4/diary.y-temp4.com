import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = `y-temp4's Diary` }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="text-center my-10">
      <h1 className="font-bold text-2xl">
        <Link href="/">y-temp4's Diary</Link>
      </h1>
    </header>
    <main className="max-w-screen-sm mx-auto mb-10 px-3">{children}</main>
  </>
)

export default Layout

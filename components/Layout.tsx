import Link from 'next/link'
import Head from 'next/head'
import { baseURL } from 'constants/domain'

type Props = {
  title?: string
  description?: string
  pagePath?: string
}

const Layout = ({
  children,
  title = '',
  description = `y-temp4's English Diary.`,
  pagePath = '',
}: React.PropsWithChildren<Props>) => {
  const siteName = `y-temp4's Diary`
  const ogpImagePath = '/ogp.jpg'
  return (
    <>
      <Head>
        <title>{title === '' ? siteName : `${title} | ${siteName}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={`${baseURL}${pagePath}`} />
        <meta property="og:image" content={`${baseURL}${ogpImagePath}`} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${baseURL}${ogpImagePath}`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${baseURL}${ogpImagePath}`} />
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

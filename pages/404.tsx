import Layout from 'components/Layout'
import Link from 'next/link'

export default function Custom404() {
  return (
    <Layout>
      <h1 className="text-center m-3 text-lg">404 - Page Not Found</h1>
      <Link href="/">
        <a className="text-center block">Move to Top</a>
      </Link>
    </Layout>
  )
}

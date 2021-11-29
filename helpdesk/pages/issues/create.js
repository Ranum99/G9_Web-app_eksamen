import Layout from '@/components/layout'
import SupportForm from '@/components/SupportForm'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ny henvendelse</title>
      </Head>
      <Layout>
        <SupportForm />
      </Layout>
    </>
  )
}

import Layout from '@/components/layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Head from 'next/head'

import SupportItem from '@/components/SupportItem'

export default function oneSupportElement() {
  const router = useRouter()
  const id = router.query.id

  const [supportElement, setSupportElement] = useState({})

  const getSuportElement = async () => {
    try {
      const response = await axios.get(`../api/issues/${id}`)

      setSupportElement(response?.data?.data)
    } catch (error) {
      // TODO: brukeren får opp en 404 - "Issue ikke funnet", eller bli sendt tilbake til der han kom fra
      console.log(error)
    }
  }

  const endItem = async (id) => {
    // TODO: fikse funksjonalitet backend
    try {
      const response = await axios.delete('../api/hello', {
        params: {
          id: id
        }
      })

      if (response.data.success) {
        // TODO: sette supportElement sin is_resolved = true
      } else {
        // TODO: brukeren får en feilmelding
      }
    } catch (error) {
      // TODO: brukeren får en feilmelding
      console.log(error)
    }

    //setIssues(newIssues);
    console.log(id)
  }

  useEffect(() => {
    // Bare for at den ikke skal hente dersom det ikke er en id
    if(id) {
      getSuportElement()
    } else {
      // TODO: brukeren får opp en 404 - "Issue ikke funnet", eller bli sendt tilbake til der han kom fra
    }
  }, [id])

  return (
    <>
      <Head>
        <title>{`${supportElement?.isResolved ? '(Løst)' : null} ${supportElement?.title}`}</title>
      </Head>
      <Layout>
        <p>{JSON.stringify(supportElement)}</p>
        <SupportItem item={supportElement} endItem={endItem} />
      </Layout>
    </>
  )
}

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

      if(response?.data?.success && response?.data?.data)
        setSupportElement(response?.data?.data)
      else
        console.log("meme"); 
        // TODO: brukeren får opp en 404 - "Issue ikke funnet", eller bli sendt tilbake til der han kom fra
    } catch (error) {
      // TODO: brukeren får opp en feilmelding
      console.log(error)
    }
  }

  const endItem = async (id) => {
    // TODO: fikse funksjonalitet backend
    try {
      const response = await axios.patch(`../api/issues/${id}`)

      if (response.data.success) {
        setSupportElement({...supportElement, isResolved: true})
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
        <title>{`${supportElement?.isResolved ? '(Løst)' : ''} ${supportElement?.title}`}</title>
      </Head>
      <Layout>
        <p>{JSON.stringify(supportElement)}</p>
        <SupportItem item={supportElement} endItem={endItem} getIssues={getSuportElement} />
      </Layout>
    </>
  )
}

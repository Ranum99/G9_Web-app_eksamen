import Layout from '@/components/layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ErrorPage from 'next/error'

import Head from 'next/head'

import SupportItem from '@/components/SupportItem'

export default function oneSupportElement() {
  const router = useRouter()
  const id = router.query.id

  const [supportElement, setSupportElement] = useState({})
  const [error, setError] = useState(false)

  const getSuportElement = async () => {
    try {
      const response = await axios.get(`../api/issues/${id}`)

      if(response?.data?.success && response?.data?.data)
        setSupportElement(response?.data?.data)
      else
        setError(true)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  const endItem = async (id) => {
    try {
      const response = await axios.patch(`../api/issues/${id}`)

      if (response.data.success) {
        setSupportElement({...supportElement, isResolved: true})
      } else {
        alert(response.data.error)
      }
    } catch (error) {
      alert(error)
      console.log(error)
    }

    //setIssues(newIssues);
    console.log(id)
  }

  useEffect(() => {
    // Bare for at den ikke skal hente dersom det ikke er en id
    if(id) {
      getSuportElement()
    }
  }, [id])

  if(error) {
    return <ErrorPage statusCode="404" />
  }

  return (
    <>
      <Head>
        <title>{`${supportElement?.isResolved ? '(Løst)' : ''} ${supportElement?.title}`}</title>
      </Head>
      <Layout>
        <SupportItem item={supportElement} endItem={endItem} getIssues={getSuportElement} />
      </Layout>
    </>
  )
}

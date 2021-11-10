import Layout from '@/components/layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import SupportItem from '@/components/SupportItem'

export default function oneSupportElement() {
  const router = useRouter()
  const id = router.query.id

  const [supportElement, setSupportElement] = useState({})

  const getSuportElement = async () => {
    try {
      const response = await axios.get(`../api/issues/${id}`)

      const data = response

      setSupportElement(data?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const endItem = async (id) => {
    try {
      const response = await axios.delete('../api/hello', {
        params: {
          id: id
        }
      })

      if (response.data.success) {
        //setIssues(response.data.issues)
      }
    } catch (error) {
      console.log(error)
    }

    //setIssues(newIssues);
    console.log(id)
  }

  useEffect(() => {
    if(id)
      getSuportElement()
  }, [id])

  return (
    <Layout>
      <p>{JSON.stringify(supportElement)}</p>
      <SupportItem item={supportElement} endItem={endItem} />
    </Layout>
  )
}

import Layout from '@/components/layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import SupportItem from '@/components/SupportItem'

export default function oneSupportElement() {
  const router = useRouter()
  const id = router.query.id

  const [supportElement, setSupportElement] = useState({
    id: id,
    title: 'Test',
    creator: 'Aleksander Ranum',
    description: 'Dette er bare en test',
    department: 'Salg',
    severity: 'high',
    isResolved: false,
    createdAt: new Date(2021, 11, 22).toLocaleDateString(),
  })

  const getSuportElement = async () => {
    try {
      const response = await axios.get('../api/hello', {
        params: {
          id: id,
        },
      })

      const data = response?.data

      //setSupportElement(data)
      setSupportElement({...supportElement, id: id})
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
  }

  useEffect(() => {
    getSuportElement()
  }, [id])

  return (
    <Layout>
      <p>{JSON.stringify(supportElement)}</p>
      <SupportItem item={supportElement} endItem={endItem} />
    </Layout>
  )
}

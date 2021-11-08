import Layout from '@/components/layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import SupportItem from '@/components/SupportItem'

export default function oneSupportElement() {
  const router = useRouter()
  const { id } = router.query

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
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSuportElement()
  }, [])

  return (
    <Layout>
      <p>{id}</p>
      <SupportItem item={supportElement} />
    </Layout>
  )
}

import Layout from '@/components/layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function oneSupportElement() {
  const router = useRouter()
  const { id } = router.query

  const [supportElement, setSupportElement] = useState({
    id: null,
    title: null,
    creator: null,
    description: null,
    department: null,
    severity: null,
    isResolved: null,
    createdAt: null,
  })

  const getSuuportElement = async () => {
    try {
      const response = await axios.get('../api/hello')
      console.log(response.data)

      const data = response?.data

      setSupportElement(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSuuportElement()
  }, [])

  return <Layout>{id}</Layout>
}

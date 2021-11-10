import SupportList from '@/components/SupportList'
import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [importance, setImportance] = useState('')
  const [department, setDepartment] = useState('')

  const [issues, setIssues] = useState([])
  const [showingIssues, setShowingIssues] = useState()

  useEffect(() => {
    let newIssues
    if (importance && department) {
      newIssues = issues?.filter(
        (issue) =>
          issue.severity === importance && issue.department === department
      )
    } else if (importance) {
      newIssues = issues?.filter((issue) => issue.severity === importance)
    } else if (department) {
      newIssues = issues?.filter((issue) => issue.department === department)
    } else {
      newIssues = issues
    }

    setShowingIssues(newIssues)
  }, [importance, department, issues])


  const getIssues = async () => {
    try {
      const response = await axios.get('../api/issues');

      console.log(response.data.data);

      setIssues(response.data.data)
    } catch(error) {
      console.log("OPSI WOPSI");
    }
  }

  useEffect(() => {
    getIssues()
  }, [])

  const endItem = async (id) => {
    try {
      const response = await axios.put('../api/hello', {
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

  const handleImportance = (evt) => {
    setImportance(evt.currentTarget.value)
  }
  const handleDepartment = (evt) => {
    setDepartment(evt.currentTarget.value)
  }

  return (
    <Layout>
      <SupportList
        handleImportance={handleImportance}
        handleDepartment={handleDepartment}
        issues={showingIssues}
        endItem={endItem}
      />
    </Layout>
  )
}

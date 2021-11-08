import SupportList from '@/components/SupportList'
import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [importance, setImportance] = useState('')
  const [department, setDepartment] = useState('')

  const [issues, setIssues] = useState([
    {
      id: 1,
      title: 'Title one',
      creator: 'Marius Wallin',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
      department: 'salg',
      severity: 'low',
      isResolved: false,
      createdAt: new Date(2021, 11, 22).toLocaleDateString(),
    },
    {
      id: 2,
      title: 'Title two',
      creator: 'Simen Simensen',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
      department: 'it',
      severity: 'medium',
      isResolved: false,
      createdAt: new Date(2021, 11, 6).toLocaleDateString(),
    },
    {
      id: 3,
      title: 'Title three',
      creator: 'Trude Trudesen',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
      department: 'design',
      severity: 'high',
      isResolved: false,
      createdAt: new Date(2021, 10, 12).toLocaleDateString(),
    },
  ])
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

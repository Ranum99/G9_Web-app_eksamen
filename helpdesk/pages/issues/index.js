import SupportList from '@/components/SupportList'
import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [filter, setFilter] = useState({
    importance: '',
    department: '',
  })

  const [loading, setLoading] = useState(true)
  const [issues, setIssues] = useState([])
  const [showingIssues, setShowingIssues] = useState()

  useEffect(() => {
    // TODO: føler at denne kan bli gjort på en mye bedre måte

    let newIssues = issues
    if (filter.importance && filter.department) {
      newIssues = issues?.filter(
        (issue) =>
          issue.severity === parseInt(filter.importance) &&
          issue.department.id === filter.department
      )
    } else if (filter.importance) {
      newIssues = issues?.filter(
        (issue) => issue.severity === parseInt(filter.importance)
      )
    } else if (filter.department) {
      newIssues = issues?.filter(
        (issue) => issue.department.id === filter.department
      )
    }

    setShowingIssues(newIssues)
    //console.log(newIssues)
  }, [filter, issues])

  const getIssues = async () => {
    try {
      const response = await axios.get('../api/issues')

      console.log(response.data.data);

      //console.log(response.data.data);
      if (response.data.success) {
        setIssues(response.data.data)
      } else {
        //TODO: brukeren får en feilmelding
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getIssues()
    setLoading(false)
  }, [])

  const endItem = async (id) => {
    // TODO: denne finnes også i [id].js, kan kanskje sette den et sted hvor samme funksjon kan brukes
    try {
      const response = await axios.patch(`../api/issues/${id}`)

      if (response.data.success) {
        const issueIndex = issues.findIndex((issue) => issue.id === id)
        let newIssues = issues
        newIssues[issueIndex] = { ...newIssues[issueIndex], isResolved: true }

        setIssues(newIssues)
        getIssues()
      } else {
        // TODO: brukerne får en feilmelding
        alert(response.data.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setFilter((state) => ({ ...state, [name]: value }))

  return (
    <Layout>
      {loading ? (
        <p>loading</p>
      ) : (
        <SupportList
          handleInputOnChange={handleInputOnChange}
          issues={showingIssues}
          endItem={endItem}
          getIssues={getIssues}
        />
      )}
    </Layout>
  )
}

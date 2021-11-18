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
    
    if (filter.importance && filter.department) { // Henter ut alle issues hvor viktigheten OG avdelingen er lik filterene
      newIssues = issues?.filter(
        (issue) =>
          issue.severity === parseInt(filter.importance) &&
          issue.department.id === filter.department
      )
    } else if (filter.importance) { // Henter ut alle issues hvor viktigheten er lik filterene
      newIssues = issues?.filter(
        (issue) => issue.severity === parseInt(filter.importance)
      )
    } else if (filter.department) { // Henter ut alle issues hvor viktigheten er lik filterene
      newIssues = issues?.filter(
        (issue) => issue.department.id === filter.department
      )
    }

    // Setter issuene som skal vises i array
    setShowingIssues(newIssues)
  }, [filter, issues]) // Vil oppdateres dersom en av filterene endres

  const getIssues = async () => {
    try {
      // Sender en get request til API
      const response = await axios.get('../api/issues')

      if (response.data.success) {
        setIssues(response.data.data)
      } else {
        alert(response.data.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // Når brukeren kommer inn på siden vil den prøve å hente alle issues. 
    // Dersom det tar litt tid vil det stå "Loading" til issuene er hentet 
    getIssues()
    setLoading(false)
  }, [])

  const endItem = async (id) => {
    // TODO: denne finnes også i [id].js, kan kanskje sette den et sted hvor samme funksjon kan brukes
    try {
      // Sender en patch (UPDATE) request til API
      const response = await axios.patch(`../api/issues/${id}`)

      if (response.data.success) {
        getIssues()
      } else {
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

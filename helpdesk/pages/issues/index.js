import SupportList from '@/components/SupportList'
import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [importance, setImportance] = useState(null)
  const [department, setDepartment] = useState(null)

  const [issues, setIssues] = useState([])
  const [showingIssues, setShowingIssues] = useState()

  useEffect(() => {
    // TODO: føler at denne kan bli gjort på en mye bedre måte

    let newIssues
    if (importance && department) {
      newIssues = issues?.filter(
        (issue) =>
          issue.severity === parseInt(importance) && issue.department.id === department
      )
    } else if (importance) {
      newIssues = issues?.filter((issue) => issue.severity === parseInt(importance) )
    } else if (department) {
      newIssues = issues?.filter((issue) => issue.department.id === department)
    } else {
      newIssues = issues
    }

    setShowingIssues(newIssues)
  }, [importance, department, issues])


  const getIssues = async () => {
    try {
      const response = await axios.get('../api/issues');

      //console.log(response.data.data);
      if(response.data.success) {
        setIssues(response.data.data)
      } else {
        //TODO: brukeren får en feilmelding
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getIssues()
  }, [])

  const endItem = async (id) => {
    // TODO: denne finnes også i [id].js, kan kanskje sette den et sted hvor samme funksjon kan brukes 
    try {
      const response = await axios.put('../api/hello', {
        params: {
          id: id
        }
      })

      if (response.data.success) {
        //setIssues(response.data.issues)
      } else {
        // TODO: brukerne får en feilmelding
      }
    } catch (error) {
      console.log(error)
    }

    //setIssues(newIssues);
    console.log(id)
  }

  const handleInputOnChange = ({ currentTarget: { name, value } }) => {
    // TODO: denne kan kanskje gjøres om til et objekt istedenfor, og bruke samme funksjonalitet som i SupportForm.js (i components)
    switch (name.toLowerCase()) {
      case 'importance': 
        setImportance(value)
        break
      case 'department':
        setDepartment(value)
        break
      default:
        break
    }
  }

  return (
    <Layout>
      <SupportList
        handleInputOnChange={handleInputOnChange}
        issues={showingIssues}
        endItem={endItem}
      />
    </Layout>
  )
}

import CalendarCard from '@/components/CalendarCard'
import CalendarList from '@/components/CalendarList'
import { userInfo } from '@/lib/utils/user'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [admin, setAdmin] = useState(false)

  const load = async () => {
    const response = await userInfo()

    setAdmin(response.admin)
  }

  useEffect(() => {
    load()
  })

  return (
    <div>
      <h1>Julekalender eksamen 2021</h1>
      {admin && (
        <Link href="/dashboard">
          <a>Gå til admin siden </a>
        </Link>
      )}
      <CalendarList />
    </div>
  )
}

import Slot from '@/components/Slot'
import SlotList from '@/components/SlotList'
import { userInfo } from '@/lib/utils/user'
import { useEffect, useState } from 'react'

const admin = () => {
  const [admin, setAdmin] = useState(false)
  const [calendar, setCalendar] = useState({
    id: 0,
    name: 'Ikke lasta fra DB',
    createdAt: '2021-11-03T10:29:30.837Z',
    slot: [],
  })

  const loadCalendar = async () => {
    const response = await fetch('api/calenders?name=Julekalender')

    const data = await response.json()

    data.success
      ? setCalendar(data.data)
      : console.log('Feil ved inllasting av data fra DB')
  }

  const loadUser = async () => {
    const response = await userInfo()
    setAdmin(response.admin)
  }

  const load = () => {
    loadUser()
    loadCalendar()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      <h1>Admin</h1>
      {admin ? (
        <SlotList slots={calendar.slot} />
      ) : (
        <p>Du har ikke tilgang til å se innholdet</p>
      )}
    </>
  )
}

export default admin

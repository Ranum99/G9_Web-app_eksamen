import Slot from '@/components/Slot'
import SlotList from '@/components/SlotList'
import { useEffect, useState } from 'react'

const admin = () => {
  const [calendar, setCalendar] = useState({
    id: 0,
    name: 'Ikke lasta fra DB',
    createdAt: '2021-11-03T10:29:30.837Z',
    slot: [],
  })

  const load = async () => {
    const response = await fetch('api/calenders?name=Julekalender')

    const data = await response.json()

    // TODO: Endre til
    data.success
      ? setCalendar(data.data)
      : console.log('Feil ved inllasting av data fra DB')
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      <h1>Admin</h1>
      <SlotList slots={calendar.slot} />
    </>
  )
}

export default admin

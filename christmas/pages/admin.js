import Slot from '@/components/Slot'
import SlotList from '@/components/SlotList'
import { useEffect, useState } from 'react'

const data = [
  {
    id: 0,
    name: 'Julekalender',
    createdAt: Date.now(),
    // Lukene i en kalender
    slot: [
      {
        id: 25986,
        slug: 'abcd1234',
        order: 1,
        createdAt: new Date(),
        openAt: new Date(),
      },
      {
        id: 23845,
        slug: 'dust3245',
        order: 2,
        createdAt: new Date(),
        openAt: new Date(),
      },
    ],
  },
]

const julekalender = data[0]

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

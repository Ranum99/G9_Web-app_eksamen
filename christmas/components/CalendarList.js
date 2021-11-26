/* eslint-disable-line */

import { userInfo } from '@/lib/utils/user'
import { useEffect, useState } from 'react'
import CalendarCard from './CalendarCard'

const CalendarList = () => {
  const [user, setUser] = useState(null)
  const [slots, setSlots] = useState([
    {
      id: -1,
      slug: 'hardkoda data',
      order: "Noe gikk feil :/",
      createdAt: '2022-11-03T10:29:30.834Z',
      openAt: '2022-11-04T11:00:00.000Z',
    },
  ])

  const loadSlots = async () => {
    const response = await fetch('api/slots?calenderId=4', { method: 'GET' })

    const data = await response.json()

    // TODO: Noe som er feil her, skulle vært data.data bare ?
    setSlots(data.data.data)
  }

  const load = async () => {
    const response = await userInfo()

    console.log(response)

    if (response?.user){
      loadSlots()
    } else {
      console.log("Du er ikke logget inn")
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <main>
      {slots.map((card) => (
        <CalendarCard
          key={card.order}
          number={card.order}
          type={card.type}
          code={card.code}
          openAt={card.openAt}
        />
      ))}
    </main>
  )
}

export default CalendarList

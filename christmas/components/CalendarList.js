/* eslint-disable-line */

import { useEffect, useState } from 'react'
import CalendarCard from './CalendarCard'

const CalendarList = () => {
  const [slots, setSlots] = useState([
    {
      id: -1,
      slug: 'hardkoda data',
      order: -1,
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

  useEffect(() => {
    loadSlots()
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

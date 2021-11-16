/* eslint-disable-line */

import { useEffect, useState } from 'react'
import CalendarCard from './CalendarCard'
/*
const cards = [
  {
    number: 1,
    code: 'luke0001',
  },
  {
    number: 2,
    code: 'test1234',
  },
  {
    number: 3,
    code: 'heii4444',
    type: 'active',
  },
  {
    number: 4,
    code: 'dust4321',
    type: 'notAvalibalie',
  },
  {
    number: 5,
    code: 'hade6666',
    type: 'notAvalibalie',
  },
]
*/

const CalendarList = () => {
  const [slots, setSlots] = useState(['test', 'hei'])

  const loadSlots = async () => {
    const response = await fetch('api/slots?calenderId=4', { method: 'GET' })

    const data = await response.json()
    setSlots(data.data)
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

/* eslint-disable-line */

import CalendarCard from './CalendarCard'

const cards = [
  {
    number: 0,
    code: 'luke0001',
  },
  {
    number: 1,
    code: 'test1234',
  },
  {
    number: 2,
    code: 'heii4444',
    type: 'active',
  },
  {
    number: 3,
    code: 'dust4321',
    type: 'notAvalibalie',
  },
  {
    number: 4,
    code: 'hade6666',
    type: 'notAvalibalie',
  },
]

const CalendarList = () => {
  return (
    <main>
      {cards.map((card) => (
        <CalendarCard
          key={card.number}
          number={card.number}
          type={card.type}
          code={card.code}
        />
      ))}
    </main>
  )
}

export default CalendarList

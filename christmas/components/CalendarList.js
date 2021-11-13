/* eslint-disable-line */

import CalendarCard from './CalendarCard'

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

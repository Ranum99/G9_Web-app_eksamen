import { createElement, useState } from 'react'
import SlotUsers from './SlotUsers'

// TODO: Hente denna lista fra DB
const users = [
  {
    id: 0,
    coupon: 'ab12cd34',
    created_at: new Date(),
    username: 'Dust',
  },
  {
    id: 1,
    coupon: 'qwer1234',
    created_at: new Date(2021, 11, 10),
    username: 'glømte navn',
  },
  {
    id: 2,
    coupon: 'øæåå0000',
    created_at: new Date(2021, 12, 12),
    username: 'funka ikke lenge',
  },
  {
    id: 3,
    coupon: 'dust6969',
    created_at: new Date(2021, 11, 5),
    username: '-.-',
  },
]

const Slot = ({ slot }) => {
  const [max, setMax] = useState(3)
  /*
  console.log('SLOT')
  console.log(slot)
*/
  return (
    <article className="slot">
      <h2 className="underline slotItem">Luke {slot.order}</h2>
      <p className="slotItem">
        Tilgjengelig fra: {slot.openAt.getDate()}.{slot.openAt.getMonth() + 1}.
        {slot.openAt.getFullYear()}
      </p>
      <div className="slotItem">
        <p className="underline"> Se alle deltakere ({users.length})</p>
        <p className="underline">Trekk superbonus</p>
      </div>
      <SlotUsers max={max} users={users} />
    </article>
  )
}

export default Slot

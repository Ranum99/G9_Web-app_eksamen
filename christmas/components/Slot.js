import { createElement, useEffect, useState } from 'react'
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
  const [userSlots, setUserSlots] = useState([])

  const loadUserSlots = async () => {
    const response = await fetch('api/admin/userSlots?id=' + slot.id)

    const data = await response.json()

    if (!data.success) {
      console.log('Feilet med ID ' + slot)
    }

    setUserSlots(data.data)
  }

  const load = async () => {
    loadUserSlots()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <article className="slot">
      <h2 className="underline slotItem">Luke {slot.order}</h2>
      <p className="slotItem"></p>
      <div className="slotItem">
        <p className="underline"> Se alle deltakere ({userSlots.length})</p>
        <p className="underline">Trekk superbonus</p>
      </div>
      {userSlots.length == 0 ? (
        <p>Ingen har deltatt på denne luken enda :/</p>
      ) : (
        <SlotUsers max={max} users={userSlots} />
      )}
    </article>
  )
}

export default Slot

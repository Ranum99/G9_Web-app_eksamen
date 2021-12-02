import { displayDate } from '@/lib/utils/displayDate'
import { createElement, useEffect, useState } from 'react'
import SlotUsers from './SlotUsers'

const Slot = ({ slot, displayWinner }) => {
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

  const drawSuperBonus = () => {
    if (userSlots.length == 0) {
      alert('Ingen har deltatt på denna luka ennå')
      return
    }

    const winnerIndex = Math.floor(Math.random() * userSlots.length)
    const winner = userSlots[winnerIndex]

    displayWinner(winner)
  }

  return (
    <article className="slot">
      <h2 className="underline slotItem">Luke {slot.order}</h2>
      <p className="slotItem">
        Tilgjengelig fra: {displayDate(new Date(slot.openAt))}
      </p>
      <div className="slotItem">
        <button
          className="underline adminUserSlot"
          onClick={() => setMax(userSlots.length)}
        >
          Se alle deltakere ({userSlots.length})
        </button>
        <button className="underline adminUserSlot" onClick={drawSuperBonus}>
          Trekk superbonus
        </button>
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

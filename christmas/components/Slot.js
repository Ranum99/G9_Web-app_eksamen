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

  const getDate = () => {
    const date = new Date(slot.openAt)

    const temp = `${date.getDate()}.${date.getMonth() + 1}.${date
      .getFullYear()
      .toString()
      .substr(2, 2)}`

    return temp
  }

  return (
    <article className="slot">
      <h2 className="underline slotItem">Luke {slot.order}</h2>
      <p className="slotItem">Tilgjengelig fra: {getDate()}</p>
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

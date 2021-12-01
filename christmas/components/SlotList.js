import { useState } from 'react'
import Modal from './Modal'
import Slot from './Slot'

const SlotList = ({ slots }) => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState()

  const displayWinner = (winner) => {
    setUser(winner)
    console.log(user)
    setShow(!show)
  }

  // Når lasting av data fra DB feiler
  if (slots == undefined || slots == null) {
    return 'Beklager, noe har gått feil'
  } else {
    return (
      <>
        {slots.map((slot) => (
          <Slot key={slot.id} slot={slot} displayWinner={displayWinner} />
        ))}
        {show && <Modal setShow={setShow} user={user} />}
      </>
    )
  }
}

export default SlotList

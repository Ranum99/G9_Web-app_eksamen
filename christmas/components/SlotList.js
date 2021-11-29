import Slot from './Slot'

const SlotList = ({ slots }) => {
  // Når lasting av data fra DB feiler
  if (slots == undefined || slots == null) {
    return 'Beklager, noe har gått feil'
  } else {
    return slots.map((slot) => <Slot key={slot.id} slot={slot} />)
  }
}

export default SlotList

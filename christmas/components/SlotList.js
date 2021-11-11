import Slot from './Slot'

const SlotList = ({ slots }) => {
  return slots.map((slot) => <Slot key={slot.id} slot={slot} />)
}

export default SlotList

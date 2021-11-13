import Slot from '@/components/Slot'
import SlotList from '@/components/SlotList'

console.log('Oppdaterer\n\n\n')

const data = [
  {
    id: 0,
    name: 'Julekalender',
    createdAt: Date.now(),
    // Lukene i en kalender
    slot: [
      {
        id: 25986,
        slug: 'abcd1234',
        order: 1,
        createdAt: new Date(),
        openAt: new Date(),
      },
      {
        id: 23845,
        slug: 'dust3245',
        order: 2,
        createdAt: new Date(),
        openAt: new Date(),
      },
    ],
  },
]

const julekalender = data[0]

console.log(julekalender)

const admin = () => {
  return (
    <>
      <h1>Admin</h1>
      <SlotList slots={julekalender.slot} />
    </>
  )
}

export default admin

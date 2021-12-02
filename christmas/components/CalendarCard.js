import { userInfo } from '@/lib/utils/user'
import { useEffect, useState } from 'react'

const CalendarCard = ({ number, openAt, id }) => {
  const [coupon, setCoupon] = useState('')
  const [type, setType] = useState()

  const today = new Date()
  // Setter klokkeslett til 0, skal bare sammenligne dato
  today.setHours(0, 0, 0, 0)
  const slotDay = new Date(openAt)
  // Samme som over, skal bare sammenligne dato
  slotDay.setHours(0, 0, 0, 0)

  const getCoupon = async () => {
    if (type == 'notAvalibalie') {
      alert('Luken er ikke åpen enda')
      return
    }

    const user = await userInfo()

    const response = await fetch(
      '/api/userSlot?slotId=' + id + '&userId=' + user.user.id
    )
    const data = await response.json()
    setType('opened')
    setCoupon(data.data.coupon)
  }

  useEffect(() => {
    if (today < slotDay) {
      setType('notAvalibalie')
    }
  }, [])

  return (
    <article className=".center" className={type} onClick={() => getCoupon()}>
      <h2>{number}</h2>
      {type == 'notAvalibalie' &&
        'Åpner om ' + (slotDay - today) / 1000 / 60 / 60 / 24 + ' dager'}
      {coupon}
    </article>
  )
}

export default CalendarCard

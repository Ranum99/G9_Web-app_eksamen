import { userInfo } from '@/lib/utils/user'
import { useState } from 'react'

const CalendarCard = ({ number, openAt, id }) => {
  const [coupon, setCoupon] = useState('')
  let type = ''

  const today = new Date()
  // Setter klokkeslett til 0, skal bare sammenligne dato
  today.setHours(0, 0, 0, 0)
  const slotDay = new Date(openAt)
  // Samme som over, skal bare sammenligne dato
  slotDay.setHours(0, 0, 0, 0)

  const getCoupon = async () => {
    const user = await userInfo()

    const response = await fetch(
      '/api/userSlot?slotId=' + id + '&userId=' + user.user.id
    )
    const data = await response.json()

    setCoupon(data.data.coupon)
  }

  if (today.getTime() === slotDay.getTime()) {
    type = 'active'
    getCoupon()
  } else if (today < slotDay) {
    type = 'notAvalibalie'
  } else {
    type = ''
  }
  return (
    <article className=".center" className={type}>
      <h2>{number}</h2>
      {type == 'notAvalibalie' &&
        'Åpner om ' + (slotDay - today) / 1000 / 60 / 60 / 24 + ' dager'}
      {type == 'active' && coupon}
    </article>
  )
}

export default CalendarCard

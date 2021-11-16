const CalendarCard = ({ number, code, openAt }) => {
  let type = ''

  const today = new Date()
  // Setter klokkeslett til 0, skal bare sammenligne dato
  today.setHours(0, 0, 0, 0)
  const slotDay = new Date(openAt)
  // Samme som over, skal bare sammenligne dato
  slotDay.setHours(0, 0, 0, 0)

  const getCoupon = () => {
    // TODO: Hente/generere coupon fra DB
    return '1234abcd'
  }

  if (today.getTime() === slotDay.getTime()) {
    type = 'active'
    console.log('aktiv')
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
      {type == 'active' && getCoupon()}
    </article>
  )
}

export default CalendarCard

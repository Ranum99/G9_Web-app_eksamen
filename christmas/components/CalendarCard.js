const CalendarCard = ({ number, code, openAt }) => {
  let type = ''

  const today = new Date()
  // Setter klokkeslett til 0, skal bare sammenligne dato
  today.setHours(0, 0, 0, 0)

  const slotDay = new Date(openAt)
  // Samme som over, skal bare sammenligne dato
  slotDay.setHours(0, 0, 0, 0)

  console.log('\n\n\n')
  console.log(slotDay)
  console.log(today)
  console.log(today)

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
      {openAt}
    </article>
  )
}

export default CalendarCard

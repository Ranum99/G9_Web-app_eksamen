const CalendarCard = ({ number, type, code }) => {
  return (
    <article className=".center" className={type}>
      {type == 'active' ? code : number}
    </article>
  )
}

export default CalendarCard

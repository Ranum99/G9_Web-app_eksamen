/* eslint-disable no-ternary */
const SupportItem = ({ item, endItem }) => {
  const severityHigh = item?.severity === 'high' ? 'Høy' : null
  const severityMedium = item?.severity === 'medium' ? 'Medium' : null
  const severityLow = item?.severity === 'low' ? 'Lav' : null

  const handleEndButton = () => {
    endItem(item.id)
  }

  return (
    <li className="issue">
      <div className="meta">
        <span>{item?.department}</span>
        <span>{severityHigh ?? severityMedium ?? severityLow}</span>
      </div>
      <h3>
        {item?.title} {item?.isResolved ? '(løst)' : null}
      </h3>
      <p>{item?.description}</p>
      <span>{item?.creator}</span>
      <footer>
        <span>{item?.createdAt}</span>
        <div className="issue_actions">
          <button type="button">Se kommentarer (2)</button>
          <button type="button">Legg til kommentar</button>
          <button type="button" onClick={handleEndButton}>
            Avslutt
          </button>
        </div>
      </footer>
    </li>
  )
}

export default SupportItem

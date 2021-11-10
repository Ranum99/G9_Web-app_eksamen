import { useState } from "react"
import SupportItemComment from "./SupportItemComment"
import SupportItemMakeComment from "./SupportItemMakeComment"

/* eslint-disable no-ternary */
const SupportItem = ({ item, endItem }) => {
  const severityHigh = item?.severity === 3 ? 'Høy' : null
  const severityMedium = item?.severity === 2 ? 'Medium' : null
  const severityLow = item?.severity === 1 ? 'Lav' : null

  const [showComments, setShowComment] = useState(false)
  const [showAddComment, setShowAddComment] = useState(false)

  const handleEndButton = (evt) => {
    endItem(item.id)
  }

  const addComment = (evt) =>  {
    setShowAddComment(!showAddComment)
    console.log("BIP BOOP COMMENTS IN MAKING");
    console.log(item);
  }

  const seeComments = (evt) => {
    setShowComment(!showComments)
    item?.comments?.map(comment => {
      console.log(comment);
    })
  }

  return (
    <>
      <li className="issue">
        <div className="meta">
          <span>{item?.department?.name}</span>
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
            <button type="button" onClick={seeComments}>Se kommentarer ({item?.comments?.length ?? 0})</button>
            <button type="button" onClick={addComment}>Legg til kommentar</button>
            <button type="button" onClick={handleEndButton}>
              Avslutt
            </button>
          </div>
        </footer>
      </li>

      {showAddComment &&
        <SupportItemMakeComment />
      }

      {showComments && item?.comments?.map((comment, index)=> 
        <SupportItemComment key={comment.id} comment={comment} index={index} />
      )}
    </>
  )
}

export default SupportItem

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SupportItemComment from './SupportItemComment'
import SupportItemMakeComment from './SupportItemMakeComment'

/* eslint-disable no-ternary */
const SupportItem = ({ item, endItem, getIssues }) => {
  const severityHigh =
    item?.severity === 3 ? (
      <span className="severity" style={{ color: 'Red' }}>
        Høy ⬤
      </span>
    ) : null
  const severityMedium =
    item?.severity === 2 ? (
      <span className="severity" style={{ color: 'Blue' }}>
        Medium ⬤
      </span>
    ) : null
  const severityLow =
    item?.severity === 1 ? (
      <span className="severity" style={{ color: 'Grey' }}>
        Lav ⬤
      </span>
    ) : null

  // Henter datoen issuen ble laget, og henter deretter ut dag (dd), måned (mm) og år (__åå)
  const date = new Date(item?.created_at)
  const date_format =
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month_format = date.getMonth() + 1
  const year_format = date.getFullYear().toString().substring(2, 4)

  const [showComments, setShowComment] = useState(false)
  const [showAddComment, setShowAddComment] = useState(false)

  const handleEndButton = (evt) => {
    endItem(item.id)
  }

  const addComment = (evt) => {
    setShowAddComment(!showAddComment)
  }

  const seeComments = (evt) => {
    // Dersom det ikke finnes noen kommentarer vil brukeren få en popup
    if (item.comments.length > 0) setShowComment(!showComments)
    else alert('Finnes ingen kommentarer på denne hendelsen')
  }

  return (
    <>
      <li className="issue commonIssueComments">
        <div className="meta">
          <span>{item?.department?.name}</span>
          <span>{severityHigh ?? severityMedium ?? severityLow}</span>
        </div>
        <Link href={`/issues/${item.id}`} passHref>
          <div>
            <h3>
              {item?.title} {item?.isResolved ? '(løst)' : null}
            </h3>
            <p>{item?.description}</p>
            <span>{item?.creator}</span>
          </div>
        </Link>
        <footer>
          <span>{`${date_format}.${month_format}.${year_format}`}</span>
          <div className="issue_actions">
            <button
              type="button"
              onClick={seeComments}
              className={showComments ? 'active' : ''}
            >
              {item?.comments?.length === 0
                ? 'Ingen kommentarer'
                : `Se kommentarer (${item?.comments?.length ?? 0})`}
            </button>
            <button
              type="button"
              onClick={addComment}
              className={showAddComment ? 'active' : ''}
            >
              Legg til kommentar
            </button>
            {!item.isResolved && (
              <button type="button" onClick={handleEndButton}>
                Avslutt
              </button>
            )}
          </div>
        </footer>
      </li>

      {showAddComment && (
        <SupportItemMakeComment item={item} getIssues={getIssues} />
      )}

      {showComments &&
        item?.comments?.map((comment, index) => (
          <SupportItemComment
            key={comment.id}
            comment={comment}
            index={index}
          />
        ))}
    </>
  )
}

export default SupportItem

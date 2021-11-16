import axios from 'axios'
import { useState } from 'react'
import { validate } from '@/lib/validation'

const SupportItemMakeComment = ({ item, getIssues }) => {
  const [comment, setComment] = useState('')

  const handleChange = (evt) => {
    setComment(evt.currentTarget.value)
  }

  const addComment = async () => {
    const commentCheck = validate.descriptionAndComment(comment);
    console.log(commentCheck.error);

    if(commentCheck.success) {
      try {
        const response = await axios.post(`../api/comments/${item.id}`, {
          comment: comment,
        })
  
        console.log(response)
  
        if (response.data.success) {
          getIssues();
          setComment('')
        } else {
          // TODO: brukeren får en feilmelding
        }
      } catch (error) {
        console.log(error)
        // TODO: brukeren får en feilmelding
      }
    } else {
      alert(commentCheck.error)
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    addComment()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Legg til kommentar
        <input
          onChange={handleChange}
          name="comment"
          type="text"
          value={comment}
        />
        <button type="submit">Send</button>
      </label>
    </form>
  )
}

export default SupportItemMakeComment

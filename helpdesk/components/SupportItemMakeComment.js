import axios from 'axios'
import { useState } from 'react'
import { validate } from '@/lib/validation'

const SupportItemMakeComment = ({ item, getIssues }) => {
  const [comment, setComment] = useState('')

  const handleChange = (evt) => {
    setComment(evt.currentTarget.value)
  }

  const addComment = async () => {
    // Sjekker input
    const commentCheck = validate.descriptionAndComment(comment, 'omment');

    if(commentCheck.success) {
      try { 
        // Sender en post request til API
        const response = await axios.post(`../api/comments/${item.id}`, {
          comment: comment,
        })
  
        if (response.data.success) {
          // Henter issuene på nytt, som vil oppdatere kommentarene med den man la til (og evt andre har lagt til)
          getIssues();
          setComment('')
        } else {
          alert(response.data.error)
        }
      } catch (error) {
        console.log(error)
        alert(error)
      }
    } else {
      // Gir brukeren en feilmelding på popup
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
        Legg til kommentar ({comment.length})
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

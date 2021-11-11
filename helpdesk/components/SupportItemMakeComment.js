import axios from "axios";

const { useState } = require("react");

const SupportItemMakeComment = ({ item }) => {
  const [comment, setComment] = useState('')

  const data = {
    comment: comment,
    issue_id: item.id,
    created_at: new Date()
  }

  const handleChange = (evt) => {
    setComment(evt.currentTarget.value)
  }

  const addComment = async () => {
    try {
      const response = await axios.post(`../api/comments/${item.id}`, {
        comment: comment,
        created_at: new Date()
      })

      console.log(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addComment();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Legg til kommentar
        <input onChange={handleChange} name="comment" type="text" value={comment} />
        <button type="submit">Send</button>
      </label>
    </form>
  )
}

export default SupportItemMakeComment
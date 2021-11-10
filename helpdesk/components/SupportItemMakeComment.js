const { useState } = require("react");

const SupportItemMakeComment = () => {
  const [comment, setComment] = useState('')

  const handleChange = (evt) => {
    setComment(evt.currentTarget.value)
  }

  const handleSubmit = (evt) => {
    evt.currentTarget.preventDefault();
    console.log(evt.currentTarget);
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
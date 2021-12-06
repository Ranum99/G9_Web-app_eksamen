const SupportItemComment = ({ comment, index }) => {
  return (
    <li>
      <p>Kommentar {index + 1}</p>
      <p>{comment?.comment}</p>
    </li>
  )
}

export default SupportItemComment

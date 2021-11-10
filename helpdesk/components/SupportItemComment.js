const SupportItemComment = ({ comment, index }) => {
  const date = new Date(comment?.created_at)
  const date_format = date.getDate() < 10 ? `0${date.getDate()}`: date.getDate()
  const month_format = date.getMonth() + 1
  const year_format = date.getFullYear().toString().substring(2, 4);

  return (
    <li>
      <p>Kommentar {index + 1}</p>
      <p>{comment?.comment}</p>
      <p>{`${date_format}.${month_format}.${year_format}`}</p>
    </li>
  )
} 

export default SupportItemComment
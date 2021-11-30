const SlotUserEntery = ({ user }) => {
  const date = Date(user.createdAt)

  console.log(user.user.username)
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.user.username}</td>
      <td>{date}</td>
      <td>{user.coupon}</td>
    </tr>
  )
}

export default SlotUserEntery

const SlotUserEntery = ({ user }) => {
  console.log('USER')
  console.log(user)

  const date = user.created_at

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>
        {date.getDay()}.{date.getMonth()}.{date.getFullYear()}
      </td>
      <td>{user.coupon}</td>
    </tr>
  )
}

export default SlotUserEntery

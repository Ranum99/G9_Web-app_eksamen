import { displayDate } from '@/lib/utils/displayDate'

const SlotUserEntery = ({ user, counter }) => {
  const date = new Date(user.createdAt)

  return (
    <tr>
      <td>{counter + 1}</td>
      <td>{user.user.username}</td>
      <td>{displayDate(date)}</td>
      <td>{user.coupon}</td>
    </tr>
  )
}

export default SlotUserEntery

import { number } from 'prop-types'
import SlotUserEntery from './SlotUserEntery'

const SlotUsers = ({ max, users }) => {
  console.log('SlotUser')
  console.log(users)

  return (
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>Brukernavn</td>
          <td>Dato for deltakelse</td>
          <td>Kode</td>
        </tr>
        {console.log(max)}
      </thead>
      <tbody id="tableBody">
        {users.map((user) => (
          <SlotUserEntery key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  )
}

export default SlotUsers

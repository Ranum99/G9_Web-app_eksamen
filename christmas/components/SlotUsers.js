import SlotUserEntery from './SlotUserEntery'

const SlotUsers = ({ max, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>Brukernavn</td>
          <td>Dato for deltakelse</td>
          <td>Kode</td>
        </tr>
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

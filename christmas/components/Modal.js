const Modal = ({ user, setShow }) => {
  console.log(user)
  return (
    <div className="modal">
      <div className="modalBox">
        <button className="close" onClick={() => setShow(false)}>
          X
        </button>
        <h3 className="center">Superbonus, luke {user.slot.order}</h3>
        <p className="winner center">{user.user.username}</p>
      </div>
    </div>
  )
}

export default Modal

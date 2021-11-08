import { useState } from 'react'
import Dropdown from './dropdown'

const viktigheter = [
  { value: 1, name: 'Lav' },
  { value: 2, name: 'Medium' },
  { value: 3, name: 'Høy' },
]

const avdelinger = [
  { value: 1, name: 'IT' },
  { value: 2, name: 'Design' },
  { value: 3, name: 'Salg' },
]

const SupportForm = () => {
  const [form, setForm] = useState({
    title: '',
    creator: '',
    description: '',
  })

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }))

  const handleSendSupport = (event) => {
    event.preventDefault()
    console.log(form)
  }

  return (
    <form className="support_form" onSubmit={handleSendSupport}>
      <h2>Ny henvendelse</h2>
      <div>
        <label htmlFor="title">Tittel</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleInputOnChange}
          value={form.title}
        />
      </div>
      <div>
        <label htmlFor="creator">Navn</label>
        <input
          type="text"
          id="creator"
          name="creator"
          onChange={handleInputOnChange}
          value={form.creator}
        />
      </div>
      <div>
        <label htmlFor="description">Beskrivelse</label>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={handleInputOnChange}
          value={form.description}
        />
      </div>
      <Dropdown name="viktighet" options={viktigheter} />
      <Dropdown name="avdeling" options={avdelinger} />
      <button type="sumbit">Send henvendelse</button>
    </form>
  )
}

export default SupportForm

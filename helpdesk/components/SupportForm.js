import axios from 'axios'
import { useState } from 'react'

import Dropdown from './dropdown'

const importance = [
  { value: 1, name: 'Lav' },
  { value: 2, name: 'Medium' },
  { value: 3, name: 'Høy' },
]

const departments = [
  { value: 'it', name: 'IT' },
  { value: 'design', name: 'Design' },
  { value: 'salg', name: 'Salg' },
]

const SupportForm = () => {
  const [error, setError] = useState({
    title: '',
    description: '',
    creator: '',
  })
  const [form, setForm] = useState({
    title: '',
    creator: '',
    description: '',
    importance: 1,
    department: 'it',
  })

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }))

  // TODO: denne sjekken skjer også backend. Burde ligge et sted hvor samme sjekk kan brukes både frontend og backend
  const inputCheck = () => {
    let noErrors = true
    let newErrors = { title: '', description: '', creator: '' }

    // Checking if title's length is between 25 and 150 char
    const titleRegex = new RegExp('^[a-zA-Z0-9\\s_-]{25,150}$')
    if (!titleRegex.test(form.title)) {
      newErrors = {
        ...newErrors,
        title: 'Tittelen må bestå av mellom 25 og 150 bokstaver',
      }
      noErrors = false
    }

    // Checking if description length is less than 250 char
    const descriptionRegex = new RegExp('^[a-zA-Z0-9_-]{0,250}$')
    if (!descriptionRegex.test(form.description)) {
      newErrors = {
        ...newErrors,
        description: 'Beskrivelsen kan ikke være lengre enn 250 bokstaver',
      }
      noErrors = false
    }

    // Checking if name have at least one space and big char in first- and last name
    const creatorRegex = new RegExp(
      '^[A-Z]{1,1}[a-zA-Z]{1,}\\s[A-Z]{1,1}[a-zA-Z]{1,}$'
    )
    if (!creatorRegex.test(form.creator)) {
      newErrors = {
        ...newErrors,
        creator:
          'Navn skal bestå av ett fornavn og ett etternavn med store forbokstaver',
      }
      noErrors = false
    }

    setError(newErrors)

    return noErrors
  }

  const handleSendSupport = async (event) => {
    event.preventDefault()

    if (inputCheck()) {
      try {
        const response = await axios.post('../api/issues/', {
          title: form.title,
          description: form.description,
          creator: form.creator,
          severity: parseInt(form.importance),
          department_id: form.department,
        })

        alert('Hendelsen ble lagt til')
        setForm({
          title: '',
          creator: '',
          description: '',
          importance: 1,
          department: 'it',
        })

        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  // TODO: Burde lage components ut av formen under
  return (
    <form className="support_form" onSubmit={handleSendSupport}>
      <h2>Ny henvendelse</h2>
      <div>
        <label htmlFor="title">Tittel ({form.title.length})</label>
        <p className="error">{error?.title}</p>
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
        <p className="error">{error?.creator}</p>
        <input
          type="text"
          id="creator"
          name="creator"
          required={true}
          onChange={handleInputOnChange}
          value={form.creator}
        />
      </div>
      <div>
        <label htmlFor="description">
          Beskrivelse ({form.description.length})
        </label>
        <p className="error">{error?.description}</p>
        <textarea
          type="text"
          id="description"
          name="description"
          required={true}
          onChange={handleInputOnChange}
          value={form.description}
        />
      </div>
      <Dropdown
        name="importance"
        handleInputOnChange={handleInputOnChange}
        options={importance}
      />
      <Dropdown
        name="department"
        handleInputOnChange={handleInputOnChange}
        options={departments}
      />
      <button type="sumbit">Send henvendelse</button>
    </form>
  )
}

export default SupportForm

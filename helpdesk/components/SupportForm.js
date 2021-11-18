import axios from 'axios'
import { useState } from 'react'

import Dropdown from './dropdown'

import { validate } from '@/lib/validation'

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

  
  const inputCheck = () => {
    const titleCheck = validate.title(form.title)
    const descriptionCheck = validate.descriptionAndComment(form.description, 'description')
    const creatorCheck = validate.name(form.creator)

    setError({
      title: titleCheck.error,
      description: descriptionCheck.error,
      creator: creatorCheck.error,
    })
    
    if(!titleCheck.success || !descriptionCheck.success || !creatorCheck.success)
      return false

    return true
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

        //console.log(response.data)
      } catch (error) {
        alert(error)
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

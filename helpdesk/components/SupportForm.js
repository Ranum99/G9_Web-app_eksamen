import axios from 'axios'
import { useState } from 'react'

import Dropdown from './dropdown'

import { validate } from '@/lib/validation'
import SupportFormComponent from './SupportFormComponent'

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
    // Sjekker input
    const titleCheck = validate.title(form.title)
    const descriptionCheck = validate.descriptionAndComment(form.description, 'description')
    const creatorCheck = validate.name(form.creator)

    // Setter error uansett. Dersom x.success = false, vil den gi ''
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
        // Sender en post request til API
        const response = await axios.post('../api/issues/', {
          title: form.title,
          description: form.description,
          creator: form.creator,
          severity: parseInt(form.importance),
          department_id: form.department,
        })

        alert('Hendelsen ble lagt til')

        // Setter form tilbake til default
        setForm({
          title: '',
          creator: '',
          description: '',
          importance: 1,
          department: 'it',
        })

        
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
      <SupportFormComponent 
        type="input"
        id="title"
        title="Tittel"
        error={error?.title}
        required="true"
        handleInputOnChange={handleInputOnChange}
        value={form.title}
      />
      <SupportFormComponent 
        type="input"
        id="creator"
        title="Navn"
        error={error?.creator}
        required="true"
        handleInputOnChange={handleInputOnChange}
        value={form.creator}
      />
      <SupportFormComponent 
        type="textarea"
        id="description"
        title="Beskrivelse"
        error={error?.description}
        required="true"
        handleInputOnChange={handleInputOnChange}
        value={form.description}
      />
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

export default function SupportFormComponent({ type, id, title, error, required, handleInputOnChange, value }) {
  return (
    <div>
      <label htmlFor={id}>{title} ({value.length})</label>
      <p className='error'>{error}</p>
      {type === 'input' ?
        (
          <input 
            type='text'
            id={id}
            name={id}
            required={required ? 'true' : 'false'}
            onChange={handleInputOnChange}
            value={value}
          />
        )
      : (
        <textarea 
          type='text'
          id={id}
          name={id}
          required={required ? 'true' : 'false'}
          onChange={handleInputOnChange}
          value={value}
        />
      )}
    </div>
  )
}
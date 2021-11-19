export default function Dropdown({ name, handleInputOnChange, options }) {

  return (
    <select required={true} name={name} onChange={handleInputOnChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

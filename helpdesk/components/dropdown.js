export default function Dropdown({ name, handleInputOnChange, options }) {
  return (
    <select onChange={handleInputOnChange} name={name}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

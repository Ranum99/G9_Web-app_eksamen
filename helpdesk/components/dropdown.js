export default function Dropdown({ name, options }) {
  return (
    <select name={name}>
      {options.map((option) => (
        <option value={option.value}>{option.name}</option>
      ))}
    </select>
  )
}

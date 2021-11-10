export default function Dropdown({ name, setValue, options }) {

  return (
    <select name={name} onChange={setValue}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

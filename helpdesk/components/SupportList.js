import Dropdown from './dropdown'
import SupportItem from './SupportItem'

const importance = [
  { value: 'low', name: 'Lav' },
  { value: 'medium', name: 'Medium' },
  { value: 'heigh', name: 'Høy' },
]

const departments = [
  { value: 'it', name: 'IT' },
  { value: 'design', name: 'Design' },
  { value: 'salg', name: 'Salg' },
]

const SupportList = ({ issues }) => {
  return (
    <section className="issues">
      <h2>Henvendelser</h2>
      <Dropdown name="importance" options={importance} />
      <Dropdown name="department" options={departments} />
      <ul>
        {issues?.map((issue) => (
          <SupportItem key={issue.id} item={issue} />
        ))}
      </ul>
    </section>
  )
}

export default SupportList

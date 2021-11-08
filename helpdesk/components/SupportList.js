import Dropdown from './dropdown'
import SupportItem from './SupportItem'

const importance = [
  { value: '', name: 'Select' },
  { value: 'low', name: 'Lav' },
  { value: 'medium', name: 'Medium' },
  { value: 'high', name: 'Høy' },
]

const departments = [
  { value: '', name: 'Select' },
  { value: 'it', name: 'IT' },
  { value: 'design', name: 'Design' },
  { value: 'salg', name: 'Salg' },
]

const SupportList = ({
  handleImportance,
  handleDepartment,
  issues,
  endItem,
}) => {
  return (
    <section className="issues">
      <h2>Henvendelser</h2>
      <Dropdown
        name="importance"
        setValue={handleImportance}
        options={importance}
      />
      <Dropdown
        name="department"
        setValue={handleDepartment}
        options={departments}
      />
      <ul>
        {issues?.map((issue) => (
          <SupportItem key={issue.id} item={issue} endItem={endItem} />
        ))}
      </ul>
    </section>
  )
}

export default SupportList

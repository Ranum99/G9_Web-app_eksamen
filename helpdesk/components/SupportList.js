import Dropdown from './dropdown'
import SupportItem from './SupportItem'

const importance = [
  { value: '', name: 'Alle' },
  { value: 1, name: 'Lav' },
  { value: 2, name: 'Medium' },
  { value: 3, name: 'Høy' },
]

const departments = [
  { value: '', name: 'Alle' },
  { value: 'it', name: 'IT' },
  { value: 'design', name: 'Design' },
  { value: 'salg', name: 'Salg' },
]

const SupportList = ({ handleInputOnChange, issues, endItem, getIssues }) => {
  return (
    <section className="issues">
      <header>
        <h2>Henvendelser</h2>
        <div>
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
        </div>
      </header>
      <ul>
        {issues?.length !== 0 ? (
          issues?.map((issue) => (
            <SupportItem
              key={issue.id}
              item={issue}
              endItem={endItem}
              getIssues={getIssues}
            />
          ))
        ) : (
          <p>Ingen resultater</p>
        )}
      </ul>
    </section>
  )
}

export default SupportList

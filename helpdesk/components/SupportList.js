import SupportItem from './SupportItem'
import Dropdown from './dropdown'

const viktigheter = [
  { value: 1, name: 'Lav' },
  { value: 2, name: 'Medium' },
  { value: 3, name: 'Høy' },
]

const avdelinger = [
  { value: 1, name: 'IT' },
  { value: 2, name: 'Design' },
  { value: 3, name: 'Salg' },
]

const SupportList = ({ issues }) => {
  return (
    <section className="issues">
      <h2>Henvendelser</h2>
      <Dropdown name="viktighet" options={viktigheter} />
      <Dropdown name="avdeling" options={avdelinger} />
      <ul>
        {issues?.map((issue) => (
          <SupportItem key={issue.id} item={issue} />
        ))}
      </ul>
    </section>
  )
}

export default SupportList

import { useState, useEffect } from 'react'
import content from './components/content'
import countries from './services/countries'

function App() {
  const [ allCountries, setAllCountries ] = useState ([])
  const [ filter, setFilter ] = useState ('')
  const [ foundCountries, setFoundCountries ] = ([])

  useEffect(() => {
    countries
    .getAll()
    .then(result => {
      setAllCountries(result)
    })
  }, [])

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <content.Find handleInputChange={handleInputChange} filter={filter} />
      <content.Result allCountries={allCountries} filter={filter} />
    </div>
  )
}
export default App

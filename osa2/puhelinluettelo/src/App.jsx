import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Pekka", number: "0401234567", id: 1 },
    { name: "Sami",  number: "0501234567", id: 2 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    console.log(personObject)
    persons.find(person => person.name === personObject.name)
      ? alert(`${newName} on jo luettelossa`)
      : setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const Numbers = ({ filter, persons }) => {
    const foundPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    console.log(foundPersons)
    return (
      <ul>
        {foundPersons.map(person => 
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        )}
      </ul>
    )
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <form>    
          Haku:
          <input value={filter} onChange={handleFilterChange} />            
          <h2>Numerot:</h2> 
          <Numbers filter={filter} persons={persons} />                 
      </form>
      <form onSubmit={addNumber}>
        <div>
          <h3>Lisää uusi</h3>
          Nimi:
          <input value={newName} onChange={handleNameChange} /> 
          <br/>         
          Numero:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>
    </div>
  )

}

export default App
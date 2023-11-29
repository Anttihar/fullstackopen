import { useState } from 'react'

const FilterForm = ({ handleFilterChange, filter }) => {
  return (
    <form>    
        Haku:
        <input value={filter} onChange={handleFilterChange} />            
        <h2>Numerot:</h2>                            
    </form>
  )
}

const Numbers = ({ filter, persons }) => {
  const foundPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
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

const AddForm = ({ handleNameChange, handleNumberChange, addNumber, newName, newNumber }) => {
  return (
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
  )
}

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

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <FilterForm handleFilterChange={handleFilterChange} filter={filter} />
      <Numbers filter={filter} persons={persons} />
      <AddForm 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNumber={addNumber}
        newName={newName}
        newNumber={newNumber}
      />
    </div>
  )

}

export default App
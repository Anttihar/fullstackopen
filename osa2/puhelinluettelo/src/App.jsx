import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/Filterform'
import Numbers from './components/Numbers'
import AddForm from './components/Addform'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
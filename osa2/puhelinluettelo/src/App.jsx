import { useState, useEffect } from 'react'
import services from './services/persons'
import FilterForm from './components/Filterform'
import Numbers from './components/Numbers'
import AddForm from './components/Addform'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    services
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    persons.find(person => person.name === personObject.name)
      ? alert(`${newName} on jo luettelossa`)
      : services
          .addNewPerson(personObject)
          .then(addedPerson => {
            setPersons(persons.concat(addedPerson))
          })      
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
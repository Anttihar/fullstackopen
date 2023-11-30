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
    const newPerson = {
      name: newName,
      number: newNumber
    }
    persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase()) 
      ? window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)
        ? replaceNumber(newPerson)
        : console.log('peruttu')
      : services
          .addNewPerson(newPerson)
          .then(addedPerson => {
            setPersons(persons.concat(addedPerson))
          })      
    setNewName('')
    setNewNumber('')
  }

  const replaceNumber = (newPerson) => {
    const foundPerson = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
    const personId = foundPerson.id
    services
    .changeNumber(newPerson, personId)
    .then(updPerson => {
      setPersons(persons.map(person => person.id !== updPerson.id ? person : updPerson))
      console.log('päivitetty: ', updPerson)
    })
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

  const handleDeleteClick = (id, name) => {
    window.confirm(`Haluatko todella poistaa henkilön ${name}`)
    ? services
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    : setPersons(persons)
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <FilterForm handleFilterChange={handleFilterChange} filter={filter} />
      <Numbers 
        filter={filter} 
        persons={persons}
        handleDeleteClick={handleDeleteClick}
      />
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
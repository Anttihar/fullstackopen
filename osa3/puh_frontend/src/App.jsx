import { useState, useEffect } from 'react'
import services from './services/persons'
import content from './components/content'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState (null)

  useEffect(() => {
    services
      .getPersons()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    if (!newName || !newNumber) {
      return window.alert('Täytä kaikki kentät!')
    }
  
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
            setMessage(`${newPerson.name} lisätty luetteloon`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => console.log(error))
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
      setMessage(`${newPerson.name} puhelinnumero päivitetty`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })    
    .catch(error => {
      setErrorMessage(`${newPerson.name} on jo aiemmin poistettu palvelimelta`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(person => person.id !== personId))
    })
  }

  const handleDeleteClick = (id, name) => {
    window.confirm(`Haluatko todella poistaa henkilön ${name}`)
    ? services
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`${name} poistettu luettelosta`)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
    : setPersons(persons)
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
      <content.Notification message={message} />
      <content.ErrNotification message={errorMessage} />
      <content.FilterForm handleFilterChange={handleFilterChange} filter={filter} />
      <content.Numbers 
        filter={filter} 
        persons={persons}
        handleDeleteClick={handleDeleteClick}
      />
      <content.AddForm 
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
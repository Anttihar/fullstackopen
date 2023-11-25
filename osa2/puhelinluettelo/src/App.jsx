import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {name: newName}
    const checkName = persons.find(person => person.name === personObject.name)
      ? alert(`${newName} on jo luettelossa`)
      : setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addNumber}>
        <div>
          Nimi: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>
      <h2>Numerot:</h2>
      <div>
        {persons.map(person => 
          <li key={person.name}>
            {person.name}
          </li>
        )}
      </div>
    </div>
  )

}

export default App
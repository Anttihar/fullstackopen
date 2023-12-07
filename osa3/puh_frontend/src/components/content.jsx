  const FilterForm = ({ handleFilterChange, filter }) => {
    return (
      <form>    
          Haku:
          <input value={filter} onChange={handleFilterChange} />            
          <h2>Numerot:</h2>                            
      </form>
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

  const Numbers = ({ filter, persons, handleDeleteClick }) => {
  
    const foundPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    return (
      <table>
        <tbody>
        {foundPersons.map(person => 
          <tr key={person.id}>
            <td className="name">{person.name}</td><td className="number">{person.number}</td>
            <td><button onClick={() => handleDeleteClick(person.id, person.name)}>Poista</button></td>
          </tr>
        )}
        </tbody>
      </table>
    )
  }

  const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="message">
            {message}
        </div>
    )
  }

  const ErrNotification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="errMessage">
            {message}
        </div>
    )
  }

  export default { FilterForm, AddForm, Numbers, Notification, ErrNotification }
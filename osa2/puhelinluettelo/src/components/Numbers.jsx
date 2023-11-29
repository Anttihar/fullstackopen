const Numbers = ({ filter, persons, handleDeleteClick }) => {
  
    const foundPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    return (
      <ul>
        {foundPersons.map(person => 
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDeleteClick(person.id, person.name)}>Poista</button>
          </li>
        )}
      </ul>
    )
  }

  export default Numbers
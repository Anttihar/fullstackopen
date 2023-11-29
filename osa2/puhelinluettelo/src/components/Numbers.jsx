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

  export default Numbers
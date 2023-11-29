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

  export default AddForm
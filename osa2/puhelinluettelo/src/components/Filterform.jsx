const FilterForm = ({ handleFilterChange, filter }) => {
    return (
      <form>    
          Haku:
          <input value={filter} onChange={handleFilterChange} />            
          <h2>Numerot:</h2>                            
      </form>
    )
  }

  export default FilterForm
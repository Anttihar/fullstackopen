const Find = ({ handleInputChange, filter }) => {
    return (
        <div>
            Etsi maita nimellä:
            <input value={filter} onChange={handleInputChange}/>
        </div>
    )
}

const Result = ({ allCountries, filter }) => {
    const foundCountries = allCountries.filter(country => country.name.common.includes(filter))
    console.log(foundCountries)
    if (foundCountries.length > 10) {
        return (
            <div>
                Tarkenna hakua..
            </div>
        )
    }
    if (foundCountries.length > 1 && foundCountries.length < 11) {
        return (
            <ul>                
                {foundCountries.map(country => 
                    <li key={country.name.official}>
                        {country.name.common}
                    </li>
                )}
            </ul>
        )
    }
    if (foundCountries.length === 1) {
        
    }
    return (
        <div>
        <BasicInfo foundCountries={foundCountries} />
        <Languages foundCountries={foundCountries} />
        </div>
    )

}

const BasicInfo = ({ foundCountries }) => {
    return (
        <div>
            {foundCountries.map(country => 
                <div key={country.name.official}>
                    <h2>{country.name.common}</h2>
                    <p><b>Pääkaupunki: </b>{country.capital}<br/>
                    <b>Pinta-ala: </b>{country.area} km<sup>2</sup></p>
                </div>
            )}
        </div>
    )
}

const Languages = ({  }) => {

}

export default { Find, Result }
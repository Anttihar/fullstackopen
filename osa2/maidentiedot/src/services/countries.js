import axios from 'axios'

const getAll = () => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    return request.then(response => response.data)
}

const getByName = () => {

}

export default { getAll }
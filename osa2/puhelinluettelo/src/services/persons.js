import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNewPerson = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    console.log(id)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getPersons, addNewPerson, deletePerson }
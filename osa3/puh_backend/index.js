const express = require('express')
const app = express()

const persons = [
    {
        name: "Raimo Helminen",
        number: "41",
        id: 1
    },
    {
        name: "Veikko Nieminen",
        number: "40",
        id: 2
    },
    {
        name: "Wayne Gretzky",
        number: "99",
        id: 3
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>`
    )
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Serven running on port ${PORT}`)
})
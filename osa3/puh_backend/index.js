const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
morgan.token('content', (req, res) => {
    return JSON.stringify(req.body)
})

let persons = [
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

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons/', (req, res) => {
    const body = req.body
    const newId = Math.floor(Math.random() * 100000000)

    if (!body.name) {
        return res.status(400).json({
            error: 'Nimi puuttuu'
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'Numero puuttuu'
        })
    }
    if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return res.status(400).json({
            error: 'Nimi on jo luettelossa'
        })
    }
    const newPerson = {
        name: body.name,
        number: body.number,
        id: newId
    }

    persons = persons.concat(newPerson)
    res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>`
    )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Serven running on port ${PORT}`)
})
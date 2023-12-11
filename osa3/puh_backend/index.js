require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
morgan.token('content', (req, res) => {
    return JSON.stringify(req.body)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
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
/*
    if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return res.status(400).json({
            error: 'Nimi on jo luettelossa'
        })
    }
*/
    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson.save().then(addedPerson => {
        res.json(addedPerson)
    })
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

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Serven running on port ${PORT}`)
})
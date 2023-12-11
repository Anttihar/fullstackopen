require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted error' })
    }
    next(error)
}
const unknownEndpoint = (req, res) => {
    res.status(204).send({ error: 'unknown endpoint' })
}

app.use(express.json())
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

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json(person)
        })
        .catch(error => next(error))
})

app.post('/api/persons/', (req, res) => {
    const body = req.body

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson.save().then(addedPerson => {
        res.json(addedPerson)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const newNumber = req.body.number
        
    Person.findByIdAndUpdate(req.params.id, body, {new: newNumber})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    Person.find({})
        .then(persons => {
             res.send(
                `<p>Phonebook has info for ${persons.length} people</p>
                <p>${Date()}</p>`
             )
        })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Serven running on port ${PORT}`)
})
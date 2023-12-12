const { info } = require('./logger')

const reqLogger = (req, res, next) => {
    info('Method:', req.method)
    info('Path:', req.path)
    info('Body:', req.body)
    info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted error' })
    }
}

module.export = { reqLogger, unknownEndpoint, errorHandler }
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const logger = require('./utils/logger')

logger.info('connecting to', MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)
    .then(result => {
        logger.info('connected to mongodb')
    })
    .catch(error => {
        logger.error('error connecting to mongodb', error.message)
    })

app.use(express.json())
app.use(cors())
app.use(middleware.reqLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
const express = require('express')
const app = express()
const cors = require('cors')
const blogRoutes = require('./controllers/routes')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const logger = require('./utils/logger')
const Blog = require('./models/blog')

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
app.use('/api/blogs', blogRoutes)

module.exports = app
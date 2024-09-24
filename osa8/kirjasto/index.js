require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const resolvers = require('./resolvers.js')
const typeDefs = require('./schemas.js')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

console.log(`connecting to mongodb`)

mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('connected to mongodb')
  })
  .catch(error => {
    console.log('error connecting to mongodb', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
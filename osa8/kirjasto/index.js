require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const resolvers = require('./graphql/resolvers.js')
const typeDefs = require('./graphql/schemas.js')
const mongoose = require('mongoose')
const User = require('./models/User.js')
const jwt = require('jsonwebtoken')
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
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate('books')
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
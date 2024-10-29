require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } =
  require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('./models/User.js')

const resolvers = require('./graphql/resolvers.js')
const typeDefs = require('./graphql/schemas.js')

mongoose.set('strictQuery', false)

console.log(`connecting to mongodb`)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(error => {
    console.log('error connecting to mongodb', error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      { async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          }
        }
      }}
    ]
  })

  await server.start()
  
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id).populate('books')
          return { currentUser }
        }
      }
    })
  )

  const PORT = process.env.PORT || 4000

  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

start()
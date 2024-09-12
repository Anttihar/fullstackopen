const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { books, authors, genres } = require('./data.js')

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book]
    allAuthors: [Author]
    allGenres: [Genre]
  }

  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String]
  }

  type Author {
    name: String!
    id: String!
    born: Int
  }

  type Genre {
    name: String
    id: String
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: () => books,
    allAuthors: () => authors,
    allGenres: () => genres
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
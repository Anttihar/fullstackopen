const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { books, authors, genres } = require('./data.js')

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author]
    allGenres: [Genre]
    allBooks(author: String = ""): [Book]
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
    bookCount: Int!
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
    allBooks: (root, args) => {
      console.log(args)
      if (args.author === "") {
        return books
      }
      return books.filter(b => b.author === args.author)
    },
    allAuthors: () => authors,
    allGenres: () => genres
  },
  Author: {
    bookCount: (root) => {
      return books.filter(b => (b.author === root.name)).length
    }
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
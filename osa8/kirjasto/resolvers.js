const { books, authors, genres } = require('./data.js')
const { v1: uuid } = require('uuid')

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      console.log(args)
      if (args.author === "" && args.genre === "") {
        return books
      }
      if (args.author !== "" && args.genre !== "") {
        const filteredBooks = books.filter(b => b.author === args.author)
        return filteredBooks.filter(b => b.genres.includes(args.genre))
      }
      if (args.author !== "") {
       return books.filter(b => b.author === args.author)
      }
      if (args.genre !== "") {
        console.log("genreen tultiin")
        return books.filter(b => b.genres.includes(args.genre))
      }
    },
    allAuthors: () => authors,
    allGenres: () => genres
  },
  Mutation: {
    addBook(root, args) {
      const book = {...args, id: uuid()}
      books.push(book)
      if (authors.find(a => a.name !== args.name)) {
        const author = { name: args.author, id: uuid() }
        authors.push(author)
      }
      return book
    }
  },
  Author: {
    bookCount: (root) => {
      return books.filter(b => (b.author === root.name)).length
    }
  }
}

module.exports = resolvers
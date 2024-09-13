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
        return books.filter(b => b.genres.includes(args.genre))
      }
    },
    allAuthors: () => authors,
    allGenres: () => genres
  },
  Mutation: {
    addBook(root, args) {
      const newBook = {...args, id: uuid()}
      books.push(newBook)
      const author = authors.find(a => a.name === args.author)
      if (!author) {
        const newAuthor = { name: args.author, id: uuid() }
        authors.push(newAuthor)
      }
      return newBook
    },
    editAuthor: async (root, args) => {
      const author = authors.find(a => a.name === args.name)
      const index = authors.findIndex(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.born }
      authors[index] = updatedAuthor
      return updatedAuthor
    }
  },
  Author: {
    bookCount: (root) => {
      return books.filter(b => (b.author === root.name)).length
    }
  }
}

module.exports = resolvers
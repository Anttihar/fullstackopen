const { books, authors, genres } = require('./data.js')
const Book = require('./models/Book.js')
const Author = require('./models/Author.js')

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author === "" && args.genre === "") {
        return Book.find({}).populate('author', { name: 1, born: 1 })
      }
      if (args.author !== "" && args.genre !== "") {
        const author = await Author.find({ name: args.author })
        const filteredBooks = await Book.find({ author: author[0]._id }).populate('author', { name: 1, born: 1 })
        return filteredBooks.filter(b => b.genres.includes(args.genre))
      }
      if (args.author !== "") {
        const author = await Author.find({ name: args.author })
        return Book.find({ author: author[0]._id }).populate('author', { name: 1, born: 1 })
        
      }
      if (args.genre !== "") {
        return Book.find({ genres: args.genre })
      }

    },
    allAuthors: async () => Author.find({})
  },

  Mutation: {
    async addBook(root, args) {
      const author = await Author.findOne({ name: args.author })
      console.log('author: ', author)
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save().then(result => {
          console.log("uusi author: ", result)
        })
        const newBook = new Book({ ...args, author: newAuthor._id })
        await newBook.save()
        return Book.findById(newBook.id).populate('author', { name: 1 })
      }
      const newBook = new Book({ ...args, author: author._id })
      await newBook.save()
      return Book.findById(newBook.id).populate('author', { name: 1 })
    },
    async editAuthor(root, args) {
      const author = await Author.findOneAndUpdate({ name: args.name, born: args.born, new: true  })
      console.log(author)
      if (!author) {
        return null
      }
      return author
    }
  },

  Author: {
    async bookCount(root) {
      const books = await Book.find({ author: root._id })
      return books.length
    }
  }
}

module.exports = resolvers
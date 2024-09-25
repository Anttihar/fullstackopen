const Book = require('./models/Book.js')
const Author = require('./models/Author.js')
const { GraphQLError } = require('graphql')

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author', { name: 1, born: 1 })
      }
      if (args.author && args.genre) {
        const author = await Author.find({ name: args.author })
        const filteredBooks = await Book.find({ author: author[0]._id }).populate('author', { name: 1, born: 1 })
        return filteredBooks.filter(b => b.genres.includes(args.genre))
      }
      if (args.author) {
        const author = await Author.find({ name: args.author })
        return Book.find({ author: author[0]._id }).populate('author', { name: 1, born: 1 })
        
      }
      if (args.genre) {
        return Book.find({ genres: args.genre })
      }

    },
    allAuthors: async () => Author.find({})
  },

  Mutation: {
    async addBook(root, args) {
      if (await Book.findOne({ title: args.title })) {
        throw new GraphQLError('Title must be unique', {
          extensions: {
            code: 'BAD_TITLE_INPUT',
            invalidArgs: args.title
          }
        })
      }
      if (!args.title) {
        throw new GraphQLError('Title is required', {
          extensions: {
            code: 'BAD_TITLE_INPUT',
            invalidArgs: args.title
          }
        })
      }
      if (!args.author) {
        throw new GraphQLError('Author is required', {
          extensions: {
            code: 'BAD_AUTHOR_INPUT',
            invalidArgs: args.author
          }
        })
      }
      if (args.author.length < 4 ) {
        throw new GraphQLError('Author minimun length is 4', {
          extensions: {
            code: 'BAD_AUTHOR_INPUT',
            invalidArgs: args.author
          }
        })
      }

      const author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
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
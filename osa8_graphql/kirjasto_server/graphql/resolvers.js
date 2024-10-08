const Book = require('../models/Book.js')
const Author = require('../models/Author.js')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log('args: ', args)
      if (args.author && args.genre) {
        const author = await Author.find({ name: args.author })
        if (author.length === 0) {
          return []
        }
        const filteredBooks = await Book.find({ author: author[0]._id }).populate('author')
        return filteredBooks.filter(b => b.genres.includes(args.genre))
      }
      if (args.author) {
        const author = await Author.find({ name: args.author })
        if (author.length === 0) {
          return []
        }
        return Book.find({ author: author[0]._id }).populate('author')
      }
      if (args.genre) {
        return Book.find({ genres: args.genre }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) => {
      return User.findById(context.currentUser.id)
        .populate({ path: 'books', populate: 'author' })
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
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
      if(!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = await new Author({ name: args.author })
      }
      const newBook = new Book({ ...args, author: author._id })
      
      try {
        await author.save()
        await newBook.save()
        currentUser.books = currentUser.books.concat(newBook)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: currentUser,
            error
          }
        })
      }
      return Book.findById(newBook.id).populate('author')
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const author = await Author.findOneAndUpdate(
        { name: args.name }, { born: args.born }, { new: true }
      )
      if (!author) {
        return null
      }
      return author
    },

    async login(root, args) {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('invalid username or password', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, process.env.JWT_SECRET)

      return {
        token,
        username: user.username,
        favoriteGenre: user.favoriteGenre
      }
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre 
      })
      console.log(user)
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating new user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
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
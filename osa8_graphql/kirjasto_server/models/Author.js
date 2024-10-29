const { model, Schema } = require('mongoose')

const authorSchema = Schema({
  name: {
    type: String,
    required: true,
    minLength: 4
  },
  born: Number,
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
})

module.exports = model('Author', authorSchema)
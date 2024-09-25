const { model, Schema } = require('mongoose')

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  published: {
    type: Number,
    required: true
  },
  genres: [
    { type: String }
  ]
})

module.exports = model('Book', bookSchema)
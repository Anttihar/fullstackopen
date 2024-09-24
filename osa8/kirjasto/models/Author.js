const { model, Schema } = require('mongoose')

const authorSchema = Schema({
  name: {
    type: String,
    required: true,
    minlenght: 4
  },
  born: Number
})

module.exports = model('Author', authorSchema)
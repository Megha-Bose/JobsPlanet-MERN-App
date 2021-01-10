const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema
const nameSchema = new Schema({
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  }
})

module.exports = Name =  mongoose.model('Name', nameSchema)
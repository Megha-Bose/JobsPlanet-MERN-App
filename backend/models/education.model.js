const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema
const educationSchema = new Schema({
  school: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  startdate: {
    type: Date,
    required: true
  },
  enddate: {
    type: Date
  }
})

module.exports = Education = mongoose.model('Education', educationSchema)
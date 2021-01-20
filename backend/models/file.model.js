const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema
const fileSchema = new Schema({
    meta_data:{}
})

module.exports = File = mongoose.model('file',fileSchema);
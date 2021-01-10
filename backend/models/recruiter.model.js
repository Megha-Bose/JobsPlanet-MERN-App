const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema
const recruiterSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String
    },
    bio: {
        type: String,
    },
    rating: {
        type: Number,
        default: 5
    }
});

module.exports = Recruiter = mongoose.model('Recruiter', recruiterSchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    maxpos: {
        type: Number,
        required: true
    },
    maxapp: {
        type: Number,
        default: 5
    },
    address: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        default: 5
    },
    dateOfPost: {
		type: Date,
		default: Date.now
    },
    deadline:{
		type: Date,
		required: false
	}
});

module.exports = Job =  mongoose.model('Job', jobSchema)
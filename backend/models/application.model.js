const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicantId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recruiterId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stage: {
        type: Number,
        default: 4
    },
    status: {
        type: String
    },
    sop: {
        type: String
    },
    doj: {
        type: Date
    },
    salary: {
        type: Number
    },
    recruiterName: {
        type: String
    },
    title: {
        type: String
    },
    rating: {
        type: Number
    },
    applicantRating: {
        type: Number,
        default: -1
    },
    dateOfApplication: {
        type: Date,
        default: new Date()
    }
});

module.exports = Application = mongoose.model('Application', applicationSchema)
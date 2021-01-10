const mongoose = require('mongoose')
const Schema = mongoose.Schema
const name = require('./name.model')

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
});

module.exports = Application = mongoose.model('Application', applicationSchema)
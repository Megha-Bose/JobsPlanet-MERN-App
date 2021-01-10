const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const education = require('./education.model')

// Schema
const applicantSchema = new Schema({
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
    education: {
        type: [education.schema]
    },
    skills: {
        type: [String]
    },
    resume: {
        type: String
    },
    profile_image: {
        type: String,
        // default: 'default-profile-image.jpg'
    },
    rating: {
        type: Number,
        default: 5
    }
});

module.exports = Applicant = mongoose.model("Applicant", applicantSchema);

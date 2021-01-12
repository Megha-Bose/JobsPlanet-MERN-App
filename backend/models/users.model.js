const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const education = require('./education.model')
  
// Schema
const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
    	lowercase: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 128
	},
	role: {
		type: String,
		required: true,
		enum: ['applicant', 'recruiter'],
		default: 'applicant'
	},
	date:{
		type: Date,
		default: Date.now
	},
	rating: {
        type: Number,
        default: 5
	},
	profile_image: {
        type: String,
        // default: 'default-profile-image.jpg'
    },
	//recruiter
	phone_number: {
        type: Number
    },
    bio: {
        type: String,
	},
	// applicant
	education: {
        type: [education.schema]
    },
    skills: {
        type: [String]
    },
    resume: {
        type: String
    }
});

module.exports = User = mongoose.model("User", userSchema);

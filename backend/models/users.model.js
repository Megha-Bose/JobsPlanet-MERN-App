const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roles = [
	'recruiter', 'applicant'
]
  
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
		default: 'applicant',
		enum: roles
	},
	date:{
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model("User", userSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const User = mongoose.model(
	'User',
	new Schema({
		username: String,
		password: String, // Hash
		age: Number,
		gender: String,
		email: String
	})
);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	address: { type: String, unique: false, required: true },
	name: { type: String, unique: false, required: false },
	description: { type: String, unique: false, required: false },
	status: { type: Boolean }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Camera', schema);
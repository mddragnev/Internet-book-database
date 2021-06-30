const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    description: {
        type: String,
        required: true,
        minLength: 5
    },
    imageURL: {
        type: String,
        required: true,
        minLength: 6
    },
    rating: {
        type: Array
    },
    comments: {
        type: Array
    }
});

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', bookSchema);

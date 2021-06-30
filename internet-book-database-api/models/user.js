const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    gender: {
        type: String,
    },
    role: {
        type: String,

    },
    imageURL: {
        type: String,

    },
    description: {
        type: String,
    },
    registeredOn: {
        type: String,
    },
    readlist: {
        type: Array
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

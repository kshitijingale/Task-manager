const mongoose = require('mongoose')
const Todo = require('./Todo').schema

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    token: {
        type: String
    },
    todos: [Todo]
})

module.exports = mongoose.model('user', userSchema);
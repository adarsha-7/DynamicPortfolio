const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: [25, 'Max title length is 25']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [300, 'Max description length is 300']
    },
    frontend: {
        type: String,
        trim: true
    },
    backend: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    position: {
        type: Number
    }
})

module.exports = mongoose.model('Work', workSchema)
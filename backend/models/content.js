const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    resume: {
        type: String,
        trim: true
    },
    about: {
        image: {type: String},
        description: {type: String}
    }
})

module.exports = mongoose.model('Content', contentSchema)
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: [25, 'Max name length is 25']
    },
    email: {
        type: String,
        trim: true,
        maxlength: [50, 'Max email length is 50']
    },
    value: {
        type: String,
        trim: true,
        maxlength: [500, 'Max message length is 500']
    },
    created: {
        type: Date,
        default: Date.now
    },
    notified: {
        type: Boolean,
        default: false
    },
    seen: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Message', messageSchema)
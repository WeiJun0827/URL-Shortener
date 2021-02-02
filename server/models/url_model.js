const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 8,
        unique: true,
        index: true
    },
    originalUrl: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
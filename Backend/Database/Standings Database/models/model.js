const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    order: {
        type: Number,
    },
    name: {
        type: String,
    },
    mp: {
        type: Number,
    },
    w: {
        type: Number,
    },
    e: {
        type: Number,
    },
    l: {
        type: Number,
    },
    gf: {
        type: Number,
    },
    ga: {
        type: Number,
    },
    pts: {
        type: Number,
    },
})

module.exports = mongoose.model('Model', modelSchema);
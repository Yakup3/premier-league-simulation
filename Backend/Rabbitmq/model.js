const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    match_id: {
        type: String,
    },
    hts: {
        type: Number,
    },
    ats: {
        type: Number,
    },
    ht: {
        type: String,
    },
    at: {
        type: String,
    },
    h_pts: {
        type: Number,
    },
    a_pts: {
        type: Number,
    },
    date: {
        type: String,
    }
})

module.exports = modelSchema;
const mongoose = require('mongoose'),
    company = require('./company')

module.exports = mongoose.model('Employee', mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    id: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["female", "male"],
    },
    manager: {
        type: Boolean,
    },
    birthday: {
        type: Date,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    }

}))
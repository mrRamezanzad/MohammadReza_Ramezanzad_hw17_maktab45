const mongoose = require('mongoose')

module.exports = mongoose.model("Company", mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    cin: {
        type: String,
        unique: true,
        required: true
    },
    city: {
        type: String,
    },
    province: {
        type: String,
    },
    registerDate: {
        type: Date,
        required: true
    },
    telephone: {
        type: String,

    }

}))
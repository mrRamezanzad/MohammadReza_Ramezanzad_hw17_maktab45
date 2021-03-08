const mongoose = require('mongoose')

module.exports = mongoose.model("Company", mongoose.Schema({
    name: {
        type: String,
    },
    cin: {
        type: String,
        required: true,
    },
    city: {
        type: String,
    },
    province: {
        type: String,
    },
    registerDate: {
        type: Date,
    },
    telephone: {
        type: String,
    }

}))
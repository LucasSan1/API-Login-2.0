const mongoose = require('mongoose')

const Admin = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    senha: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        require: false,
        // unique: true,
        trim: true
    }
});


module.exports = mongoose.model('admin', Admin);
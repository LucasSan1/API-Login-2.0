const mongoose = require('mongoose')

const User = new mongoose.Schema({
    
    telefone: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        maxlenght: 11,
        minlenght: 11
    },
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
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('user',User);

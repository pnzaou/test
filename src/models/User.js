const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nom: {type: String, required: true},
    mail: {type: String, required: true, unique: true},
    tel: {type: String, required: true, unique: true},
    statut: {type: String, required: true},
    create_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
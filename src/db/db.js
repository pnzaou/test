const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.MONGOURL

const connexion = async () => {
    try {
        const db = await mongoose.connect(url)
        console.log(`Connexion réussie sur ${db.connection.name} !`);
    } catch (error) {
        console.log(`Erruer de connexion : `, error.message);
    }
}

const deconnexion = async () => {
    try {
        await mongoose.disconnect()
        console.log('Déconnexion réussie !');
    } catch (error) {
        console.log(`Erruer de déconnexion : `, error.message);
    }
}

module.exports = {
    connexion,
    deconnexion
}
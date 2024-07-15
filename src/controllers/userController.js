const User = require('../models/User')
const db = require('../db/db')
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'josuemadingou5@gmail.com',
    pass: 'iyvnvpsgktrxywpb'
  }
})

const emailTemplatePath = path.join('src', 'mails', 'mail.html')
const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8')


const createUser = async (req, res) => {
    const user = new User(req.body)
    await db.connexion()
    try {
        const data = await user.save()
        const msg = 'Utilisateur enregistré avec succès !'

        const emailContent = emailTemplate
          .replace('{{name}}', req.body.nom)
          .replace('{{ mail }}', req.body.mail)
          .replace('{{ numero }}', req.body.tel)
          .replace('{{ statut }}', req.body.statut)

        const mailOptions = {
          from: 'josuemadingou5@gmail.com',
          to: 'scalerking72@gmail.com',
          subject: 'Utilisateur enregistré',
          html: emailContent
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Erreur lors de l\'envoi de l\'email : ', error);
          } else {
            console.log('Email envoyé : ' + info.response);
          }
        });

        res.status(201).json({message: msg, data: data})
    } catch (error) {
        const msg = 'Erreur lors de l\'enregistrement : '
        res.status(500).json({message: msg, data: error})
    }
    await db.deconnexion()
}

const getAllUsers = async (req, res) => {
    await db.connexion();
    try {
      const data = await User.find();
      res.status(200).json({ message: 'Utilisateurs récupérés avec succès', data: data });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération : ', error });
    }
    await db.deconnexion();
  };

module.exports = {
    createUser,
    getAllUsers
}
const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()


router.post('/inscription', userController.createUser)
router.get('/users', userController.getAllUsers);

module.exports = router
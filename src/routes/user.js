const express = require('express');
const router = express.Router();

let userController = require('../controllers/userController')

router.post('/login', userController.login);

module.exports = router;
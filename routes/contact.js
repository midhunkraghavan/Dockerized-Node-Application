const express = require('express');
const router = express.Router();

let contactController = require('../controllers/contactController')
let auth = require('../middlewares/auth')

router.post('/contact', auth, contactController.createContact);
router.get('/contact', auth, contactController.listContact);
router.put('/contact', auth, contactController.updateContact);
router.get('/contact/:id', auth, contactController.viewContact);
router.delete('/contact/:id', auth, contactController.deleteContact);

module.exports = router;
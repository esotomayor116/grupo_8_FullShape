const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersControllers');

router.get('/login', controller.access);
router.post('/login', controller.login);

module.exports = router;

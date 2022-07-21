const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersControllers');

router.get('/login', controller.login);
router.post('/login', controller.access);
router.post('/', controller.logout);

module.exports = router;

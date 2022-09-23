const express = require('express');
const controller = require('../../controllers/api/usersControllers');
const router = express.Router();

router.get('/', controller.list);

module.exports = router;
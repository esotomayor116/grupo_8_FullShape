const express = require('express');
const controller = require('../../controllers/api/productsController');
const router = express.Router();

router.get('/', controller.list);

module.exports = router;
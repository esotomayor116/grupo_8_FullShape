const express = require('express');
const controller = require('../controllers/productsController');
const router = express.Router();

router.get('/products/:id/edit', controller.edit);

module.exports = router;


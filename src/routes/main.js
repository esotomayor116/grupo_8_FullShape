const express = require('express');
const controller = require('../controllers/productsController');
const router = express.Router();

//Listado de productos, vista home.
router.get('/', controller.index);

module.exports = router;
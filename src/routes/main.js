const express = require('express');
const controller = require('../controllers/productsController');
const router = express.Router();
const guestMiddleware = require('../middlewares/guestMiddleware');

//Listado de productos, vista home.
router.get('/', controller.index);

router.get("/shoppingcart", guestMiddleware, controller.shoppingCart);


module.exports = router;
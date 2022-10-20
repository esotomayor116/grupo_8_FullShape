const express = require('express');
const controller = require('../controllers/productsController');
const router = express.Router();
const guestMiddleware = require('../middlewares/guestMiddleware');

//Listado de productos, vista home.
router.get('/', controller.index);

router.get("/shoppingcart/:id", guestMiddleware, controller.shoppingCart);

router.post("/shoppingcart/:id/add", controller.addToCart);

router.put("/shoppingcart/:id/update", controller.updateCart);

router.delete("/shoppingcart/:id/delete", controller.DelFromCart);


module.exports = router;
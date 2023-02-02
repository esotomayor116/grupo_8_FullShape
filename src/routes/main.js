const express = require('express');
const controller = require('../controllers/productsController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

//Listado de productos, vista home.
router.get('/', controller.index);

router.get("/shoppingcart/:id", authMiddleware, controller.shoppingCart);

router.post("/shoppingcart/:id/add", authMiddleware, controller.addToCart);

router.put("/shoppingcart/:id/update", controller.updateCart);

router.delete("/shoppingcart/:id/delete", controller.DelFromCart);


module.exports = router;
const express = require('express');
const controller = require('../controllers/productsController');
const router = express.Router();

//Listado de productos, vista home.
router.get('/', controller.index);

//Formulario de creación, vista productCreate.
router.get('/create', (req, res) => res.render('./products/productCreate'));
router.post('/', controller.store);

//Detalle de productos, vista productDetail.
router.get('/:id', controller.detail);

//Formulario de edición, vista productEdit.
router.get('/:id/edit', controller.edit);
router.put('/:id', controller.update);

//botón de borrado, en vista productDetail.
router.delete('/:id', controller.delete)

module.exports = router;


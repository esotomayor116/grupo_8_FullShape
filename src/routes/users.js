const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersControllers');

router.get('/login', controller.login);
router.post('/login', controller.access);
router.post('/', controller.logout);

//Ruta para ver todos los usuarios funciona OK
router.get('/', controller.index);

//Ruta para ver el formulario de registro funciona OK
router.get('/register', controller.create);

//Procesamiento del formulario de creación
router.post('/guardar', controller.store);

//Detalle del Usuario
router.get('/:id', controller.show);


module.exports = router;

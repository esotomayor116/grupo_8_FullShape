const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/usersControllers');
const path = require ('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,path.join(__dirname, '../../public/images/users'))
    },
    filename: (req,file,cb) =>{
        console.log(file);
        const newFilename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
    });

const upload = multer({storage});

//Middleware
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//aqui comienzan las rutas. 
//Las siguientes son rutas del login
router.get('/login', guestMiddleware, controller.login);
router.post('/login', controller.access);
router.post('/', controller.logout);

//Ruta para ver todos los usuarios funciona OK
router.get('/', controller.index);

//Ruta para ver el formulario de registro funciona OK
router.get('/register', guestMiddleware, controller.create);

//Procesamiento del formulario de creación
router.post('/guardar', upload.single('userImage'), controller.store);

//Detalle del Usuario
router.get('/:id', authMiddleware, controller.show);


module.exports = router;

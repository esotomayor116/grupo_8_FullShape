const express = require('express');
const controller = require('../controllers/productsController');
const router = express.Router();
const multer = require('multer');
const path = require ('path')
const guestMiddleware = require('../middlewares/guestMiddleware');
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,path.join(__dirname, '../../public/images/products'))
    },
    filename: (req,file,cb) =>{
        console.log(file);
        const newFilename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
    })
    

const upload = multer({storage});

//Listado de productos, vista home.
router.get('/', controller.index);

//Formulario de creación, vista productCreate.
router.get('/create', guestMiddleware, controller.create);
router.post('/',upload.single('productMainImage'), controller.store);

//Detalle de productos, vista productDetail.
router.get('/:id', controller.detail);

//Formulario de edición, vista productEdit.
router.get('/:id/edit', guestMiddleware,  controller.edit);
router.put('/:id', upload.single('productMainImage') , controller.update);

//botón de borrado, en vista productDetail.

router.get ('/:id', controller.delete)

//ruta de busqueda de productos
router.get('/search', controller.search)

module.exports = router;


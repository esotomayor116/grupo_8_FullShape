const express = require('express');
const controller = require('../controllers/productsController');
const router = express.Router();
const multer = require('multer');
const path = require ('path');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

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

const validations = [
    body('productName').notEmpty().withMessage('Por favor ingresa un nombre del producto a agregar para continuar')
    .isLength({min: 5}).withMessage('El nombre debe contener mínimo 5 caracteres'),
    body('productDescription').notEmpty().withMessage('Por favor ingresa una descripción del producto para continuar')
    .isLength({min: 20}).withMessage('La descripción debe contener mínimo 20 caracteres'),
    body('productUnitPrice').notEmpty().withMessage('Por favor ingresa un precio del producto (precio unitario)')
    .isFloat().withMessage('El precio debe ser un número'),
    body('productMainImage').custom((value , { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (!file) {
            throw new Error('Por favor sube una imagen para continuar')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error('Las extensiones de archivo permitidas son ".jpg", ".png" o ".jpeg"')
            } else {
                return true;
            }    
        }
    })
];

//Listado de productos, vista home.
router.get('/', controller.index);

//Formulario de creación, vista productCreate.
router.get('/create', authMiddleware, controller.create);
router.post('/',upload.single('productMainImage'), validations, controller.store);

//ruta de busqueda de productos
router.get('/search', controller.search)

//Detalle de productos, vista productDetail.
router.get('/:id', controller.detail);

//Formulario de edición, vista productEdit.
router.get('/:id/edit', authMiddleware,  controller.edit);
router.put('/:id', upload.single('productMainImage'), validations , controller.update);

//botón de borrado, en vista productDetail.

router.delete ('/:id', authMiddleware, controller.delete)


module.exports = router;

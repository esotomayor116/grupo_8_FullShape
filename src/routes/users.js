const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/usersControllers');
const path = require ('path');
const { body } = require('express-validator');

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

//  Validacion backend registro de usuarios
const validations = [
    body('userNames').notEmpty().withMessage('Por favor registra un nombre para continuar')
    .isLength({min: 2}).withMessage('El nombre debe contener mínimo 2 caracteres'),
    body('userLastNames').notEmpty().withMessage('Por favor registra un apellido para continuar')
    .isLength({min: 2}).withMessage('El apellido debe contener mínimo 2 caracteres'),
    body('userEmail').notEmpty().withMessage('Por favor ingresa un email para continuar')
    .isEmail().withMessage('Por favor ingresa un email válido'),
    body('userPassword').notEmpty().withMessage('Por favor crea la contraseña para continuar')
    .isLength({min: 8}).withMessage('La contraseña debe contener mínimo 8 caracteres'),

    body('PasswordConfirmation').notEmpty().withMessage('Por favor repite la contraseña para continuar')
    .custom((value, { req }) => {
        if (value !== req.body.userPassword) {
        throw new Error('Las contraseñas no coinciden');
        }
    
        // Indicates the success of this synchronous custom validator
        return true;
    }),


    body('userImage').custom((value , { req }) => {
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
//  Validacion backend login usuarios
const validationLogin = [
    body('userEmail').notEmpty().withMessage('Por favor ingresa un email para continuar')
    .isEmail().withMessage('Por favor ingresa un email válido'),
    body('userPassword').notEmpty().withMessage('Por favor ingresa tu contraseña para continuar')
]

// Validacion backend edicion usuarios
const validationsEdit = [
    body('userNames').notEmpty().withMessage('Debes dejar un nombre para continuar')
    .isLength({min: 2}).withMessage('El nombre debe contener mínimo 2 caracteres'),
    body('userLastNames').notEmpty().withMessage('Debes dejar un apellido para continuar')
    .isLength({min: 2}).withMessage('El apellido debe contener mínimo 2 caracteres'),
    body('userEmail').notEmpty().withMessage('Debes dejar un email para continuar')
    .isEmail().withMessage('Por favor ingresa un email válido'),
    body('userPassword').custom((value, { req }) => {
      if (value != '' && value.length < 8) {
        throw new Error('La contraseña debe contener mínimo 8 caracteres');
      }
  
      return true;
    }),
  
    body('PasswordConfirmation').custom((value, { req }) => {
      if (req.body.password != '' && value != req.body.userPassword) {
          throw new Error("Las contraseñas no coinciden");
      }
  
      return true;
    }),
  
    body('userImage').custom((value, { req }) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.jpeg']
      if (file) {
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
          throw new Error('Las extensiones de archivo permitidas son ".jpg", ".png" o ".jpeg"')
        } else {
          return true;
        }
      } else {
        return true;
      }
    })
  ];



//aqui comienzan las rutas. 
//Las siguientes son rutas del login
router.get('/login', guestMiddleware, controller.login);
router.post('/login', validationLogin, controller.access);
router.delete('/:id', controller.logout);

//Ruta para ver todos los usuarios funciona OK
router.get('/', authMiddleware, controller.index);

//Ruta para ver el formulario de registro funciona OK
router.get('/register', guestMiddleware, controller.create);

router.get('/edit/:id', authMiddleware, controller.edit);

//Procesamiento del formulario de creación
router.post('/guardar', upload.single('userImage'), validations, controller.store2);

//Detalle del Usuario
router.get('/:id', authMiddleware, controller.show);

//Actualizacion de usuario
router.put('/editsubmit/:id', upload.single('userImage'), validationsEdit, controller.update)


module.exports = router;

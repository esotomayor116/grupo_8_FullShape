const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/usersControllers');
const path = require ('path');

router.get('/', controller.list);
router.get('/search', controller.search);
router.get('/:id', controller.show);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);



module.exports = router;

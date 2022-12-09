const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.post('/create', userController.create);
router.post('/update', userController.update);
router.post('/delete', userController.delete);
router.post('/login', userController.login);
router.post('/change-password', userController.changePassword);
router.get('/find',userController.findAll)
router.get('/', userController.findOne);

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { check } = require('express-validator');
const authController = require('../controller/auth');

router.get('/registration', authController.getRegistrationPage);

router.post('/registration', upload.none(), 
[
  check('username', 'Имя пользователя не может быть пустым').notEmpty(),
  check('password', 'Пароль должен быть больше 5 и меньше 10 символов').isLength({min:5, max: 10})
], 
authController.registration);

router.get('/login', authController.getLoginPage); 

router.post('/login', upload.none(), authController.login);

router.get('/logout', authController.logout);

module.exports = router;
var Router = require('express');
var router = new Router();
var UserController = require('../controllers/userController');
var RoleController = require('../controllers/roleController');

router.post('/registration', UserController.Registration);
router.post('/login', UserController.Login);
router.get('/auth', UserController.Auth);

module.exports = router;
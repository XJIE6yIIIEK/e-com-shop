var Router = require('express');
var router = new Router();
var UserController = require('../controllers/userController');
var RoleController = require('../controllers/roleController');
var AuthMiddleware = require('../middleware/authMiddleware');
var RoleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration', UserController.Registration);
router.post('/login', UserController.Login);
router.get('/auth', AuthMiddleware, UserController.Auth);

router.post('/role', RoleMiddleware(['admin']), RoleController.Create);

module.exports = router;
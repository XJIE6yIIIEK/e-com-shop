var Router = require('express');
var router = new Router();
var UserController = require('../controllers/userController');
var RoleController = require('../controllers/roleController');
var AuthMiddleware = require('../middleware/authMiddleware');
var RoleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
//router.get('/auth', AuthMiddleware, UserController.auth);
router.get('/auth', UserController.auth);

//router.post('/role', RoleMiddleware(['admin']), RoleController.create);
router.post('/role', RoleController.create);
router.delete('/role/:name', RoleController.delete);
router.patch('/role/:name', RoleController.patch);

router.post('/:n_user/role', RoleController.addToUser);
router.delete('/:n_user/role', RoleController.deleteFromUser);

module.exports = router;
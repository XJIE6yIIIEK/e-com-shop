var Router = require('express');
var router = new Router();
var OrderController = require('../controllers/orderController');

router.post('/', OrderController.create);
router.patch('/:n_order', OrderController.patch);
router.delete('/:n_order', OrderController.delete);
router.get('/user/:n_user', OrderController.getAll);
router.get('/:n_order', OrderController.get);

module.exports = router;
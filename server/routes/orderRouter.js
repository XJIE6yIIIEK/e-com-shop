var Router = require('express');
var router = new Router();
var OrderController = require('../controllers/orderController');

router.post('/', OrderController.create);
router.patch('/:order_id', OrderController.patch);
router.delete('/:order_id', OrderController.delete);
router.get('/user/:user_id', OrderController.getAll);
router.get('/:order_id', OrderController.get);

module.exports = router;
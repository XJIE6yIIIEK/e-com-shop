var Router = require('express');
var router = new Router();
var BascketController = require('../controllers/bascketController');

router.post('/', BascketController.add);
router.patch('/:user_id', BascketController.patch);
router.delete('/:user_id', BascketController.delete);
router.get('/:user_id', BascketController.get);

module.exports = router;
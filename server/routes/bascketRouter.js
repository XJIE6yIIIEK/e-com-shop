var Router = require('express');
var router = new Router();
var BascketController = require('../controllers/bascketController');

router.post('/', BascketController.add);
router.patch('/:n_user', BascketController.patch);
router.delete('/:n_user', BascketController.delete);
router.get('/:n_user', BascketController.get);

module.exports = router;
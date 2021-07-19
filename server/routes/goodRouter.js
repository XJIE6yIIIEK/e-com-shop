var Router = require('express');
var router = new Router();
var GoodController = require('../controllers/goodController');
var RoleMiddleware = require('../middleware/roleMiddleware');

//router.post('/types', RoleMiddleware(['admin']), GoodController.addType);
router.post('/types', GoodController.addType);
//router.delete('/types/:s_name', RoleMiddleware(['admin']), GoodController.deleteType);
router.delete('/types/:s_name', GoodController.deleteType);
router.get('/types', GoodController.getAllTypes);

router.post('/', GoodController.create);
router.get('/', GoodController.getAll);

router.patch('/:id', GoodController.patch);
router.get('/:id', GoodController.get);
router.delete('/:id', GoodController.delete);

router.post('/:n_good/stockpile', GoodController.addToStockpile);
router.patch('/:n_good/stockpile', GoodController.patchInStockpile);
router.delete('/:n_good/stockpile', GoodController.deleteFromStockpile);

module.exports = router;
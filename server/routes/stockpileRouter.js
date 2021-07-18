var Router = require('express');
var router = new Router();
var StockpileController = require('../controllers/stockpileController');

router.post('/', StockpileController.create);
router.patch('/:s_name', StockpileController.patch);
router.delete('/:s_name', StockpileController.delete);
router.get('/', StockpileController.getAll);
router.get('/:s_name', StockpileController.get);

module.exports = router;
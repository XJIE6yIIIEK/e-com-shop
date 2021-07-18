var Router = require('express');
var router = new Router();
var AssembToysController = require('../controllers/assembToysController');
var AssembToysManufacturController = require('../controllers/assembToysManufacturController');

router.post('/', AssembToysController.create);
router.patch('/:n_articul', AssembToysController.patch);
router.delete('/:n_articul', AssembToysController.delete);
router.get('/:n_articul', AssembToysController.get);
router.get('/', AssembToysController.getAll);

router.post('/sizes', AssembToysController.createSize);
router.delete('/sizes/:s_name', AssembToysController.deleteSize);
router.get('/sizes', AssembToysController.getAllSizes);

router.post('/manufacturs', AssembToysManufacturController.create);
router.patch('/manufacturs/:s_name', AssembToysManufacturController.patch);
router.delete('/manufacturs/:s_name', AssembToysManufacturController.delete);
router.get('/manufacturs/:s_name', AssembToysManufacturController.get);
router.get('/manufacturs', AssembToysManufacturController.getAll);

module.exports = router;
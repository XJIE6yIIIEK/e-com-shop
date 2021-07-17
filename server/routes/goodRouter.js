var Router = require('express');
var router = new Router();
var GoodController = require('../controllers/goodController');
var RoleMiddleware = require('../middleware/roleMiddleware');

router.post('/types', RoleMiddleware(['admin']), GoodController.AddType);
router.delete('/types/:s_name', RoleMiddleware(['admin']), GoodController.DeleteType);
router.get('/types', GoodController.GetAllTypes);

router.post('/', GoodController.Create);
router.get('/', GoodController.GetAll);

router.patch('/:id', GoodController.Patch);
router.get('/:id', GoodController.Get);
router.delete('/:id', GoodController.Delete);

module.exports = router;
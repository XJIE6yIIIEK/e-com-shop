var Router = require('express');
var router = new Router();

var AssembToysRouter = require('./assembToysRouter');
var BascketRouter = require('./bascketRouter');
var GoodRouter = require('./goodRouter');
var OrderRouter = require('./orderRouter');
var StockpileRouter = require('./stockpileRouter');
var UserRouter = require('./userRouter');

router.use('/user', UserRouter);
router.use('/stockpile', StockpileRouter);
router.use('/order', OrderRouter);
router.use('/good', GoodRouter);
router.use('/bascket', BascketRouter);
router.use('/assemb_toys', AssembToysRouter);

module.exports = router;
var Router = require('express');
var router = new Router();

var assembToysRouter = require('./assembToysRouter');
var bascketRouter = require('./bascketRouter');
var goodRouter = require('./goodRouter');
var orderRouter = require('./orderRouter');
var stockpileRouter = require('./stockpileRouter');
var userRouter = require('./userRouter');

router.use('/user', userRouter);
router.use('/stockpile', stockpileRouter);
router.use('/order', orderRouter);
router.use('/good', goodRouter);
router.use('/bascket', bascketRouter);
router.use('/assemb_toys', assembToysRouter);

module.exports = router;
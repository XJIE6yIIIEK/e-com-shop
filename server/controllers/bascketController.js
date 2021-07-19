var ErrorHandler = require('../error_handler/errorHandler');
var {Basckets} = require('../models/models');
var sequelize = require('../db');

class BascketController {
    async add(req, res, next) {
        try{
            var {n_user, n_good, n_amount} = req.body;

            if(req.user.id != n_user){
                return next(ErrorHandler.forbidden('Указан неверный пользователь'));
            }
            
            var createdBascket = await Basckets.create({
                n_user: n_user,
                n_good: n_good,
                n_amount: n_amount
            });

            return res.status(200).json(createdBascket);
        } catch(e) {
            next(e);
        }
    }

    async patch(req, res, next) {
        try{
            var {n_user} = req.params;
            var {n_good, n_amount} = req.body;

            if(req.user.id != n_user){
                return next(ErrorHandler.forbidden('Указан неверный пользователь'));
            }

            var patchedGoodInBascket = await Basckets.findOne({
                where: {
                    n_good: n_good,
                    n_user: n_user
                }
            });

            if(n_amount){
                patchedGoodInBascket.n_amount = n_amount;
            }

            patchedGoodInBascket.save();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try{
            var {n_user, n_good} = req.params;

            if(req.user.id != n_user){
                return next(ErrorHandler.forbidden('Указан неверный пользователь'));
            }

            var condition = {
                where: {
                    n_user: n_user
                }
            };

            var deletededGoodsInBascket;

            if(n_good){
                condition.where.n_good = n_good;
                deletededGoodsInBascket = await Basckets.findAll(condition);
            } else {
                deletededGoodsInBascket = await Basckets.findOne(condition);
            }

            deletededGoodsInBascket.destroy();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try{
            var {n_user} = req.params;

            if(req.user.id != n_user){
                return next(ErrorHandler.forbidden('Указан неверный пользователь'));
            }

            var getBascketSumQuery = `SELECT sum(t_goods.f_price * t_basckets.n_amount) AS f_summa FROM t_basckets ` +
                                    `JOIN t_goods ` +
                                    `ON t_goods.id = t_basckets.n_good ` +
                                    `WHERE t_basckets.n_user = ${n_user}`;
            var bascketSum = await sequelize.query(getBascketSumQuery);
            bascketSum = bascketSum[0];

            var goodsInBascket = await Basckets.findAll({
                attributes: ['n_good','n_amount'],
                where: {
                    n_user: n_user
                }
            });

            var bascket = {
                sum: bascketSum.f_summa,
                goods: goodsInBascket
            };

            return res.status(200).json(bascket);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new BascketController();
const {Sequelize} = require('sequelize');
var ErrorHandler = require('../error_handler/errorHandler');
var {Basckets} = require('../models/models');
var sequelize = require('../db');

class BascketController {
    async add(req, res) {
        var {n_user, n_good, n_amount} = req.body;
        
        var createdBascket = await Basckets.create({
            n_user: n_user,
            n_good: n_good,
            n_amount: n_amount
        });

        return res.json(createdBascket);
    }

    async patch(req, res) {
        var {n_user} = req.params;
        var {n_good, n_amount} = req.body;

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
        return res.json({succesfull: true});
    }

    async delete(req, res) {
        var {n_user} = req.params;
        var {n_good} = req.body;

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
        return res.json({succesfull: true});
    }

    async get(req, res) {
        var {n_user} = req.params;

        var getBascketSumQuery = `SELECT sum(t_goods.f_price * t_basckets.n_amount) AS f_summa FROM t_basckets ` +
                                 `JOIN t_goods ` +
                                 `ON t_goods.id = t_basckets.n_good ` +
                                 `WHERE t_basckets.n_user = ${n_user}`;
        var bascketSum = await sequelize.query(getBascketSumQuery);
        bascketSum = bascketSum[0];

        var bascket = {
            sum: bascketSum.f_summa,
            goods: []
        };

        var goodsInBascket = await Basckets.findAll({
            where: {
                n_user: n_user
            }
        });

        goodsInBascket.forEach(good => {
            bascket.goods[bascket.goods.length] = {
                n_good: good.n_good,
                n_amount: good.n_amount
            }
        });

        return res.json(bascket);
    }
}

module.exports = new BascketController();
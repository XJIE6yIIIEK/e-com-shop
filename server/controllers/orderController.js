var ErrorHandler = require('../error_handler/errorHandler');
var {Orders} = require('../models/models');
var {GoodsToOrders} = require('../models/models');
var {Basckets} = require('../models/models');
var {Sequelize} = require('sequelize');
var sequelize = require('../db');

class OrderController {
    async create(req, res) {
        var {user_id} = req.body;

        var goodsInBascket = await Basckets.findAll({
            where: {
                n_user: user_id
            }
        });

        var createdOrder = await Orders.create({
            n_user: user_id,
            d_ordering_date: Sequelize.literal('CURRENT_TIMESTAMP')
        });

        for(var i = 0; i < goodsInBascket.length; i++){
            var addGoodToOrder = await GoodsToOrders.create({
                n_good: goodsInBascket[i].n_good,
                n_order: createdOrder.id,
                n_amount: goodsInBascket[i].n_amount
            });

            goodsInBascket[i].destroy();
        }

        return res.json(createdOrder);
    }

    async delete(req, res) {
        var {order_id} = req.params;

        var goodsInOrders = await GoodsToOrders.findAll({
            where: {
                n_order: order_id
            }
        });

        for(var i = 0; i < goodsInOrders.length; i++){
            goodsInOrders[i].destroy();
        }

        var order = await Orders.findOne({
            where: {
                id: order_id
            }
        });

        order.destroy();

        return res.json({success: true});
    }

    async patch(req, res) {
        var {order_id} = req.params;

        var order = await Orders.findOne({
            where: {
                id: order_id
            }
        });

        if(d_receipt_date){
            order.d_receipt_date = Sequelize.literal('CURRENT_TIMESTAMP');
        }

        await order.save();
        return res.json({succesfull: true});
    }

    async getAll(req, res) {
        var {user_id} = req.params;

        var orders = await Orders.findAll({
            where: {
                n_user: user_id
            }
        });

        return res.json(orders);
    }

    async get(req, res) {
        var {order_id} = req.params;

        var getOrderQuery = `WITH t_order_sum AS ( ` +
                            `   SELECT sum(t_goods.f_price * t_goods_to_orders.n_amount) AS f_summa, ${order_id} AS n_order FROM t_goods_to_orders ` +
                            `   JOIN t_goods ` +
                            `   ON t_goods.id = t_goods_to_orders.n_good ` +
                            `   WHERE t_goods_to_orders.n_order = ${order_id} ` +
                            `) ` +
                            `SELECT t_orders.*, t_order_sum.f_summa AS f_total FROM t_orders ` +
                            `JOIN t_order_sum ` +
                            `ON t_order_sum.n_order = t_orders.id ` +
                            `WHERE t_orders.id = ${order_id}`;
        
        var order = await sequelize.query(getOrderQuery);
        order = order[0][0];

        return res.json(order);
    }
}

module.exports = new OrderController();
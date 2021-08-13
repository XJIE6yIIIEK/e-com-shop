var ErrorHandler = require('../error_handler/errorHandler');
var {Orders, GoodsToOrders, Basckets, AssembToys, AssembToysManufacturs, GoodsTypes, Goods} = require('../models/models');
var {Sequelize} = require('sequelize');
var sequelize = require('../db');
var MailServiceController = require('./mailServiceController');

class OrderController {
    async getOrderInformation(n_order){
        var goodsInOrder = await GoodsToOrders.findAll({
            where: {
                n_order: n_order
            }
        });

        var totalPrice = 0;
        var goods = [];

        for(var i = 0; i < goodsInOrder.length; i++){
            var good = await Goods.findOne({
                where: {
                    id: goodsInOrder[i].n_good
                }
            });

            var goodType = await GoodsTypes.findOne({
                where: {
                    s_id: good.s_type
                }
            });

            var goodInfo = {};

            switch(good.s_type){
                case 'assemb_toy': {
                    goodInfo = await AssembToys.findOne({
                        where: {
                            n_articul: goodsInOrder[i].n_good
                        }
                    });

                    var assembToyManufacturInfo = await AssembToysManufacturs.findOne({
                        where: {
                            id: goodInfo.n_manufactur
                        }
                    });

                    goodInfo.s_manufactur = assembToyManufacturInfo.s_name;
                } break;
            }

            goods[i] = {
                articul: goodsInOrder[i].n_good,
                name: `${goodInfo.s_manufactur} ${goodInfo.s_model}`,
                price: good.f_price,
                amount: goodsInOrder[i].n_amount,
                type: goodType.s_name
            };

            totalPrice += goods[i].price * goods[i].amount;
        }

        var order = {
            order_id: n_order,
            total_price: totalPrice,
            items: goods
        };

        return order;
    }

    async create(req, res, next) {
        try{
            var {n_user} = req.body;

            if(req.user.id != n_user){
                return next(ErrorHandler.forbidden('Указан неверный пользователь'));
            }

            //Проверяем наличие товаров в корзине пользователя
            var goodsInBascket = await Basckets.findAll({
                where: {
                    n_user: n_user
                }
            });

            if(goodsInBascket.length == 0){
                return next(ErrorHandler.badRequest('Корзина пуста'));
            }

            //Создание заказа:
            //1. Добавляем заказа в БД.
            //2. Добавляем товары к заказу.
            //3. Как только товар был добавлен, удаляем его из корзины пользователя.
            var createdOrder = await Orders.create({
                n_user: n_user,
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

            var order = await this.getOrderInformation(createdOrder.id);

            //Отправляем письмо с заказом по почте
            MailServiceController.sendOrderDetails(order, n_user);

            return res.status(200).json(createdOrder);
        } catch(e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try{
            var {n_order} = req.params;

            var goodsInOrders = await GoodsToOrders.findAll({
                where: {
                    n_order: n_order
                }
            });

            var order = await Orders.findOne({
                attributes: ['n_user'],
                where: {
                    id: n_order
                }
            });

            if(req.user.id != order.n_user){
                return next(ErrorHandler.forbidden('Указан неверный пользователь'));
            }

            for(var i = 0; i < goodsInOrders.length; i++){
                goodsInOrders[i].destroy();
            }

            var order = await Orders.findOne({
                where: {
                    id: n_order
                }
            });

            order.destroy();

            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async patch(req, res, next) {
        try{
            var {n_order} = req.params;

            var order = await Orders.findOne({
                attributes: ['n_user'],
                where: {
                    id: n_order
                }
            });

            if(req.user.id != order.n_user){
                return next(ErrorHandler.forbidden('Указан неверный пользователь'));
            }

            var order = await Orders.findOne({
                where: {
                    id: n_order
                }
            });

            if(d_receipt_date){
                order.d_receipt_date = Sequelize.literal('CURRENT_TIMESTAMP');
            }

            await order.save();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try{
            var {n_user} = req.params;

            if(req.user.id != order.n_user){
                return next(ErrorHandler.forbidden('Указан неверный пользователь'));
            }

            var orders = await Orders.findAll({
                where: {
                    n_user: n_user
                }
            });

            return res.status(200).json(orders);
        } catch(e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try{
            var {n_order} = req.params;
            var orderInfo = await Orders.findOne({
                where: {
                    id: n_order
                }
            });

            if(req.user.id != orderInfo.n_user){
                return next(ErrorHandler.forbidden('Указан неверный пользователь'));
            }

            var order = await this.getOrderInformation(n_order);

            return res.status(200).json(order);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new OrderController();
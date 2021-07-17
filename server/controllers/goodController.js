var {Op} = require('sequelize');
var ErrorHandler = require('../error_handler/errorHandler');
var {goods_to_orders} = require('../models/models');
var {goods} = require('../models/models');
var {goods_to_stockpiles} = require('../models/models');
var {goods_types} = require('../models/models');

class GoodsController {
    async Create(req, res) {
        var {s_type, f_price} = req.body;
        var created_good = await goods.create({s_type, f_price});
        return res.json(created_good);
    }

    async Delete(req, res) {
        var {id} = req.params;
        var selected_good = await goods.findOne({
            where: {
                id: id
            }
        });
        await selected_good.destroy();
        return res.json({succesfull: true});
    }

    async Patch(req, res) {
        var {s_type, f_price} = req.body;
        var {id} = req.params;

        var good = await goods.findOne({
            where: {
                id: id
            }
        });

        if(s_type){
            good.s_type = s_type;
        }

        if(f_price){
            good.f_price = f_price;
        }

        await good.save();
        return res.json({succesfull: true});
    }

    async AddToStockpile(req, res) {

    }

    async DeleteFromStockpile(req, res) {

    }

    async AddToOrder(req, res) {

    }

    async AddType(req, res) {
        var {s_name} = req.params;
        var created_type = await goods_types.create({s_name});
        return res.json(created_type);
    }

    async DeleteType(req, res) {
        var {s_name} = req.body;
        var deleated_type = await goods_types.findOne({
            where:{
                s_name: s_name
            }
        });
        await deleated_type.destroy();
        return res.json({succesfull: true});
    }

    async GetAllTypes(req, res) {
        var types = await goods_types.findAll();
        return res.json(types);
    }

    async GetAll(req, res) {
        var {curPage, lim, type, gr_th, sm_th, ordr, asc} = req.query;

        curPage = curPage - 1 || 0;
        lim = lim || 10;
        ordr = ordr || 'id';

        if(asc){
            asc = (asc === 'true' ? true : false);
        } else {
            asc = true;
        }

        var condition = {
            where: {
                
            },
            offset: curPage * lim,
            limit: lim
        };

        if(type) {
            if (!condition.where[Op.and]) {
                condition.where[Op.and] = [];
            }

            condition.where[Op.and][condition.where[Op.and].length] = {
                s_type: type
            }

            console.log(type);
        }

        if(gr_th) {
            if (!condition.where[Op.and]) {
                condition.where[Op.and] = [];
            }

            if(!'f_price' in condition.where[Op.and][condition.where[Op.and].length - 1]){
                condition.where[Op.and][condition.where[Op.and].length] = {
                    f_price: {
                        [Op.gte]: gr_th
                    }
                }
            } else {
                condition.where[Op.and][condition.where[Op.and].length - 1].f_price[Op.gte] = gr_th;
            }
        }

        if(sm_th) {
            if (!condition.where[Op.and]) {
                condition.where[Op.and] = [];
            }

            if(!'f_price' in condition.where[Op.and][condition.where[Op.and].length - 1]){
                condition.where[Op.and][condition.where[Op.and].length] = {
                    f_price: {
                        [Op.lte]: sm_th
                    }
                }
            } else {
                condition.where[Op.and][condition.where[Op.and].length - 1].f_price[Op.lte] = gr_th;
            }
        }

        if(ordr) {
            condition.order = [];
            condition.order[condition.order.length] = [ordr, (asc == true ? 'ASC' : 'DESC')];
        }

        var selected_goods = await goods.findAll(condition);
        return res.json(selected_goods);
    }

    async Get(req, res) {
        var {id} = req.params;
        var selected_good = await goods.findOne({
            where: {
                id: id
            }
        });

        return res.json(selected_good);
    }
}

module.exports = new GoodsController();
var {Op} = require('sequelize');
var ErrorHandler = require('../error_handler/errorHandler');
var {Goods} = require('../models/models');
var {GoodsToStockpiles} = require('../models/models');
var {GoodsTypes} = require('../models/models');

class GoodsController {
    async create(req, res) {
        var {s_type, f_price} = req.body;
        var createdGood = await Goods.create({s_type, f_price});
        return res.json(createdGood);
    }

    async delete(req, res) {
        var {id} = req.params;
        var selectedGood = await Goods.findOne({
            where: {
                id: id
            }
        });
        await selectedGood.destroy();
        return res.json({succesfull: true});
    }

    async patch(req, res) {
        var {s_type, f_price} = req.body;
        var {id} = req.params;

        var good = await Goods.findOne({
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

    async addToStockpile(req, res) {
        var {n_good} = req.params;
        var {s_stockpile, n_amount} = req.body;

        var addedGoodToStockpile = await GoodsToStockpiles.create({
            n_good: n_good,
            s_stockpile: s_stockpile,
            n_amount: n_amount
        });

        return res.json(addedGoodToStockpile);
    }

    async deleteFromStockpile(req, res) {
        var {n_good} = req.params;
        var {s_stockpile} = req.body;

        var deletedGoodFromStockpile = await GoodsToStockpiles.findOne({
            where: {
                n_good: n_good,
                s_stockpile: s_stockpile
            }
        });

        deletedGoodFromStockpile.destroy();
        return res.json({succesfull: true});
    }

    async patchInStockpile(req, res){
        var {n_good} = req.params;
        var {s_stockpile, n_amount} = req.body;

        var patchedGoodInStockpile = await GoodsToStockpiles.findOne({
            where: {
                n_good: n_good,
                s_stockpile: s_stockpile
            }
        });

        if(n_amount){
            patchedGoodInStockpile.n_amount = n_amount;
        }

        patchedGoodInStockpile.save();
        return res.json({succesfull: true});
    }

    async addType(req, res) {
        console.log('ADD TYPE');
        var {s_name} = req.body;
        var createdType = await GoodsTypes.create({s_name});
        return res.json(createdType);
    }

    async deleteType(req, res) {
        var {s_name} = req.params;
        var deleatedType = await GoodsTypes.findOne({
            where:{
                s_name: s_name
            }
        });
        await deleatedType.destroy();
        return res.json({succesfull: true});
    }

    async getAllTypes(req, res) {
        var types = await GoodsTypes.findAll();
        return res.json(types);
    }

    async getAll(req, res) {
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

        var selectedGoods = await Goods.findAll(condition);
        return res.json(selectedGoods);
    }

    async get(req, res) {
        var {id} = req.params;
        var selectedGood = await Goods.findOne({
            where: {
                id: id
            }
        });

        return res.json(selectedGood);
    }
}

module.exports = new GoodsController();
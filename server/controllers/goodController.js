var {Op} = require('sequelize');
var ErrorHandler = require('../error_handler/errorHandler');
var {Goods} = require('../models/models');
var {GoodsToStockpiles} = require('../models/models');
var {GoodsTypes} = require('../models/models');

class GoodsController {
    async create(req, res, next) {
        try{
            var {s_type, f_price} = req.body;
            var createdGood = await Goods.create({s_type, f_price});
            return res.status(200).json(createdGood);
        } catch(e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try{
            var {id} = req.params;
            var selectedGood = await Goods.findOne({
                where: {
                    id: id
                }
            });
            await selectedGood.destroy();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async patch(req, res, next) {
        try{
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
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async addToStockpile(req, res, next) {
        try{
            var {id, n_stockpile} = req.params;
            var {n_amount} = req.body;

            var addedGoodToStockpile = await GoodsToStockpiles.create({
                n_good: id,
                n_stockpile: n_stockpile,
                n_amount: n_amount
            });

            return res.status(200).json(addedGoodToStockpile);
        } catch(e) {
            next(e);
        }
    }

    async deleteFromStockpile(req, res, next) {
        try{
            var {id, n_stockpile} = req.params;

            var deletedGoodFromStockpile = await GoodsToStockpiles.findOne({
                where: {
                    n_good: id,
                    n_stockpile: n_stockpile
                }
            });

            deletedGoodFromStockpile.destroy();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async patchInStockpile(req, res, next){
        try{
            var {id, n_stockpile} = req.params;
            var {n_amount} = req.body;

            var patchedGoodInStockpile = await GoodsToStockpiles.findOne({
                where: {
                    n_good: id,
                    n_stockpile: n_stockpile
                }
            });

            if(n_amount){
                patchedGoodInStockpile.n_amount = n_amount;
            }

            patchedGoodInStockpile.save();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async addType(req, res, next) {
        try{
            var {s_id, s_name} = req.body;
            var createdType = await GoodsTypes.create({s_id, s_name});
            return res.status(200).json(createdType);
        } catch(e) {
            next(e);
        }
    }

    async deleteType(req, res, next) {
        try{
            var {s_id} = req.params;
            var deleatedType = await GoodsTypes.findOne({
                where:{
                    s_id: s_id
                }
            });
            await deleatedType.destroy();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async getAllTypes(req, res, next) {
        try{
            var types = await GoodsTypes.findAll();
            return res.status(200).json(types);
        } catch(e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try{
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
            return res.status(200).json(selectedGoods);
        } catch(e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try{
            var {id} = req.params;
            var selectedGood = await Goods.findOne({
                where: {
                    id: id
                }
            });

            return res.status(200).json(selectedGood);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new GoodsController();
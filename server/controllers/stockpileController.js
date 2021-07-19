var ErrorHandler = require('../error_handler/errorHandler');
var {Stockpiles} = require('../models/models');
var {GoodsToStockpiles} = require('../models/models');

class StockpileController {
    async create(req, res, next) {
        try{
            var {s_name, s_address, s_phone_number} = req.body;
            
            if(!s_name){
                next(ErrorHandler.badRequest('Не указано имя склада'));
            }

            var created_stockpile = await Stockpiles.create({s_name, s_address, s_phone_number});
            return res.status(200).json(created_stockpile);
        } catch(e){
            next(e);
        }
    }

    async patch(req, res, next) {
        try{
            var {s_address, s_phone_number, s_name} = req.body;
            var {id} = req.params;

            var stockpile = await Stockpiles.findOne({
                where: {
                    id: id
                }
            });

            if(s_name){
                stockpile.s_name = s_name;
            }

            if(s_address){
                stockpile.s_address = s_address;
            }

            if(s_phone_number){
                stockpile.s_phone_number = s_phone_number;
            }

            await stockpile.save();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try{
            var {id} = req.params;
            var deleatedStockpile = await Stockpiles.findOne({
                where:{
                    id: id
                }
            });

            await deleatedStockpile.destroy();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try{
            var {curPage, lim} = req.query;

            curPage = curPage - 1 || 0;
            lim = lim || 10;

            var condition = {
                offset: curPage * lim,
                limit: lim
            };

            var selectedStockpile = await Stockpiles.findAll(condition);
            return res.status(200).json(selectedStockpile);
        } catch(e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try{
            var {id} = req.params;
            
            var selectedStockpile = await Stockpiles.findOne({
                where: {
                    id: id
                }
            });

            var selectedGoods = await GoodsToStockpiles.findAll({
                attributes: ['n_good', 'n_amount'],
                where:{
                    n_stockpile: id
                }
            });

            selectedStockpile.goods = selectedGoods;

            return res.status(200).json(selectedStockpile);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new StockpileController();
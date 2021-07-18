var ErrorHandler = require('../error_handler/errorHandler');
var {Stockpiles} = require('../models/models');
var {GoodsToStockpiles} = require('../models/models');

class StockpileController {
    async create(req, res) {
        var {s_name, s_address, s_phone_number} = req.body;
        var created_stockpile = await Stockpiles.create({s_name, s_address, s_phone_number});
        return res.json(created_stockpile);
    }

    async patch(req, res) {
        var {s_address, s_phone_number} = req.body;
        var {s_name} = req.params;

        var stockpile = await Stockpiles.findOne({
            where: {
                s_name: s_name
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
        return res.json({succesfull: true});
    }

    async delete(req, res) {
        var {s_name} = req.params;
        var deleatedStockpile = await Stockpiles.findOne({
            where:{
                s_name: s_name
            }
        });

        /*var goodsInStockpile = await GoodsToStockpiles.findAll({
            where:{
                s_stockpile: s_name
            }
        });
        

        await goodsInStockpile.destroy();*/
        await deleatedStockpile.destroy();
        return res.json({succesfull: true});
    }

    async getAll(req, res) {
        var {curPage, lim} = req.query;

        curPage = curPage - 1 || 0;
        lim = lim || 10;

        var condition = {
            offset: curPage * lim,
            limit: lim
        };

        var selectedStockpile = await Stockpiles.findAll(condition);
        return res.json(selectedStockpile);
    }

    async get(req, res) {
        var {s_name} = req.params;
        var selectedStockpile = await Stockpiles.findOne({
            where: {
                s_name: s_name
            }
        });

        return res.json(selectedStockpile);
    }
}

module.exports = new StockpileController();
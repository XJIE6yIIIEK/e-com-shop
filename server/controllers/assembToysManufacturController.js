var ErrorHandler = require('../error_handler/errorHandler');
var {AssembToysManufacturs} = require('../models/models');

class AssembToysManufacturController {
    async create(req, res, next) {
        try{
            var {s_name, s_address, s_phone_number} = req.body;
            var createdAssembToysManufactur = await AssembToysManufacturs.create({s_name, s_address, s_phone_number});
            return res.status(200).json(createdAssembToysManufactur);
        } catch(e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try{
            var {id} = req.params;
            var deletedAssembToyManuf = await AssembToysManufacturs.findOne({
                where: {
                    id: id
                }
            });

            deletedAssembToyManuf.destroy();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async patch(req, res, next) {
        try{
            var {s_name, s_address, s_phone_number} = req.body;
            var {id} = req.params;

            var assembToyManuf = await AssembToysManufacturs.findOne({
                where: {
                    id: id
                }
            });

            if(s_name){
                assembToyManuf.s_name = s_name;
            }

            if(s_address){
                assembToyManuf.s_address = s_address;
            }

            if(s_phone_number){
                assembToyManuf.s_phone_number = s_phone_number;
            }

            await assembToyManuf.save();
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

            var selectedAssembToysManufacturs = await AssembToysManufacturs.findAll(condition);
            return res.status(200).json(selectedAssembToysManufacturs);
        } catch(e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try{
            var {id} = req.params;
            var selectedAssembToysManufacturs = await AssembToysManufacturs.findOne({
                where: {
                    id: id
                }
            });

            return res.status(200).json(selectedAssembToysManufacturs);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new AssembToysManufacturController();
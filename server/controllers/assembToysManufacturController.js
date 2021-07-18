var ErrorHandler = require('../error_handler/errorHandler');
var {AssembToysManufacturs} = require('../models/models');

class AssembToysManufacturController {
    async create(req, res) {
        var {s_name, s_address, s_phone_number} = req.body;
        var createdAssembToysManufactur = await AssembToysManufacturs.create({s_name, s_address, s_phone_number});
        return res.json(createdAssembToysManufactur);
    }

    async delete(req, res) {
        var {s_name} = req.params;
        var deletedAssembToyManuf = await AssembToysManufacturs.findOne({
            where: {
                s_name: s_name
            }
        });

        deletedAssembToyManuf.destroy();
        return res.json({successful: true});
    }

    async patch(req, res) {
        var {s_address, s_phone_number} = req.body;
        var {s_name} = req.params;

        var assembToyManuf = await AssembToysManufacturs.findOne({
            where: {
                s_name: s_name
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

        var selectedAssembToysManufacturs = await AssembToysManufacturs.findAll(condition);
        return res.json(selectedAssembToysManufacturs);
    }

    async get(req, res) {
        var {s_name} = req.params;
        var selectedAssembToysManufacturs = await AssembToysManufacturs.findOne({
            where: {
                s_name: s_name
            }
        });

        return res.json(selectedAssembToysManufacturs);
    }
}

module.exports = new AssembToysManufacturController();
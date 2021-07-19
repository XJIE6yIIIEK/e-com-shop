var ErrorHandler = require('../error_handler/errorHandler');
var {AssembToys} = require('../models/models');
var {AssembToysSizes} = require('../models/models');

class AssembToysController {
    async create(req, res, next) {
        try{
            var {n_manufactur, s_model, n_articul, s_size, n_pieces} = req.body;
            var createdAssembToy = await AssembToys.create({
                n_manufactur: n_manufactur,
                s_model: s_model,
                n_articul: n_articul,
                s_size: s_size,
                n_pieces: n_pieces
            });

            return res.status(200).json(createdAssembToy);
        } catch(e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try{
            var {n_articul} = req.params;
            var deletedAssembToy = await AssembToys.findOne({
                where: {
                    n_articul: n_articul
                }
            });

            deletedAssembToy.destroy();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async patch(req, res, next) {
        try{
            var {n_articul} = req.params;
            var {n_manufactur, s_model, s_size, n_pieces} = req.body;
            var assembToy = await AssembToys.findOne({
                n_articul: n_articul
            });

            if(n_manufactur){
                assembToy.n_manufactur = n_manufactur;
            }

            if(s_model){
                assembToy.s_model = s_model;
            }

            if(s_size){
                assembToy.s_size = s_size;
            }

            if(n_pieces){
                assembToy.n_pieces = n_pieces;
            }

            assembToy.save();

            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async createSize(req, res, next) {
        try{
            var {s_id, s_name} = req.body;
            var createdSize = await AssembToysSizes.create({
                s_id: s_id,
                s_name: s_name
            });

            return res.status(200).json(createdSize);
        } catch(e) {
            next(e);
        }
    }

    async deleteSize(req, res, next){
        try{
            var {s_id} = req.params;
            var selectedSize = await AssembToysSizes.findOne({
                where:{
                    s_id: s_id
                }
            });

            selectedSize.destroy();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async getAllSizes(req, res, next){
        try{
            var selectedSizes = AssembToysSizes.findAll();
            return res.status(200).json(selectedSizes);
        } catch(e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try{
            var {curPage, lim, manuf, gr_th, sm_th, size, ordr, asc} = req.query;

            curPage = curPage - 1 || 0;
            lim = lim || 10;
            ordr = ordr || 's_manufactur';

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

            if(size) {
                if (!condition.where[Op.and]) {
                    condition.where[Op.and] = [];
                }

                condition.where[Op.and][condition.where[Op.and].length] = {
                    s_size: size
                }
            }

            if(manuf) {
                if (!condition.where[Op.and]) {
                    condition.where[Op.and] = [];
                }

                condition.where[Op.and][condition.where[Op.and].length] = {
                    s_manufactur: manuf
                }
            }

            if(gr_th) {
                if (!condition.where[Op.and]) {
                    condition.where[Op.and] = [];
                }

                if(!'n_pieces' in condition.where[Op.and][condition.where[Op.and].length - 1]){
                    condition.where[Op.and][condition.where[Op.and].length] = {
                        n_pieces: {
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

                if(!'n_pieces' in condition.where[Op.and][condition.where[Op.and].length - 1]){
                    condition.where[Op.and][condition.where[Op.and].length] = {
                        n_pieces: {
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

            var selectedAssembToys = await AssembToys.findAll(condition);
            return res.status(200).json(selectedAssembToys);
        } catch(e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try{
            var {n_articul} = req.params;
            var assembToy = AssembToys.findOne({
                where:{
                    n_articul: n_articul
                }
            });

            return res.status(200).json(assembToy);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new AssembToysController();
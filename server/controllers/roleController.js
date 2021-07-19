var ErrorHandler = require('../error_handler/errorHandler');
var SQLErrorHandler = require("../error_handler/sqlErrorHandler");
var {Roles} = require('../models/models');
var {UserToRoles} = require('../models/models');
var {Users} = require('../models/models');

class RoleController {
    async create(req, res, next) {
        try{
            var {s_name} = req.body;

            if(!s_name){
                return next(ErrorHandler.badRequest('Не указано имя роли'));
            }

            var createdRole = await Roles.create({s_name});
            return res.status(200).json(createdRole);
        } catch(e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try{
            var {s_name} = req.params;

            if(!s_name){
                return next(ErrorHandler.badRequest('Не указано имя роли'));
            }

            var selectedRole = await Roles.findOne({
                where: {
                    s_name: s_name
                }
            });

            if(!selectedRole){
                return next(ErrorHandler.badRequest('Роль не найдена'));
            }

            await selectedRole.destroy();
            return res.status(200);
        } catch(e){
            next(e);
        }
    }

    async patch(req, res, next) {
        try{
            var {s_name} = req.params;

            if(!s_name){
                return next(ErrorHandler.badRequest('Не указано имя роли'));
            }
            //var {s_new_name} = req.body;

            var role = await Roles.findOne({
                where: {
                    s_name: s_name
                }
            });

            if(!role){
                return next(ErrorHandler.badRequest('Роль не найдена'));
            }

            /*if(s_new_name){
                role.s_name = s_new_name;
            }*/

            role.save();
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async addToUser(req, res, next) {
        try{
            var {n_user} = req.params;
            var {s_role} = req.body;

            var addedRoleToUser = await UserToRoles.create({
                n_user: n_user,
                s_role: s_role
            });

            return res.status(200).json(addedRoleToUser);
        } catch(e) {
            if(!e){
                next(e);
            } else {
                next(SQLErrorHandler.badRequest(e));
            }
        }
    }

    async deleteFromUser(req, res, next) {
        try{
            var {n_user} = req.params;
            var {s_role} = req.body;

            var deletedRoleToUser = await UserToRoles.findOne({
                where: {
                    n_user: n_user,
                    s_role: s_role
                }
            });
            
            if(!deletedRoleToUser){
                return next(ErrorHandler.badRequest('Неверно указаны роль и/или ID пользователя'));
            }

            deletedRoleToUser.destroy();
            return res.status(200);
        } catch(e) {
            next(e);
        } 
    }
}

module.exports = new RoleController();
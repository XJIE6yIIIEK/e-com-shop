var ErrorHandler = require('../error_handler/errorHandler');
var {Roles} = require('../models/models');
var {UserToRoles} = require('../models/models');

class RoleController {
    async create(req, res) {
        var {s_name} = req.body;
        var createdRole = await Roles.create({s_name});
        return res.json(createdRole);
    }

    async delete(req, res) {
        var {name} = req.params;
        var selectedRole = await Roles.findOne({
            where: {
                s_name: name
            }
        });
        await selectedRole.destroy();
        return res.json({succesfull: true});
    }

    async patch(req, res) {
        var {name} = req.params;
        //var {s_name} = req.body;

        var role = await Roles.findOne({
            where: {
                s_name: name
            }
        });

        /*if(s_name){
            role.s_name = s_name;
        }*/

        role.save();
        return res.json({succesfull: true});
    }

    async addToUser(req, res) {
        var {n_user} = req.params;
        var {s_role} = req.body;

        var addedRoleToUser = await UserToRoles.create({
            n_user: n_user,
            s_role: s_role
        });

        return res.json(addedRoleToUser);
    }

    async deleteFromUser(req, res) {
        var {n_user} = req.params;
        var {s_role} = req.body;

        var deletedRoleToUser = await UserToRoles.findOne({
            where: {
                n_user: n_user,
                s_role: s_role
            }
        });

        deletedRoleToUser.destroy();
        return res.json({succesfull: true});
    }
}

module.exports = new RoleController();
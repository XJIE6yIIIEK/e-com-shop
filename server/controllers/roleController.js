var ErrorHandler = require('../error_handler/errorHandler');
var {roles} = require('../models/models');
var {user_to_roles} = require('../models/models');

class RoleController {
    async Create(req, res) {
        var {s_name} = req.body;
        var created_role = await roles.create({s_name});
        return res.json(created_role);
    }

    async Delete(req, res) {
        var {name} = req.params;
        var selected_role = await roles.findOne({
            where: {
                s_name: name
            }
        });
        await selected_role.destroy();
        return res.json({succesfull: true});
    }

    async Patch(req, res) {

    }

    async AddToUser(req, res) {

    }

    async DeleteFromUser(req, res) {

    }
}

module.exports = new RoleController();
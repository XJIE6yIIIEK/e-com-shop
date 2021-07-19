var bcrypt = require('bcrypt');
var {Users} = require('./models/models');
var {UserToRoles} = require('./models/models');
var {Roles} = require('./models/models');

module.exports = async (sequelize) => {
    if(sequelize == null){
        return;
    }

    var admin = await UserToRoles.findOne({
        where: {
            s_role: 'admin'
        }
    });

    if(admin){
        return;
    }

    var createdRole = await Roles.create({
        s_id: 'admin',
        s_name: 'Администратор'
    });

    var createdRole = await Roles.create({
        s_id: 'user',
        s_name: 'Пользователь'
    });

    var createdUser = await Users.create({
        id: 1,
        s_name: 'Admin',
        e_mail: process.env.ADMIN_EMAIL,
        s_hash_password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 3)
    });

    await sequelize.query(`SELECT setval('t_users_id_seq', (SELECT MAX(id) from "t_users"));`);

    var createRoleToUser = await UserToRoles.create({
        n_user: 1,
        s_role: 'admin'
    });
}
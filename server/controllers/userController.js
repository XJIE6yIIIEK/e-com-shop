var ErrorHandler = require('../error_handler/errorHandler');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var {users} = require('../models/models');
var {user_to_roles} = require('../models/models');


var generateJWT = (id, e_mail, roles) => {
    return jwt.sign(
        {id: id, e_mail: e_mail, roles: roles},
        process.env.JWT_SECRET_KEY,
        {expiresIn: '24h'}
    );
}

class UserController {
    async Registration(req, res, next){
        var {e_mail, s_password} = req.body;

        if(!e_mail || !s_password){
            return next(ErrorHandler.BadRequest('Incorrect e-mail or password'));
        }

        var user_candidate = await users.findOne({
            where: {
                e_mail: e_mail
            }
        });

        if(user_candidate){
            return next(ErrorHandler.BadRequest('User witch this e-mail is already registered'));
        }

        var hashPassword = await bcrypt.hash(s_password, 3);

        var created_user = await users.create({
            s_hash_password: hashPassword,
            e_mail: e_mail
        });

        var created_role_for_user = await user_to_roles.create({
            n_user: created_user.id,
            s_role: 'user'
        });

        var token = generateJWT(created_user.id, e_mail, [created_role_for_user.s_role]);
        return res.json({token});
    }

    async Login(req, res, next){
        var {e_mail, s_password} = req.body;
        
        var user = await users.findOne({
            where: {
                e_mail: e_mail
            }
        });

        if(!user){
            return next(ErrorHandler.BadRequest('User don`t found'));
        }

        var correctPassword = bcrypt.compareSync(s_password, user.s_hash_password);
        if(!correctPassword){
            return next(ErrorHandler.BadRequest('Incorrect password'));
        }

        var user_roles = await user_to_roles.findAll({
            where: {
                n_user: user.id
            }
        });

        var roles = [];
        user_roles.forEach(role => roles[roles.length] = role.s_role);
        
        var token = generateJWT(user.id, e_mail, roles);
        return res.json({token});
    }

    async Auth(req, res, next){
        var token = generateJWT(req.user.id, req.user.e_mail, req.user.roles);
        return res.json({token});
    }
}

module.exports = new UserController();
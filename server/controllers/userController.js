var ErrorHandler = require('../error_handler/errorHandler');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var {validationResult} = require('express-validator');
var {Users} = require('../models/models');
var {UserToRoles} = require('../models/models');


var generateJWT = (id, e_mail, roles) => {
    return jwt.sign(
        {id: id, e_mail: e_mail, roles: roles},
        process.env.JWT_SECRET_KEY,
        {expiresIn: '24h'}
    );
}

class UserController {
    async registration(req, res, next){
        try{
            var validationErrors = validationResult(req);

            if(!validationErrors.isEmpty()){
                return next(ErrorHandler.badRequest('Неправильные email, пароль или имя пользователя', validationErrors));
            }

            var {e_mail, s_password, s_name} = req.body;

            var userEmailCandidate = await Users.findOne({
                where: {
                    e_mail: e_mail
                }
            });

            if(userEmailCandidate){
                return next(ErrorHandler.badRequest('Пользователь с таким email уже существует'));
            }

            var userNameCandidate = await Users.findOne({
                where: {
                    s_name: s_name
                }
            });

            if(userNameCandidate){
                return next(ErrorHandler.badRequest('Пользователь с таким именем уже существует'));
            }

            var hashPassword = await bcrypt.hash(s_password, 3);

            var createdUser = await Users.create({
                s_hash_password: hashPassword,
                e_mail: e_mail,
                s_name: s_name
            });

            var createdRoleForUser = await UserToRoles.create({
                n_user: createdUser.id,
                s_role: 'user'
            });

            var token = generateJWT(createdUser.id, e_mail, [createdRoleForUser.s_role]);
            return res.status(200).json({token});
        } catch(e) {
            next(e);
        }
    }

    async login(req, res, next){
        try{
            var {e_mail, s_password} = req.body;
            
            var user = await Users.findOne({
                where: {
                    e_mail: e_mail
                }
            });

            if(!user){
                return next(ErrorHandler.badRequest('Пользователь не найден'));
            }

            var correctPassword = bcrypt.compareSync(s_password, user.s_hash_password);
            if(!correctPassword){
                return next(ErrorHandler.badRequest('Неправильный пароль'));
            }

            var userRoles = await UserToRoles.findAll({
                where: {
                    n_user: user.id
                }
            });

            var roles = [];
            userRoles.forEach(role => roles[roles.length] = role.s_role);
            
            var token = generateJWT(user.id, e_mail, roles);
            return res.status(200).json({token});
        } catch(e) {
            next(e);
        }
    }

    async auth(req, res, next){
        try {
            var token = generateJWT(req.user.id, req.user.e_mail, req.user.roles);
            return res.status(200).json({token});
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new UserController();
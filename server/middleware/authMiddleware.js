var jwt = require('jsonwebtoken');
var ErrorHandler = require('../error_handler/errorHandler');

module.exports = function(req, res, next) {
    if(req.method == "OPTIONS"){
        next();
    }
    try{
        var token = req.headers.authorization.split(' ')[1];
        if(!token){
            return next(ErrorHandler.unauthorized('Пользователь не авторизован'));
        }

        var decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch(e){
        next(e);
    }
}
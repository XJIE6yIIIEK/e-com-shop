var jwt = require('jsonwebtoken')

module.exports = function(roles) {
    return function(req, res, next){
        if(req.method == "OPTIONS"){
            next();
        }
        try{
            var token = req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(401).json({message: 'Unauthorized'});
            }

            var decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            var roleFlag = false;

            for(var i = 0; i < roles.length; i++){
                if(decodedToken.roles.indexOf(roles[i]) >= 0){
                    roleFlag = true;
                    break;
                }
            }

            if(!roleFlag){
                return res.status(403).json({message: 'Forbidden'});
            }

            req.user = decodedToken;
            next();
        } catch(e){
            res.status(401).json({message: 'Unauthorized'});
        }
    }
}
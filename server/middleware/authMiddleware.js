var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    if(req.method == "OPTIONS"){
        next();
    }
    try{
        var token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message: 'Unauthorized'});
        }

        var decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch(e){
        return res.status(401).json({message: 'Unauthorized'});
    }
}
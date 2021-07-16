var ErrorHandler = require('../error_handler/errorHandler');

module.exports = function(err, req, res, next) {
    if(err instanceof ErrorHandler){
        res.status(err.status).json({message: err.message});
    }

    
}
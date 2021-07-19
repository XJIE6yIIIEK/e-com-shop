class SQLErrorHandler extends Error {
    status;
    message;

    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(error) {
        var message;

        if(error.parent.code == 23503){
            message = ''
        }

        return new SQLErrorHandler(402, message, error);
    }
}

module.exports = SQLErrorHandler;
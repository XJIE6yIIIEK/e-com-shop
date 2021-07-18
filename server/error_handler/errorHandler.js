class ErrorHandler extends Error {
    status;
    message;

    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        return new ErrorHandler(404, message);
    }

    static internal(message) {
        return new ErrorHandler(500, message);
    }

    static forbidden(message) {
        return new ErrorHandler(403, message);
    }
}

module.exports = ErrorHandler;
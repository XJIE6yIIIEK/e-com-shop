class ErrorHandler extends Error {
    status;
    message;

    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static BadRequest(message) {
        return new ErrorHandler(404, message);
    }

    static Internalt(message) {
        return new ErrorHandler(500, message);
    }

    static Forbidden(message) {
        return new ErrorHandler(403, message);
    }
}

module.exports = ErrorHandler;
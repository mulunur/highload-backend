class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static userError(message) {
        return new ApiError(400, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

const ErrorHandler = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}

module.exports = {
    ErrorHandler, ApiError
}

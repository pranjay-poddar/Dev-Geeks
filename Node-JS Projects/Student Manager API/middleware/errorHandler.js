function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode) {
        case 404:
            res.json({ title:"Student Not Found", message: err.message, stackTrace: err.stack});
            break;
        case 500:
            res.json({ title:"Server Error", message: err.message, stackTrace: err.stack});
            break;
        default:
            console.log("No Error All Good!!");
    }
    next();
}

module.exports = errorHandler;
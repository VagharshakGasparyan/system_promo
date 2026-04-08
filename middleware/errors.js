// catch 404 and forward to error handler
const createError = require("http-errors");

module.exports = (app) => {
    app.use(function (req, res, next) {
        next(createError(404));
    });
// error handler
    app.use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        res.status(err.status || 500);
        return res.send({errors: err.message, status: err.status || 500});
    });
}

function contextMiddlewareHandler(req, res, next) {
  res.locals.title = 'Journey';
  res.locals.req = req;
  next(null);
}
module.exports = exports = contextMiddlewareHandler;

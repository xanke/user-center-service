module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404) {
      ctx.body = { message: '没有此接口', code: 404 };
    }
  };
};

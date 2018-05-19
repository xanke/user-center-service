module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404) {
      ctx.body = { name: 'NOT_API', code: 100101, message: '没有此 API' };
    }
  };
};

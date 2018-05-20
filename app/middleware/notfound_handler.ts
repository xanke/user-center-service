module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    console.log(ctx.status);
    // if (ctx.status === 404) {
    //   ctx.body = { name: 'NOT_API', code: 200001, message: '没有此 API' };
    // }
  };
};

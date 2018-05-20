/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| 404 中间件
| 
*/

module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404) {
      ctx.body = { name: 'NOT_API', code: 200001, message: '没有此 API' };
    }
  };
};

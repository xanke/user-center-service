let apiError = require('../common/api_error');

let responseFormatter = (ctx) => {
  if (ctx.body) {
    ctx.body = {
      code: 0,
      message: 'success',
      data: ctx.body,
    };
  } else {
    ctx.body = {
      code: 0,
      message: 'success',
    };
  }
};

let urlFilter = function() {
  return async function(ctx, next) {
    try {
      await next();
    } catch (error) {
      console.log(error.name);
      // if (error.message === 'ERR_DUPLICATED_PHONE_NO') {
      ctx.status = 200;
      ctx.body = {
        code: '12',
        message: error.message,
      };
      // }
      // throw error
    }

    // responseFormatter(ctx)
  };
};
module.exports = urlFilter;

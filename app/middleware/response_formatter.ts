import ApiError from '../common/api_error';
import { ERROR_CODE, ERROR_MESSAGE } from '../common/const/error';

function urlFilter() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      if (error instanceof ApiError) {
        const { name } = error;
        const code = ERROR_CODE[name];
        const message = ERROR_MESSAGE[name];

        ctx.status = 200;
        ctx.body = {
          code,
          message,
          name,
        };
      } else {
        const { status, name, message } = error;
        if (status === 422) {
          ctx.status = 200;
          ctx.body = {
            name,
            message,
          };
        } else {
          throw error;
        }
      }
      return;
    }
  };
}
module.exports = urlFilter;

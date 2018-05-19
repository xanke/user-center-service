// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import ErrorHandler from '../../../app/middleware/error_handler';
import Log from '../../../app/middleware/log';
import NotfoundHandler from '../../../app/middleware/notfound_handler';
import ResponseFormatter from '../../../app/middleware/response_formatter';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: ReturnType<typeof ErrorHandler>;
    log: ReturnType<typeof Log>;
    notfoundHandler: ReturnType<typeof NotfoundHandler>;
    responseFormatter: ReturnType<typeof ResponseFormatter>;
  }
}

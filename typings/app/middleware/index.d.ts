// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import AuthJwt from '../../../app/middleware/auth_jwt';
import NotfoundHandler from '../../../app/middleware/notfound_handler';
import ResponseFormatter from '../../../app/middleware/response_formatter';

declare module 'egg' {
  interface IMiddleware {
    authJwt: ReturnType<typeof AuthJwt>;
    notfoundHandler: ReturnType<typeof NotfoundHandler>;
    responseFormatter: ReturnType<typeof ResponseFormatter>;
  }
}

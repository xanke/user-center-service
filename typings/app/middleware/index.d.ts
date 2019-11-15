// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthJwt from '../../../app/middleware/auth_jwt';
import ExportNotfoundHandler from '../../../app/middleware/notfound_handler';
import ExportResponseFormatter from '../../../app/middleware/response_formatter';

declare module 'egg' {
  interface IMiddleware {
    authJwt: typeof ExportAuthJwt;
    notfoundHandler: typeof ExportNotfoundHandler;
    responseFormatter: typeof ExportResponseFormatter;
  }
}

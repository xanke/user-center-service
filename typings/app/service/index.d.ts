// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/service/auth';
import ExportCache from '../../../app/service/cache';
import ExportJwt from '../../../app/service/jwt';
import ExportMail from '../../../app/service/mail';
import ExportValidate from '../../../app/service/validate';
import ExportWx from '../../../app/service/wx';
import ExportAccountCaptcha from '../../../app/service/account/captcha';
import ExportAccountUser from '../../../app/service/account/user';

declare module 'egg' {
  interface IService {
    auth: ExportAuth;
    cache: ExportCache;
    jwt: ExportJwt;
    mail: ExportMail;
    validate: ExportValidate;
    wx: ExportWx;
    account: {
      captcha: ExportAccountCaptcha;
      user: ExportAccountUser;
    }
  }
}

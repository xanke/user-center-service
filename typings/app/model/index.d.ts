// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/model/base';
import ExportConfigs from '../../../app/model/configs';
import ExportUser from '../../../app/model/user';
import ExportUsers from '../../../app/model/Users';
import ExportUsersCaptchas from '../../../app/model/UsersCaptchas';
import ExportVerify from '../../../app/model/verify';

declare module 'egg' {
  interface IModel {
    Base: ReturnType<typeof ExportBase>;
    Configs: ReturnType<typeof ExportConfigs>;
    User: ReturnType<typeof ExportUser>;
    Users: ReturnType<typeof ExportUsers>;
    UsersCaptchas: ReturnType<typeof ExportUsersCaptchas>;
    Verify: ReturnType<typeof ExportVerify>;
  }
}

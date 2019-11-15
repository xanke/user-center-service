// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount2 from '../../../app/controller/account2';
import ExportHome from '../../../app/controller/home';
import ExportVerify from '../../../app/controller/verify';
import ExportWx from '../../../app/controller/wx';
import ExportAccountUser from '../../../app/controller/account/user';
import ExportRootInstall from '../../../app/controller/root/install';
import ExportRootModelAccounts from '../../../app/controller/root/model/Accounts';

declare module 'egg' {
  interface IController {
    account2: ExportAccount2;
    home: ExportHome;
    verify: ExportVerify;
    wx: ExportWx;
    account: {
      user: ExportAccountUser;
    }
    root: {
      install: ExportRootInstall;
      model: {
        accounts: ExportRootModelAccounts;
      }
    }
  }
}

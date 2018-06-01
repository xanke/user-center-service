// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Account from '../../../app/controller/account';
import Home from '../../../app/controller/home';
import User from '../../../app/controller/user';
import Verify from '../../../app/controller/verify';
import Wx from '../../../app/controller/wx';

declare module 'egg' {
  interface IController {
    account: Account;
    home: Home;
    user: User;
    verify: Verify;
    wx: Wx;
  }
}

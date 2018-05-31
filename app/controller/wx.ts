/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Wx
|
*/
// const { umoji } = require('umoji');
import { Controller } from 'egg';

export default class WxController extends Controller {
  public async login() {
    const { ctx } = this;

    console.log(ctx);
    console.log(Date.now());

    ctx.body = Date.now();
  }
}

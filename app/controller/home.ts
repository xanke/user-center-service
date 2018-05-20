/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Home
|
*/

const pkg = require('../../package.json');
import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    await ctx.model.User.sync({ force: true });
    await ctx.model.Verify.sync({ force: true });

    const { name, version } = pkg;
    ctx.body = { name, version };
  }
}

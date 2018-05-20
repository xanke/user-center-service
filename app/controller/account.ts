/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| 账户控制
|
*/
import { Controller } from 'egg';

export default class AccountController extends Controller {
  public async signIn() {
    const { ctx } = this;

    const { phone, password, code } = ctx.request.body;
    ctx.service.validate.phone(phone);

    const verifyCode = await ctx.service.cache.get(phone + '-verify');

    if (!verifyCode || code !== verifyCode) {
      ctx.error('ERR_VERIFY_CODE');
    }

    const create = {
      phone,
      password,
      code,
    };

    let ret;

    try {
      ret = await ctx.model.User.create(create);
    } catch (e) {
      console.log(e);
    }

    ctx.body = {
      id: ret.id,
    };
  }

  public async login() {
    const { ctx } = this;

    ctx.body = {};
  }
}

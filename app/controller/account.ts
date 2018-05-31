/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| 账户控制
|
*/
import { Controller } from 'egg';
import { superstruct } from 'superstruct';

export default class AccountController extends Controller {
  public async signIn() {
    const { ctx } = this;

    const { phone = '', password = '', code = '' } = ctx.request.body;
    const userData = {
      phone,
      password,
      code,
    };

    const struct = superstruct({
      types: {
        code: (v) => {
          if (v.length !== 4) {
            return false;
          }
          return true;
        },
        password: (v) => {
          const reg = /^[A-Za-z0-9]{6,30}$/;

          if (!reg.test(v)) {
            return false;
          }
          return true;
        },
      },
    });

    const formStruct = struct({
      phone: 'string',
      password: 'password',
      code: 'code',
    });

    ctx.validateStruct(userData, formStruct);

    ctx.service.validate.phone(phone);

    const verifyCode = await ctx.service.cache.get(phone + '-verify');

    if (!verifyCode || code !== verifyCode) {
      ctx.error('ERR_VERIFY_CODE');
    }

    // 判断是否已注册
    const find = await ctx.model.User.findOne({ where: { phone } });
    if (find) {
      ctx.error('ERR_DUPLICATED_PHONE_NO');
    }

    const ret = await ctx.model.User.create(userData);
    ctx.service.cache.del(phone + '-verify');
    ctx.service.cache.del(phone + '-verify-time');

    ctx.body = {
      id: ret.id,
    };
  }

  public async login() {
    const { ctx, app } = this;
    const { phone = '', password = '' } = ctx.request.body;
    const result = await ctx.model.User.findOne({ where: { phone } });

    const {id, name, email, avatar} = result;

    const userinfo = {
      id, name, email, avatar,
    };

    if (result) {
      if (await app.verifyBcrypt(password, result.password)) {
        // 删除密码属性
        ctx.body = userinfo;
        return;
      }
    }
    ctx.error('ERR_ACCOUNT');
  }
}

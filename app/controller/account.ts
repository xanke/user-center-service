import { Controller } from 'egg';
import { parseNumber } from 'libphonenumber-js';

export default class AccountController extends Controller {
  public async signIn() {
    const { app, ctx } = this;

    const rule = {
      phone: { type: 'string', required: true },
    };

    ctx.validate(rule, ctx.request.body);

    const { phone } = ctx.request.body;
    const { country, phone: phoneNo } = parseNumber(phone);

    if (!country) {
      ctx.error('ERR_DUPLICATED_PHONE_NO');
    }

    if (country !== 'CN') {
      throw new Error('暂不支持国外手机号');
    }

    console.log(phoneNo);
    const verifyCode = app.randomNum(4);

    ctx.body = {
      verifyCode,
    };
  }
}

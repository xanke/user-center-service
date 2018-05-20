import { Controller } from 'egg';
import { parseNumber } from 'libphonenumber-js';

export default class AccountController extends Controller {
  public async signIn() {
    const {  ctx } = this;

    const { phone, code } = ctx.request.body;

    if (!phone) {
      ctx.error('ERR_NULL_PHONE_NO');
    }

    const { country } = parseNumber(phone);

    if (!country) {
      ctx.error('ERR_FORMAT_PHONE_NO');
    }

    if (country !== 'CN') {
      ctx.error('NOT_SUPPORT_PHONE_NO');
    }

    const verifyCode = await ctx.service.cache.get(phone + '-verify');
    if (!verifyCode || code !== verifyCode) {
      ctx.error('ERR_VERIFY_CODE');
    }

    ctx.body = {
      phone,
      verifyCode,
    };
  }
}

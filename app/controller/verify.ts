import { Controller } from 'egg';
import { parseNumber } from 'libphonenumber-js';

export default class VerifyController extends Controller {
  public async smsCode() {
    const { app, ctx } = this;
    const { phone } = ctx.request.body;

    if (!phone) {
      ctx.error('ERR_NULL_PHONE_NO');
    }

    const { country, phone: phoneNo } = parseNumber(phone);

    if (!country) {
      ctx.error('ERR_FORMAT_PHONE_NO');
    }

    if (country !== 'CN') {
      ctx.error('NOT_SUPPORT_PHONE_NO');
    }

    const verifyCode = app.randomNum(4);

    ctx.body = {
      phoneNo,
      verifyCode,
    };
  }

  public async emailCode() {
    const { app, ctx } = this;
    const { email } = ctx.request.body;

    const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

    if (!email) {
      ctx.error('ERR_NULL_EMAIL');
    }

    if (!re.test(email)) {
      ctx.error('ERR_FORMAT_EMAIL');
    }
 
    const verifyCode = app.randomNum(4);

    ctx.body = {
      email,
      verifyCode,
    };
  }
} 

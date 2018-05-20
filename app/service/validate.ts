import { Service } from 'egg';
import { parseNumber } from 'libphonenumber-js';

export default abstract class CacheService extends Service {
  public phone (value) {
    const { ctx } = this;
    if (!value) {
      ctx.error('ERR_NULL_PHONE_NO');
    }

    const { country } = parseNumber(value);

    if (!country) {
      ctx.error('ERR_FORMAT_PHONE_NO');
    }

    if (country !== 'CN') {
      ctx.error('NOT_SUPPORT_PHONE_NO');
    }
  }
}

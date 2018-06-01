import { superstruct } from 'superstruct';

export default class UserValidate {
 
  public register(): object {
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

    return struct({
      phone: 'string',
      password: 'password',
      code: 'code',
    });
  }
}

import { Redis }  from 'ioredis'

import ExtendApplication from './extend/application'
import ExtendContext from './extend/context'

declare module 'egg' {
  export interface Application {
    // jwt
    jwt: {
      // 加密
      sign(
        payload: string | Buffer | object,
        secretOrPrivateKey: Secret,
        options?: SignOptions,
      ): string;

      // 验证
      verify(
        token: string,
        secretOrPublicKey: string | Buffer,
        options?: VerifyOptions,
      ): object | string;

      // 解密
      decode(
        token: string,
        options?: DecodeOptions,
    ): null | { [key: string]: any } | string;
    }
    redis: Redis;
  }
}
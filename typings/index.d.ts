import { Redis } from "ioredis";

import ExtendApplication from "./extend/application";
import ExtendContext from "./extend/context";
import Validate from "./extend/validate";
import Rule from "./extend/rule";

declare module "egg" {
  export interface Application {
    rule: Rule,
    // jwt
    jwt: {
      // 加密
      sign(
        payload: string | Buffer | object,
        secretOrPrivateKey: Secret,
        options?: SignOptions
      ): string;

      // 验证
      verify(
        token: string,
        secretOrPublicKey: string | Buffer,
        options?: VerifyOptions
      ): object | string;

      // 解密
      decode(
        token: string,
        options?: DecodeOptions
      ): null | { [key: string]: any } | string;
    };
    redis: Redis;
  }
}

/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| User
|
*/
import { Controller } from 'egg';

export default class UserController extends Controller {
  public async info() {
    const { ctx } = this;

    ctx.body = ctx.request.body.jwt_sub;
  }
}

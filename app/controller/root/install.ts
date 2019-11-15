import { Controller } from 'egg';
import Accounts from './model/Accounts'

export default class InstallController extends Controller {
  public async index() {
    const { ctx } = this;
    console.log(11)
    await Accounts(ctx);

    ctx.body = { ok: 'ok' };
  }
}

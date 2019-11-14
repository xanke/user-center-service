import { Controller } from 'egg';
import Accounts from './model/Accounts'

export default class HomeController extends Controller {
  public async install() {
    const { ctx } = this;
    await Accounts(ctx);
  }
}

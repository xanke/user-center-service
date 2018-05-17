import { Controller } from 'egg'

export default class AccountController extends Controller {
  public async index() {
    const { ctx } = this
    const { phoneNumber } = ctx.request.body
    ctx.body = { phoneNumber }
  }
}

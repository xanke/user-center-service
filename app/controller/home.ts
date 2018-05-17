const pkg = require('../../package.json')
import { Controller } from 'egg'

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this
    const { name, version } = pkg
    ctx.body = { name, version }
  }
}

'use strict';

import { Controller } from 'egg';
import Rule from '../../utils/rule'

export default class AccountsController extends Controller {
  async signIn() {
    const form = this.ctx.request.body;
    const rule =  {
      email: {
        type: 'email',
        required: false,
        message: '邮箱格式不正确',
        trigger: 'blur',
      },
      mobile: {
        pattern: Rule.mobile,
        required: false,
        message: '手机格式不正确',
        trigger: 'blur',
      },
      pwd: {
        type: 'string',
        required: true,
        message: '请填写密码',
        trigger: 'blur',
      },
    };
    await this.ctx.validate(rule, form);

    const { mobile, email, pwd, code } = form;
    await this.ctx.service.account.captcha.checkByUsername({ username: mobile, code })

    const createData = {
      id: this.ctx.helper.createHashId(`${mobile}${email}`),
      mobile,
      email,
      pwd,
    };

    await this.ctx.service.account.user.signIn(createData)
    this.ctx.body = { message: '注册成功' };
  }

  async update() {
    const { userId } = this.ctx.state.user;
    const { avatar, tz, language } = this.ctx.request.body;
    const update = {
      avatar,
      tz,
      language,
    };
    this.ctx.body = await this.ctx.service.accounts.users.updateById(
      update,
      userId
    );
  }

  async info() {
    const { userId } = this.ctx.state.user;
    const data = await this.ctx.service.accounts.users.findById(userId);

    if (data.mobile) {
      const mobile = data.mobile;
      data.mobile = mobile.slice(0, 3) + '****' + mobile.slice(-4);
    }

    this.ctx.body = await this.ctx.service.accounts.users.formatResult(data);
  }

  async login() {
    await this.ctx.validate(
      this.ctx.accountRule.login,
      this.ctx.request.body
    );

    const { username, password } = this.ctx.request.body;
    const form = {
      username,
      password,
    };
    this.ctx.body = await this.service.accounts.users.login(form);
  }
}

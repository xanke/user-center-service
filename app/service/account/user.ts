'use strict';

import {Service} from 'egg';
// const crypto = require('crypto');
const Rule = require('../../utils/rule');

export default class UsersService extends Service {
  Model: any;

  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Users;
  }

  async login(data) {
    const { username } = data;
    const userData = await this.findByUsername(username);
    // const _password = crypto.createHmac('sha256', this.app.config.keys).update(password).digest('hex');
    // if (_password !== userData.password) throw new Error('PasswordError');

    const result = await this.formatResult(userData);
    // 最后登陆时间
    const lastLoginIp = this.ctx.helper.getIP();
    const lastLoginTime = Date.now();
    this.updateById({ lastLoginIp, lastLoginTime }, userData.id);
    // 登陆记录
    this.ctx.service.accounts.logs.create({
      userId: result.id,
      token: result.token,
    }, 'LOGIN');
    return result;
  }

  async signIn(data) {
    let userData;
    if (!data.username && !data.email && !data.mobile) throw new Error('NotUsername');

    if (data.username) {
      try {
        userData = await this.findByUsername(data.username);
      } catch (e) {
        //
      }
      if (userData) throw new Error('UsernameExist');
    }

    if (data.email) {
      try {
        userData = await this.findByUsername(data.email);
      } catch (e) {
        //
      }
      if (userData) throw new Error('EmailExist');
    }

    if (data.mobile) {
      try {
        userData = await this.findByUsername(data.mobile);
      } catch (e) {
        //
      }
      if (userData) throw new Error('mobileExist');
    }

    const create = {
      registerIP: this.ctx.request.headers.host,
      roles: [],
      settings: {},
      ...data,
    };
    return await this.Model.create(create);
  }

  // createUid(data) {
  //   const { username = '-', email = '-', mobile = '-' } = data;
  //   const line = `${username}.${email}.${mobile}`;
  //   return crypto.createHash('md5').update(line).digest('hex');
  // }

  // formatUsername(username) {
  //   if (Rule.EmailReg.test(username)) {
  //     return { email: username };
  //   } else if (Rule.mobile.test(username)) {
  //     return { mobile: username };
  //   }
  //   return { username };
  // }

  async formatResult(userData) {
    const result: any = {
      id: userData.id,
      avatar: userData.avatar,
      username: userData.username,
      nickName: userData.nickName,
      email: userData.email,
      mobile: userData.mobile,
      tz: userData.tz,
      language: userData.language,
      lastLoginIp: userData.lastLoginIp,
      lastLoginTime: userData.lastLoginTime,
    };
    let roleId;
    if (userData.roles && userData.roles.length) {
      roleId = userData.roles[0].id;
      // let permissionList = [];
      // if (roleId === 'root') {
      //   permissionList = await this.ctx.service.accounts.permissions.list.getAll();
      // } else {
      //   const rolesData = await this.ctx.service.accounts.roles.list.getById(roleId);
      //   permissionList = rolesData.permissions;
      // }
      // const permissions = permissionList.map(_ => {
      //   return {
      //     permissionId: _.id,
      //   };
      // });
      result.roles = {
        id: roleId,
        // permissions,
      };
    }
    result.token = this.createToken({ roleId, id: userData.id });

    return result;
  }

  createToken(userData) {
    // 生成 token
    const uData = {
      userId: userData.id,
      roleId: userData.roleId,
    };
    const token = this.app.jwt.sign(uData, this.app.config.jwt.secret, {
      expiresIn: '3d',
    });
    return token;
  }

  async findById(id) {
    const data = await this.Model.findOne({ where: { id } });
    if (!data) throw new Error('NotFoundUser');
    return data;
  }

  async updateById(update, id) {
    const result = await this.Model.update(update, {
      where: { id },
    });
    return result;
  }

  async findByUsername(username) {
    const where: any = {}

    if (Rule.EmailReg.test(username)) {
      where.email = username;
    } else if (Rule.mobile.test(username)) {
      where.mobile = username;
    } else {
      where.username = username;
    }

    const data = await this.Model.findOne({ where });
    if (!data) throw new Error('NotFoundUser');
    return data;
  }

  async updateProfile(data) {
    const { id } = data;
    await this.findById({ id });
    try {
      await this.Model.UsersProfiles.update(data, {
        where: { id },
      });
    } catch (e) {
      throw new Error('UpdateUserError');
    }
  }

  async resetPassword(data) {
    const { oldPassword, newPassword, id } = data;
    const userData = await this.findById(id);
    if (oldPassword !== userData) throw new Error('OldPasswordError');
    try {
      await this.Model.update({ password: newPassword }, { where: id });
    } catch (e) {
      throw new Error('UpdatePasswordError');
    }
  }
}

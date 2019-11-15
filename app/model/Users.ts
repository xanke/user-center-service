'use strict';
const moment = require('moment');
const crypto = require('crypto');
import { Application } from 'egg';

export default function Users(app: Application) {
  const { BIGINT, STRING, DATE, JSON } = app.Sequelize;
  // 用户表
  const modelSchema = app.model.define('users', {
    id: {
      type: STRING(8),
      primaryKey: true,
    },
    username: {
      type: STRING(255),
      defaultValue: '',
    },
    email: {
      type: STRING(255),
      defaultValue: '',
    },
    mobile: {
      type: STRING(255),
      defaultValue: '',
    },
    nickName: {
      type: STRING(255),
      defaultValue: '',
    },
    password: {
      type: STRING(255),
      allowNull: false,
    },
    avatar: {
      type: STRING(255),
      defaultValue: '',
    },
    tz: {
      type: STRING(255),
      defaultValue: 'Asia/Shanghai',
    },
    language: {
      type: STRING(255),
      defaultValue: 'zh-CN',
    },
    status: {
      type: STRING(255),
      defaultValue: 'normal',
    },
    roles: {
      type: JSON,
      allowNull: false,
    },
    settings: {
      type: JSON,
      allowNull: false,
    },
    registerIP: {
      type: STRING(255),
      defaultValue: '',
    },
    lastLoginIp: {
      type: STRING(255),
      defaultValue: '',
    },
    lastLoginTime: {
      type: BIGINT,
      defaultValue: 0,
    },
    created_at: {
      type: DATE,
      get() {
        return moment((this as any).getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updated_at: {
      type: DATE,
      get() {
        return moment((this as any).getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  }, {
    paranoid: true,
    setterMethods: {
      pwd(value) {
        const password = crypto.createHmac('sha256', app.config.keys).update(value).digest('hex');
        (this as any).setDataValue('password', password);
      },
    },
    indexes: [
      {
        fields: [ 'username' ],
      },
      {
        fields: [ 'mobile' ],
      },
      {
        fields: [ 'email' ],
      },
    ],
  });

  // modelSchema.associate = function() {
  //   app.model.Users.hasOne(app.model.UsersProfiles, {
  //     as: 'profiles',
  //     foreignKey: 'id',
  //   });
  // };

  return modelSchema
};

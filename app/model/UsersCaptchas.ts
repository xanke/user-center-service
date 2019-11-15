'use strict';
const moment = require('moment');
import { Application } from 'egg';

export default function UsersCaptchas(app: Application) {
  const { STRING, BOOLEAN, DATE, BIGINT } = app.Sequelize;
  // 用户验证码表
  const modelSchema = app.model.define('usersCaptchas', {
    userId: {
      type: STRING(8),
      allowNull: false,
    },
    username: {
      type: STRING(8),
      allowNull: false,
    },
    target: {
      type: STRING(255),
      allowNull: false,
    },
    action: {
      type: STRING(255),
      allowNull: false,
    },
    type: {
      type: STRING(8),
      defaultValue: 'mobile',
    },
    code: {
      type: STRING(8),
      allowNull: false,
    },
    used: {
      type: BOOLEAN,
      defaultValue: false,
    },
    createdTime: {
      type: BIGINT,
      allowNull: false,
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
        return moment((this as any).getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  }, {
    indexes: [
      {
        fields: [ 'userId' ],
      },
    ],
  });

  return modelSchema;
};

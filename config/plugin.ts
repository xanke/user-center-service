'use strict';

export default {
  // 挂载 egg-jwt
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  weapp: {
    enable: true,
    package: 'egg-weapp-sdk',
  },

  // 挂载 egg-sequelize
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  // 挂载 egg-router-plus 路由拓展
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },

  // 挂载 egg-validate 数据验证
  validate: {
    package: 'egg-validate',
  },

  // 挂载 egg-redis redis 拓展
  redis: {
    enable: true,
    package: 'egg-redis',
  },

  // 挂载 egg-session-redis 将 session 储存到 redis
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  }
};

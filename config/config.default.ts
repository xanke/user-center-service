import { EggAppConfig, PowerPartial } from 'egg';

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
}

export default (appInfo: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${
    appInfo.name
  }`;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1526548823403_7693';

  // add your config here
  config.middleware = ['log', 'notfoundHandler', 'responseFormatter'];

  config.sequelize = {
    dialect: 'mysql',
    database: 'user-center',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
    timezone: '+08:00',
  };

  config.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      db: '0',
    },
  };

  config.sessionRedis = {
    name: '',
  };

  config.qiniu = {
    accessKey: '',
    secretKey: '',
    bucket: '',
  };

  config.gt3 = {
    geetestId: '',
    geetestKey: '',
  };

  return config;
};

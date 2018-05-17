import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};

  config.sequelize = {
    dialect: 'mysql',
    database: 'user-center',
    host: 'xk-sh3.xanke.net',
    port: '3316',
    username: 'root',
    password: 'shds!!804',
    timezone: '+08:00'
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  config.qiniu = {
    accessKey: 'V6yzllce18M2yO8qunyT5zBQ4QhmNNfmDZHrnM9S',
    secretKey: 'bPvmB91-l67ltJd90yUGg3E51jYXFZcLj9lUClJD',
    bucket: 'cnuc'
  }

  config.gt3 = {
    geetestId: '20ce5ac6479d4ed780e86249d0683770',
    geetestKey: '4a3367c5bc20512551f335512c2cbb0f'
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  config.adminKey = 'cnuc'

  return config
}

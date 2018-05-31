import Jwt from './jwt';
import Mail from './mail';
import CacheManager from './cache';
import IpToRegion from './ip_to_region';
import weapp from 'egg-weapp-sdk'

declare module 'egg' {
  // 拓展 egg 的 Application
  export interface Context {
    // 放置各类处理额外业务逻辑处理
    handlers: {
      jwt: Jwt;
      mail: Mail;
      cache: CacheManager;
      ipToRegion: IpToRegion;
      weapp: weapp
    }
  }
}

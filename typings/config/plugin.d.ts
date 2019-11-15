// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import 'egg-onerror';
import 'egg-session';
import 'egg-i18n';
import 'egg-watcher';
import 'egg-multipart';
import 'egg-security';
import 'egg-development';
import 'egg-logrotator';
import 'egg-schedule';
import 'egg-static';
import 'egg-jsonp';
import 'egg-view';
import 'egg-jwt';
import 'egg-weapp-sdk';
import 'egg-sequelize';
import 'egg-router-plus';
import 'egg-validate';
import 'egg-redis';
import 'egg-session-redis';
import 'egg-cors';
import { EggPluginItem } from 'egg';
declare module 'egg' {
  interface EggPlugin {
    onerror?: EggPluginItem;
    session?: EggPluginItem;
    i18n?: EggPluginItem;
    watcher?: EggPluginItem;
    multipart?: EggPluginItem;
    security?: EggPluginItem;
    development?: EggPluginItem;
    logrotator?: EggPluginItem;
    schedule?: EggPluginItem;
    static?: EggPluginItem;
    jsonp?: EggPluginItem;
    view?: EggPluginItem;
    jwt?: EggPluginItem;
    weapp?: EggPluginItem;
    sequelize?: EggPluginItem;
    routerPlus?: EggPluginItem;
    validate?: EggPluginItem;
    redis?: EggPluginItem;
    sessionRedis?: EggPluginItem;
    cors?: EggPluginItem;
  }
}
import { Service } from 'egg';
import { isNull } from 'lodash';

export default abstract class CacheService extends Service {
  // 使用缓存类型 [ 以后拓展 ]
  private get store() {
    // return this.app['redis']
    return this.app.redis;
  }

  /**
   * 给缓存标识添加 prefix 前缀
   *
   * @param {string} key 缓存标识
   * @returns {string}
   */
  public getPrefixKey(key: string): string {
    return `${this.app.config.name}.${key}`;
  }

  /**
   * 设置字符串类型缓存
   *
   * @param {string} key 缓存标识
   * @param {any}    value 缓存的数据
   * @param {number} time 缓存过期时间
   * @param {string} unit 指定时间单位 （h/m/s/ms）默认为 s
   */
  public async set(
    key: string,
    value: any,
    time: number = 0,
    unit: string = 's',
  ) {
    if (isNull(key) || isNull(value)) {
      return this.abortError('请传入正确参数');
    }

    // 为了能传入 object、array 这类的值，所以这里转换成 json
    value = JSON.stringify(value);

    if (!isNull(time)) {
      // 转换为小写
      unit = unit.toLowerCase();

      // 判断时间单位
      switch (unit) {
        case 'h':
          time *= 3600;
          break;
        case 'm':
          time *= 60;
          break;
        case 's':
          break;
        case 'ms':
          break;
        default:
          return this.abortError('时间单位只能是：h/m/s/ms');
      }

      // EX: 单位为秒; PX: 单位为毫秒
      const mill = unit === 'ms' ? 'PX' : 'EX';

      return this.store.set(this.getPrefixKey(key), value, mill, time);
    }

    // 不设置过期时间
    return this.store.set(this.getPrefixKey(key), value);
  }

  /**
   * 获取缓存
   *
   * @param {string} key 缓存标识
   */
  public async get(key: string) {
    if (isNull(key)) {
      return this.abortError('请传入需要获取的缓存名称');
    }

    // try {
    //   return JSON.parse(await this.store.get(this.getPrefixKey(key))); // 因为上面加储存值转换为 json, 所以这里需要把它转换回来
    // } catch (error) {
    //   await this.abortError('get 方法只能获取 string 类型缓存');
    // }
  }

  /**
   * 删除指定缓存
   *
   * @param {string} key 缓存标识
   */
  public async del(key: string) {
    if (isNull(key)) {
      return this.abortError('请传入需要删除的缓存名称');
    }

    return this.store.del(this.getPrefixKey(key));
  }
  
  /**
   * 抛出 cache 异常
   *
   * @param {number} code 错误状态码
   * @param {string} message 错误提示
   * @throws {Error}
   */
  public async abortError(message: string = 'error', code: number = 422) {
    const error: any = new Error(`[cache]: ${message}`);
    error.status = code;
    error.name = 'CacheException';

    throw error;
  }
}

/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  Blog：https://www.atzcl.cn
+-----------------------------------------------------------------------------------------------------------------------
| 拓展 context
|
*/

import apiError from '../common/api_error';

const extendContext = {
  error(name) {
    console.log(name);
    throw new apiError(name);
  },

  /**
   * 数据结构验证
   * 
   * @param {any} 数据 
   * @param {any} 验证解构 
   * @returns 
   */
  validateStruct(data, struct) {
    try {
      struct(data);
    } catch (e) {
      const { path, value, type } = e;
      if (!path) {
        return;
      }

      let key = path[0];
      key = key.toUpperCase();
      if (value === undefined) {
        this.error(`ERR_NULL_${key}`);
      }

      if (type === undefined) {
        this.error(`ERR_FORMAT_${key}`);
      }
      this.error(`ERR_FORMAT_${key}`);
    }
  },
  
  /**
   * 抛出自定义异常
   *
   * @param {number} code 错误状态码
   * @param {string} message 错误提示
   * @throws {Error}
   */
  abort(code: number, message: string = 'error') {
    const error: any = new Error(message);
    error.status = code;
    error.name = 'AppFlowException';

    throw error;
  },

  /**
   * 覆写 egg-validate 的 validate，目的是为了使用自定义的异常名称 [ 可以在这里拓展下错误信息的自定义 ]
   *
   * @param  {Object} rules  - validate rule object, see [parameter](https://github.com/node-modules/parameter)
   * @param  {Object} [data] - validate target, default to `this.request.body`
   * errors: [
   * { message: 'required', field: 'name', code: 'missing_field' },
   * { message: 'required', field: 'password',code: 'missing_field' }
   * ]
   */
  validate(rules: object, data?: object) {
    data = data || (this as any).request.body;
    const errors = (this as any).app.validator.validate(rules, data);
    if (errors) {
      const error: any = new Error(
        `Validation Exception: [${errors[0].field}] ${errors[0].message}`,
      );
      error.status = 422;
      error.name = 'ValidationException';

      throw error;
    }
  },
};

export default extendContext;

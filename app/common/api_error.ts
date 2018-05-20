/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| API 错误处理
|
*/

class ApiError extends Error {
  constructor(error) {
    super();
    this.name = error;
    this.message = error;
  }
}

export default ApiError;

const apiError = require('../error/ApiError');

/**
 * API错误名称
 */
const ERROR_NAME = {
  UNKNOW_ERROR: 'unknowError',
  USER_NOT_EXIST: 'userNotExist',
  ERR_DUPLICATED_PHONE_NO: 'ERR_DUPLICATED_PHONE_NO',
};

/**
 * API错误名称对应的错误信息
 */
const ERROR_MAP = new Map();

ERROR_MAP.set(ERROR_NAME.UNKNOW_ERROR, { code: -1, message: '未知错误' });
ERROR_MAP.set(ERROR_NAME.ERR_DUPLICATED_PHONE_NO, { code: 100001, message: '该手机号已注册，请直接登录' });
ERROR_MAP.set(ERROR_NAME.USER_NOT_EXIST, {
  code: 101,
  message: '用户不存在',
});

// 根据错误名称获取错误信息
function getErrorInfo(errorName) {
  let errorInfo;

  if (errorName) {
    errorInfo = ERROR_MAP.get(errorName);
  }

  // 如果没有对应的错误信息，默认'未知错误'
  if (!errorInfo) {
    errorName = ERROR_NAME.UNKNOW_ERROR;
    errorInfo = ERROR_MAP.get(errorName);
  }

  throw new apiError(errorInfo);
}

export default getErrorInfo;

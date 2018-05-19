class ApiError extends Error {
  // 构造方法
  constructor(error) {
    super();

    // const { name, message } = error
    this.name = error;
    this.message = error;
  }
}

// module.exports = ApiError

export default ApiError;

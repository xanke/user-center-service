// import { ERROR_CODE } from './const/error';

class ApiError extends Error {
  constructor(error) {
    super();
    this.name = error;
    this.message = error;
  }
}

export default ApiError;

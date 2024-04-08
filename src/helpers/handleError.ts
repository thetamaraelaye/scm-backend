export function handleError() {}

class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class BadRequestError extends BaseError {
  code: number;
  constructor(message: string) {
    super(message);
    this.code = 400;
  }
}

class NotFoundError extends BaseError {
  code: number;
  constructor(message: string) {
    super(message);
    this.code = 404;
  }
}

class ForbiddenError extends BaseError {
  code: number;
  constructor(message: string) {
    super(message);
    this.code = 403;
  }
}

class UnAuthorizedError extends BaseError {
  code: number;
  constructor(message: string) {
    super(message);
    this.code = 401;
  }
}

class InternalServerError extends BaseError {
  code: number;
  constructor(message: string) {
    super(message);
    this.code = 500;
  }
}

export { InternalServerError, BadRequestError, UnAuthorizedError, ForbiddenError, NotFoundError };
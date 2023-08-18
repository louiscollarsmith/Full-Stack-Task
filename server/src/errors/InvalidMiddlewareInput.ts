/**
 * User: abhijit.baldawa
 */

import type { IInvalidSessionQueryParams } from '../controllers/errors.controller';

/**
 * @public
 *
 * Use this class to create an error if an incoming
 * request has incomplete required inputs
 */
class InvalidMiddlewareInput
  extends Error
  implements IInvalidSessionQueryParams {
  constructor(
    public errorReason: string,
    public httpStatusCode: number,
    public errorMessage: string
  ) {
    super(errorReason);
  }

  toJSON(): IInvalidSessionQueryParams {
    return {
      errorReason: this.errorReason,
      httpStatusCode: this.httpStatusCode,
      errorMessage: this.errorMessage,
    };
  }
}

export { InvalidMiddlewareInput };

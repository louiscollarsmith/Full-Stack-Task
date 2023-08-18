/**
 * User: abhijit.baldawa
 *
 * This module exposes controller methods for /ifdkibana/errors endpoint
 */

import { RequestHandler } from 'express';

interface IInvalidSessionQueryParams {
  errorReason: string;
  httpStatusCode: number;
  errorMessage: string;
}

/**
 * @public
 *
 * REST endpoint for: POST /ifdkibana/errors
 *
 * Given necessary query params this method renders
 * error.ejs with those query params and responds with
 * its HTML equivalent
 *
 * @param req - Express request object
 * @param res - Express response object
 */
const genericErrorHandler: RequestHandler<
  never,
  string,
  never,
  IInvalidSessionQueryParams
> = (req, res) => {
  const {
    errorMessage = 'No error message provided',
    httpStatusCode = 'No status code provided',
    errorReason = 'No error reason provided',
  } = req.query || {};

  res.render('error', {
    errorMessage,
    httpStatusCode,
    errorReason,
  });
};

export { IInvalidSessionQueryParams, genericErrorHandler };

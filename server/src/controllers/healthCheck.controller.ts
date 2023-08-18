/**
 * User: abhijit.baldawa
 *
 * This module exposes controller methods for /ifdkibana/healthcheck endpoint
 */

import { RequestHandler } from 'express';

/**
 * @public
 *
 * REST endpoint for: GET /ifdkibana/healthcheck
 *
 * Use this method to check whether this server is running
 *
 * @param _ - Express request object
 * @param res - Express response object
 */
const healthCheck: RequestHandler = (_, res) => {
  res.send('OK');
};

export { healthCheck };

/**
 * User: abhijit.baldawa
 *
 * This module exposes controller methods for /ifdkibana/cookies endpoint
 */

import { RequestHandler } from 'express';

interface ISetCookieBody {
  redirectUrl: string;
}

/**
 * @public
 *
 * REST endpoint for: POST /ifdkibana/cookies/setCookie
 *
 * This method renders cookie.ejs by injecting 'cookie' and
 * 'redirectUrl' inside it and responds with its HTML equivalent.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
const setKibanaUrl: RequestHandler<
  never,
  number | Record<string, string>,
  ISetCookieBody
> = (req, res) => {
  const { redirectUrl } = req.body || {};

  if (!redirectUrl || typeof redirectUrl !== 'string') {
    res
      .status(400)
      .json({ error: `'redirectUrl' is required in body and must be string` });
  } else {
    res.render('kibana', {
      redirectUrl,
    });
  }
};

export { setKibanaUrl };

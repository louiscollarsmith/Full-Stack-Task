/**
 * User: abhijit.baldawa
 *
 * This module exposes middleware to validate if users of
 * incoming requests are actually logged-in in control center
 */

import { RequestHandler } from 'express';
import axios, { AxiosError } from 'axios';
import logger from '../logger/index';
import { InvalidMiddlewareInput } from '../errors/InvalidMiddlewareInput';

interface IControlCenterSessionError {
  error: {
    code: string; // ex. "NOAUT005"
    message: string; // ex "session unavailable"
    name: string; // ex. "SESSION_NOT_FOUND"
    stack: string; // ex. SESSION_NOT_FOUND: session unavailable at ..full stack ..
    statusCode: number; // ex. 404
  };
}

interface IControlCenterSessionResponse {
  identity: {
    firstname: string;
    id: string; // ex. 2fae0971-9b09-411e-9534-7bca6bd4901c which could be DB id
    lastname: string;
    type: string; // ex. super_admin
    metadata: {
      individualId: string; // ex. 2a9a41e3-472e-4120-a21c-5532a7f8cbd3 which looks like user id
    };
  };
}

/**
 * @public
 *
 * Given controlCenterUrl returns middleware which checks if
 * user making this request is actually logged in control center
 * by validating control center session cookie received in this
 * with control center. If session is valid in control center server
 * then next middleware is called else responds with invalid session error.
 *
 * @param controlCenterUrl
 */
const checkSessionWithControlCenter = (
  controlCenterUrl: string
): RequestHandler => async (req, res, next): Promise<void> => {
  try {
    const { cookies = {} } = req;
    const {
      controlCenterCookie,
      'connect.sid': controlCenterOrigCookie,
    } = cookies as {
      controlCenterCookie: string;
      'connect.sid'?: string;
    };

    // Check if control center session cookie is present in request
    // TODO: cleanup controlCenterOrigCookie and controlCenterCookie and just have one
    if (!controlCenterCookie && !controlCenterOrigCookie) {
      throw new InvalidMiddlewareInput(
        `Session Expired`,
        400,
        `Your session has expired please refresh the browser and login again to continue.`
      );
    }

    /**
     * Check if the incoming control center session cookie is still
     * valid in control center
     */
    await axios.get<IControlCenterSessionResponse>(
      `${controlCenterUrl}/channel-api/auth/session`,
      {
        headers: {
          cookie: controlCenterOrigCookie
            ? `connect.sid=${encodeURIComponent(controlCenterOrigCookie)}`
            : controlCenterCookie,
        },
      }
    );

    next();
  } catch (error: unknown) {
    const errorUrl = '/ifdkibana/errors';

    let errorMessage: string;
    let errorReason: string;
    let httpStatusCode: number;

    if (error instanceof InvalidMiddlewareInput) {
      ({ errorMessage, errorReason, httpStatusCode } = error.toJSON());
    } else if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError<IControlCenterSessionError>;
      const responseErrorName = axiosError.response?.data.error.name;

      httpStatusCode = axiosError.response?.status || 500;
      errorReason = axiosError.message;
      errorMessage = errorReason;

      if (responseErrorName) {
        errorMessage = `${errorMessage}. ${responseErrorName}.`;
      }

      if (httpStatusCode === 404) {
        errorMessage = `${errorMessage}
          NOTE: Session is not valid. Make sure you are logged in Control Center`;
      } else {
        errorMessage = `${errorMessage}
          NOTE: Error while checking session validity with control center. Make sure you are logged in Control Center`;
      }
    } else {
      // Should never come here
      httpStatusCode = 500;
      errorReason = (error as Error).message || 'Unknown error occurred';
      errorMessage = (error as Error).stack || 'Unknown error stack';

      logger.error(
        `Error while proxying to control center URL='${controlCenterUrl}'. ${error}`
      );
    }

    res.redirect(
      `${errorUrl}?errorMessage=${encodeURIComponent(
        errorMessage
      )}&errorReason=${encodeURIComponent(
        errorReason
      )}&httpStatusCode=${httpStatusCode}`
    );
  }
};

export { checkSessionWithControlCenter };

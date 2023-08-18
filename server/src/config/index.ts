/**
 * User: abhijit.baldawa
 *
 * This module exposes methods to fetch environment variables
 */

import "dotenv/config";

/**
 * @public
 *
 * This method returns the port number, from environment variable,
 * on which the server should run
 */
const getPort = (): number => {
  const { PORT } = process.env;

  if (!PORT) {
    throw new Error(`'PORT' environment variable is not set`);
  }

  const PORT_NUM = +PORT;

  if (Number.isNaN(PORT_NUM)) {
    throw new Error(`'PORT' environment variable is not a valid number`);
  }

  return PORT_NUM;
};

export { getPort };

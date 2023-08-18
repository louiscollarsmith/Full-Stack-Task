/**
 * User: abhijit.baldawa
 *
 * This module exposes methods to fetch environment variables
 */

import 'dotenv/config';

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

/**
 * @public
 *
 * Returns kibana server URL from environment variable
 */
const getKibanaServerUrl = (): string => {
  const { KIBANA_URL } = process.env;

  if (!KIBANA_URL) {
    throw new Error(`'KIBANA_URL' environment variable is not set`);
  }

  return KIBANA_URL;
};

/**
 * @public
 *
 * Returns control center URL from environment variable
 */
const getControlCenterUrl = (): string => {
  const { CONTROL_CENTER_URL } = process.env;

  if (!CONTROL_CENTER_URL) {
    throw new Error(`'CONTROL_CENTER_URL' environment variable is not set`);
  }

  return CONTROL_CENTER_URL;
};

export { getPort, getKibanaServerUrl, getControlCenterUrl };

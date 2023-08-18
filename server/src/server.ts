/**
 * User: abhijit.baldawa
 *
 * This module initializes all the pre-requisites and then
 * starts ifd kibana proxy server
 */

import express from "express";
import logger from "./logger";
import { getPort } from "./config";
import { getAppRouter } from "./routes";

/**
 * @public
 *
 * Async method which does all the standard server startup routine.
 */
const start = async (): Promise<void> => {
  try {
    const app = express();
    const PORT = getPort();

    // Parse body as json
    app.use(express.json());

    // Add routes
    app.use(getAppRouter());

    // Start HTTP server
    await new Promise<void>((resolve, reject) => {
      app.listen(PORT, resolve).on("error", reject);
    });
    logger.info(`Server is listening on port = ${PORT}`);
  } catch (err) {
    logger.error(
      `Error while starting server. Error: ${(err as Error).stack}. Exiting...`
    );
  }
};

if (require.main === module) {
  start();
}

export { start };

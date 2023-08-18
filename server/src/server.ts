/**
 * User: abhijit.baldawa
 *
 * This module initializes all the pre-requisites and then
 * starts ifd kibana proxy server
 */

import path from "path";
import express from "express";
// import cookieParser from 'cookie-parser';
import cors from "cors";
import logger from "./logger";
import {
  getPort,
  getKibanaServerUrl /* getControlCenterUrl */,
} from "./config";
import { getKibanaProxyMiddleware } from "./middleware/proxy/kibana";
// import { checkSessionWithControlCenter } from './middleware/session';
import kibanaRouter from "./routes/kibana.routes";
import healthCheckRouter from "./routes/healthCheck.router";
import errorsRouter from "./routes/errors.router";
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

    app.use(express.json());

    // Add routes
    app.use(getAppRouter());
    app.use("/hello", (req, res) => {
      res.json({ success: "hello" });
    });

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

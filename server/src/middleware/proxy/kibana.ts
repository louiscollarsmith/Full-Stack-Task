/**
 * User: abhijit.baldawa
 *
 * This module exposes middleware to proxy incoming
 * requests to kibana server
 */

import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

/**
 * @public
 *
 * Given 'kibanaUrl' returns middleware which proxies
 * incoming request to provided kibanaUrl
 *
 * @param kibanaUrl - The URL of kibana server to which
 *                    requests needs to be proxied
 */
const getKibanaProxyMiddleware = (kibanaUrl: string): RequestHandler =>
  createProxyMiddleware({
    target: kibanaUrl,
    changeOrigin: true,
  });

export { getKibanaProxyMiddleware };

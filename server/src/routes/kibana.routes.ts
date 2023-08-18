/**
 * User: abhijit.baldawa
 *
 * This module exposes all the routes for "/cookies" endpoint
 */

import express, { Router } from 'express';
import { setKibanaUrl } from '../controllers/kibana.controller';

const router = Router();

router.post(
  '/setKibanaUrl',
  express.urlencoded({ extended: false }),
  setKibanaUrl
);

export default router;

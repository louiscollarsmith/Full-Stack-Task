/**
 * User: abhijit.baldawa
 *
 * This module exposes all the routes for "/errors" endpoint
 */

import { Router } from 'express';
import { genericErrorHandler } from '../controllers/errors.controller';

const router = Router();

router.get('/', genericErrorHandler);

export default router;

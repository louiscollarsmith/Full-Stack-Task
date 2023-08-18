/**
 * User: abhijit.baldawa
 *
 * This module exposes routes for "/ifdkibana/healthcheck" endpoint
 */

import { Router } from 'express';
import { healthCheck } from '../controllers/healthCheck.controller';

const router = Router();

router.get('/', healthCheck);

export default router;

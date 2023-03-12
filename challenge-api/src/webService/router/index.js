'use strict';
/**
 * @desc imports Routers
 * @version 1.0.0
 *
 */
import express from 'express';
import { ChallengeRouter } from './ChallengeRouter.js';
import { OrderbookRouter } from './OrderbookRouter.js';

const router = express.Router();

ChallengeRouter(router);
OrderbookRouter(router);
export default router;
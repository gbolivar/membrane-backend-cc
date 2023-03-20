/**
 * @desc imports Routers
 * @version 1.0.0
 *
 */
import express from 'express';
import { ChallengeRouter } from './ChallengeRouter.js';

const router = express.Router();

ChallengeRouter(router);
export default router;
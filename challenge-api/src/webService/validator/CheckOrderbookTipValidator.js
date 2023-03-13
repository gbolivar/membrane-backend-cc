'use strict';
import { param } from 'express-validator'
import { bittrexConfig } from '../../infrastructure/config/index.js';
let a = Object.keys(bittrexConfig.getPair()).map((key) => bittrexConfig.getPair()[key]);
export const CheckOrderbookTipValidator = [
    param('pair').isIn(Object.keys(bittrexConfig.getPair()).map((key) => bittrexConfig.getPair()[key]))
]

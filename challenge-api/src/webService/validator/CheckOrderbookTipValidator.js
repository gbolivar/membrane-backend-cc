'use strict';
import { param, query } from 'express-validator'
import { bittrexConfig } from '../../infrastructure/config/index.js';
let a = Object.keys(bittrexConfig.getPair()).map((key) => bittrexConfig.getPair()[key]);
export const CheckOrderbookTipValidator = [
    param('pair').isIn(Object.keys(bittrexConfig.getPair()).map((key) => bittrexConfig.getPair()[key]))
]
export const CheckEffectivePriceValidator = [
    param('pair').isIn(Object.keys(bittrexConfig.getPair()).map((key) => bittrexConfig.getPair()[key])),
    param('action').isIn(Object.keys(bittrexConfig.getOperation()).map((key) => bittrexConfig.getOperation()[key])),
    param('amount').isFloat({gt: 0.0}),
    query('priceLimit').optional().isFloat({gt: 0.0})
]
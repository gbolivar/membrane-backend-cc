'use strict';
import { OrderbookController } from '../controllers/index.js';
import { CheckOrderbookTipValidator, SchemaRequestValidator } from '../validator/index.js'
export const OrderbookRouter = (router) => {
    router.get("/orderbook/:pair", CheckOrderbookTipValidator, SchemaRequestValidator, OrderbookController.getTip);
}
'use strict';
import { OrderbookController } from '../controllers/index.js';
import { CheckOrderbookTipValidator, CheckEffectivePriceValidator, SchemaRequestValidator } from '../validator/index.js'
export const OrderbookRouter = (router) => {
    router.get("/orderbook/:pair", CheckOrderbookTipValidator, SchemaRequestValidator, OrderbookController.getTip);
    router.get("/effective-price/:pair/:action/:amount", CheckEffectivePriceValidator, SchemaRequestValidator, OrderbookController.getEffectivePrice);
}
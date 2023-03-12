'use strict';
import { OrderbookController } from '../controllers/index.js';
export const OrderbookRouter = (router) => {
    router.get("/orderbook/:pair", OrderbookController.getTip);
}
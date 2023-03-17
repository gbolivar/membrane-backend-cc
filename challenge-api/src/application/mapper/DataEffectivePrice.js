'use strict';

import { redis } from '../../infrastructure/store/redis/index.js';
import { log } from '../../infrastructure/utils/index.js';
import { ReturnEmptyException } from '../../application/exception/index.js';

import { MarketDepth } from './index.js'

log.load('DataEffectivePrice');
export const DataEffectivePrice = {
    async main(service, action, amount, priceLimit) {
        
        const msgEfectivePrice = (await redis.main()).get(service[0]);
        return await (await msgEfectivePrice.then((rows) => {
            if(JSON.parse(rows).length === 0){
                throw new ReturnEmptyException()
            }
            return MarketDepth.main(rows, service, action, amount, priceLimit);
        }))
    }
}
'use strict';

import { WsOrderbook } from "../../infrastructure/websocket/index.js";
import { log } from '../../infrastructure/utils/index.js'
import { DataOrderbookTip, MapperService } from '../mapper/index.js';
import { DataEffectivePrice } from "../mapper/DataEffectivePrice.js";


log.load('ProcessDataOrderbookService');

export const ProcessDataOrderbookService = {
    async getTip(pair) {
        let nlength = 1;
       log.info('process getService');
       let service = await MapperService.getService(pair, nlength);

       log.info('ws client orderbook');
       await WsOrderbook.main(service, nlength);

       log.info('tip orderbook main');
       const orderbook = await DataOrderbookTip.main(service);
       return orderbook;
    },

    async getEffectivePrice(pair, action, amount, priceLimit) {
        let nlength = 500;
        log.info('process getService');
        let service = await MapperService.getService(pair, nlength);
        
        log.info('ws client orderbook');
        await WsOrderbook.main(service, nlength);

        log.info('effective price main');
        return await DataEffectivePrice.main(service, action, amount, priceLimit);
    }

}
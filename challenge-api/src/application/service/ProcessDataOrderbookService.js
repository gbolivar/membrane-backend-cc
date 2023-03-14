import { WsOrderbook } from "../../infrastructure/websocket/index.js";
import { log } from '../../infrastructure/utils/index.js'
import { DataOrderbookTip, MapperService } from '../mapper/index.js';
import { DataEffectivePrice } from "../mapper/DataEffectivwPrice.js";


log.load('ProcessDataOrderbookService');

export const ProcessDataOrderbookService = {
    async getTip(pair) {
       log.info('process getService');
       let service = await MapperService.getService(pair, 1);

       log.info('ws client orderbook');
       await WsOrderbook.main(service);

       log.info('tip orderbook main');
       const orderbook = await DataOrderbookTip.main(service);
       return orderbook;
    },

    async getEffectivePrice(pair, action, amount, priceLimit) {
        log.info('process getService');
        let service = await MapperService.getService(pair, 500);
 
        log.info('ws client orderbook');
        await WsOrderbook.main(service);

        log.info('effective price main');
        const effectivePrice = await DataEffectivePrice.main(service, action, amount, priceLimit);
        return effectivePrice;

    }

}
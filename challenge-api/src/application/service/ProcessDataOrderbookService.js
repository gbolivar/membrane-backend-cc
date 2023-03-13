import { WsOrderbook } from "../../infrastructure/websocket/index.js";
import { log } from '../../infrastructure/utils/index.js'
import { DataOrderbookTip, MapperService } from '../mapper/index.js';


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
    }

}
import {WsOrderbook} from "../../infrastructure/websocket/index.js";
import { buffer, log} from '../../infrastructure/utils/index.js'
import { DataOrderbookTip, MapperService } from '../mapper/index.js';

log.load('ProcessDataOrderbookService');

export const ProcessDataOrderbookService = {
    async getTip(pair) {
       let service = MapperService.getService(pair, 1);
       await WsOrderbook.main(service, buffer);
       return await DataOrderbookTip.main(buffer);
    }

}
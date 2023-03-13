
import { redis } from '../../infrastructure/store/redis/index.js';
import { log } from '../../infrastructure/utils/index.js';
import { ReturnDataOrderbook } from './index.js'


let dataBidDeltas = {quantity: 0, rate: 0};
let dataAskDeltas = {quantity: 0, rate: 0};
log.load('DataOrderbookTip');
export const DataOrderbookTip = {
    async main(service) {
        const msgOrderbook = (await redis.main()).get(service);
        const dataTipTmp = await (await msgOrderbook.then((rows) => {
            return DataOrderbookTip.processTip(rows);
        }))
        return dataTipTmp;
        
    },
    processTip(dataTipResponse) {
        log.info('processTip:('+JSON.stringify(dataTipResponse)+')')
        if (dataTipResponse !== null || dataTipResponse !== undefined) {
            const dataFormat = JSON.parse(dataTipResponse)
            log.debug(JSON.stringify(dataFormat))
            const bidDeltas =  dataFormat.bidDeltas
            const askDeltas =  dataFormat.askDeltas

            if(bidDeltas != []){
                for(const element of bidDeltas){
                    if(element.quantity != 0){
                    dataBidDeltas.quantity = element.quantity;
                    dataBidDeltas.rate = element.rate;
                    }
                } 
            }
            
            if(askDeltas != []){
                for(const element of askDeltas){
                    if (element.quantity != 0) {
                    dataAskDeltas.quantity = element.quantity;
                    dataAskDeltas.rate = element.rate;
                    }
                } 
            }
            if (dataBidDeltas.quantity !== 0 || dataAskDeltas.quantity !== 0){
                return ReturnDataOrderbook.main(dataBidDeltas, dataAskDeltas);
            }
        }
    }
}

import { redis } from '../../infrastructure/store/redis/index.js';
import { log } from '../../infrastructure/utils/index.js';
import { ReturnDataOrderbook } from './index.js'

let amount = 0;
let priceLimit = 1;
let dataBidDeltas = [];
let dataAskDeltas = [];

log.load('DataEffectivePrice');
export const DataEffectivePrice = {
    async main(service, action, amount, priceLimit) {
        
        const msgEfectivePrice = (await redis.main()).get(service);

        const dataTipTmp = await (await msgEfectivePrice.then((rows) => {
            return DataEffectivePrice.processEffectivePrice(rows);
        }))
        return dataTipTmp;
        
    },
    processEffectivePrice(dataPricesResponse) {
        console.log(dataPricesResponse)
        
    },
    calculateEffectivePrice(){
        
    }
}
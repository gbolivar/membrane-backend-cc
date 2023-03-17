'use strict';

import { log } from '../../infrastructure/utils/index.js';
import { bittrexConfig } from '../../infrastructure/config/index.js';
import { CalculateEffective } from './index.js';

let amountLocal = 0;
let serviceLocal = 0;
let priceLimitLocal = 1;
let dataAskDeltas = [];
let dataBidDeltas = [];


function sortByRateAskLocal (a, b) {return a.rate - b.rate}
function sortByRateBidLocal (a, b) {return b.rate - a.rate}


log.load('MarketDepth');
export const MarketDepth = {
    async main(items, service, action, amount, priceLimit = 0){
        amountLocal = amount;
        serviceLocal = service;
        if (priceLimit) {
            priceLimitLocal = priceLimit;
        }
        log.info('MarketDepth->main:rows:'+items.toString());
        // Get Buy
        if(action.toLowerCase() === bittrexConfig.getOperation()[0]) {
           return await MarketDepth.processBuy(items)
        // Get Sell
        } else if(action.toLowerCase() === bittrexConfig.getOperation()[1]) {
           return await MarketDepth.processSell(items);
        }

    },
    async processBuy(rows) {
        log.info('MarketDepth->processBuy:'+rows.toString());
        const askDeltasRowsLocal = await MarketDepth.changeArrayToDelta(rows, 'askDeltas')
        return await MarketDepth.localProcess(askDeltasRowsLocal, dataAskDeltas, sortByRateAskLocal);
    },
    async processSell(rows){
        log.info('MarketDepth->processBuy:'+rows.toString());
        const bidDeltasRowsLocal = await MarketDepth.changeArrayToDelta(rows, 'bidDeltas');
        return await MarketDepth.localProcess(bidDeltasRowsLocal, dataBidDeltas, sortByRateBidLocal);
    },
    async changeArrayToDelta(rows, idx){
        let dataTemp = []
        JSON.parse(rows).forEach(element => {
            if (element[idx]){
                dataTemp.push(element[idx])
            }
        });
        return dataTemp;
    },
    async localProcess(data, current, orderByRateLocal){
        let caseData = true; 

        for(let i=0; i<data.length; i++){
            for(const element of current){
              if(data[i].rate === element.rate){
                    element.quantity = data[i].quantity
                    caseData = false;
              } 
            }
            if(caseData){
                current.push(data[i])
            }
            caseData = true
        }

        current = current.filter(item => item.quantity !== '0').sort(orderByRateLocal);
  
        return await CalculateEffective.main(current, priceLimitLocal, amountLocal);
    }
}
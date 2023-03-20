'use strict';

import { log } from '../../infrastructure/utils/index.js';
import { bittrexConfig } from '../../infrastructure/config/index.js';
import { CalculateEffective } from './index.js';

let amountLocal = 0;
let serviceLocal = 0;
let priceLimitLocal = -1;
let dataAskDeltas = [];
let dataBidDeltas = [];


function sortByRateAskLocal (a, b) {return a.rate - b.rate}
function sortByRateBidLocal (a, b) {return b.rate - a.rate}


log.load('MarketDepth');
export const MarketDepth = {
    async main(items, service, action, amount, priceLimit){
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
        const askDeltasRowsLocal = await MarketDepth.changeArrayToDelta(rows, 'askDeltas');
        const askDeltasRowsLocalFilter = await MarketDepth.filterArrayToDelta(askDeltasRowsLocal, sortByRateAskLocal);
        console.debug('Start askDeltas:');
        console.debug(askDeltasRowsLocalFilter);
        console.debug('End askDeltas:');
        return await CalculateEffective.main(askDeltasRowsLocalFilter, priceLimitLocal, amountLocal);
    },
    async processSell(rows){
        log.info('MarketDepth->processBuy:'+rows.toString());
        const bidDeltasRowsLocal = await MarketDepth.changeArrayToDelta(rows, 'bidDeltas');
        const bidDeltasRowsLocalFilter = await MarketDepth.filterArrayToDelta(bidDeltasRowsLocal, sortByRateBidLocal);
        console.debug('Start bidDeltas:');
        console.debug(bidDeltasRowsLocalFilter);
        console.debug('End bidDeltas:');
        return await CalculateEffective.main(bidDeltasRowsLocalFilter, priceLimitLocal, amountLocal);
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
    async filterArrayToDelta(rows, orderByRateLocal){
        const dataTemp = []
        const rowsFilter = rows.filter(data => data.length>0)
        rowsFilter.forEach(data => {
            let tmp = data.filter(item => (item.quantity !== '0'))
            dataTemp.push(tmp[0])
        });
        return dataTemp.sort(orderByRateLocal);
    }
}

'use strict';

export const MapperService = {
    async getService(marketSymbol, depth) {
       return ['orderbook_'+marketSymbol+'_'+depth];
    }

}
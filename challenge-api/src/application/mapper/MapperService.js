export const MapperService = {
    getService(marketSymbol, depth) {
       return ['orderbook_'+marketSymbol+'_'+depth];
    }

}
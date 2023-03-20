export const amountFixtureLocalA = 5;
export const amountFixtureLocalB = 7;

export const MainFixtureTest = {
    servicePair(){
        return [
            {"name":"BTC-USD", "depth":1},
            {"name":"ETH-USD", "depth":1},
            {"name":"BTC-USD", "depth":500},
            {"name":"ETH-USD", "depth":500},
        ]
    },
    dataOrderbookTip(){
        return JSON.stringify([{
            "marketSymbol": "BTC-USD",
            "depth": 1,
            "sequence": 291346,
            "bidDeltas": [{"quantity": "0.44417689","rate": "27539.008000000000"}, 
                          {"quantity": "0","rate": "27539.007000000000"}],
            "askDeltas": [{"quantity": "0.14558048","rate": "22388.699000000000"},
                          {"quantity": "0","rate": "22388.700000000000"}]
        }]);
    },
    dataOrderbookTipValid(){
        return {quantity: "0.14558048", rate: "22388.699000000000"}
    },
    dataEfectivePriceBuy(){
        return [
            { quantity: '0.28200000', rate: '27684.400000000000' },
            { quantity: '0.11637500', rate: '27672.968000000000' },
            { quantity: '0.10000000', rate: '20313.000000000000' },
            { quantity: '0.10000000', rate: '20313.000000000000' },
            { quantity: '0.00019701', rate: '20260.257000000000' }
          ]
    },
    dataEfectivePriceSell(){
        return [
            { quantity: '0.30800000', rate: '27544.900000000000' },
            { quantity: '0.01032960', rate: '28150.983000000000' },
            { quantity: '0', rate: '27944.700000000000' },
            { quantity: '0.19032960', rate: '28159.983000000000' },
            { quantity: '0.12515505', rate: '27570.726000000000' },
            { quantity: '0', rate: '41878.925000000000' },
            { quantity: '0.12515505', rate: '27570.726000000000' },
            { quantity: '0.10022372', rate: '41878.325000000000' }
        ]
    },
    dataServiceOnePair(){
        return 'orderbook_BTC-USD_500';
    },
    priceLimit(){
        return  0.2;
    },
    priceLimitNegative(){
        return  -1;
    },
    amount(){
        return 0.5;
    },
    dataTestBuy(){
        return 0.0000072242851569837165;
    }, 
    dataTestBuyPrice(){
        return 13091.751075999999;
    },
    dataTestSell(){
        return 0.000014485157405566938;
    },
    dataTestSellPrice(){
        return 13890.452969599999;
    }
}
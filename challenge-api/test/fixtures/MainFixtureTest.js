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
        return JSON.stringify([
            { quantity: '0.00800000', rate: '27544.700000000000' },
            { quantity: '0.01032960', rate: '28150.083000000000' },
            { quantity: '0', rate: '27944.700000000000' },
            { quantity: '0.09032960', rate: '28159.083000000000' },
            { quantity: '0.02515505', rate: '27570.726000000000' },
            { quantity: '0', rate: '51878.325000000000' },
            { quantity: '0.02515505', rate: '27570.726000000000' },
            { quantity: '0.00022372', rate: '41878.325000000000' }
        ])
    },
    dataEfectivePriceSell(){
        return JSON.stringify([
            { quantity: '0.30800000', rate: '27544.900000000000' },
            { quantity: '0.01032960', rate: '28150.983000000000' },
            { quantity: '0', rate: '27944.700000000000' },
            { quantity: '0.19032960', rate: '28159.983000000000' },
            { quantity: '0.12515505', rate: '27570.726000000000' },
            { quantity: '0', rate: '41878.925000000000' },
            { quantity: '0.12515505', rate: '27570.726000000000' },
            { quantity: '0.10022372', rate: '41878.325000000000' }
        ])
    },
    dataServiceOnePair(){
        return 'orderbook_BTC-USD_500'
    }
}
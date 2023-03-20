import {assert} from 'chai';
import { MainFixtureTest } from './fixtures/index.js';
import { MarketDepth } from '../src/application/mapper/index.js';
const priceLimit = 0.2;
const actionBuy = "buy";
const actionSell = "sell";
const amount = 0.5;
const dataTestBuy = 0.000008933078246306318;
const dataTestSell = 0.000008933078246306318;

describe('Effective Price', function () {
    it('Check buy service: '+MainFixtureTest.dataServiceOnePair(), async function () {
        const items = MainFixtureTest.dataEfectivePriceBuy()
        const service = MainFixtureTest.dataServiceOnePair()
        const mkd = await MarketDepth.main(items, service, actionBuy, amount, priceLimit)
        
        assert.equal(mkd.maximumOrde, dataTestBuy);
    })

    it('Check sell service: '+MainFixtureTest.dataServiceOnePair(), async function () {
        const items = MainFixtureTest.dataEfectivePriceSell()
        const service = MainFixtureTest.dataServiceOnePair()
        const mkd = await MarketDepth.main(items, service, actionSell, actionSell, priceLimit)
        assert.equal(mkd.maximumOrde, dataTestSell);
    })
});


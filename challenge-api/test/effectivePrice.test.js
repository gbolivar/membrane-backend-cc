import {assert} from 'chai';
import { MainFixtureTest } from './fixtures/index.js';
import { CalculateEffective } from '../src/application/mapper/index.js';
const priceLimit = 0.2;
const amount = 0.5;
const dataTestBuy = 0.0000072242851569837165;
const dataTestBuyPrice = 13091.751075999999
const dataTestSell = 0.000014485157405566938;
const dataTestSellPrice = 13890.452969599999;


describe('Effective Price', function () {
    it('Check buy service: '+MainFixtureTest.dataServiceOnePair(), async function () {
        const currentLocal = MainFixtureTest.dataEfectivePriceBuy()
        const mkd = await CalculateEffective.main(currentLocal, MainFixtureTest.priceLimit(), MainFixtureTest.amount())
        assert.equal(mkd.maximumOrde, MainFixtureTest.dataTestBuy());
    })

    it('Check sell service: '+MainFixtureTest.dataServiceOnePair(), async function () {
        const currentLocal = MainFixtureTest.dataEfectivePriceSell()
        const mkd = await CalculateEffective.main(currentLocal, MainFixtureTest.priceLimit(), MainFixtureTest.amount())
        assert.equal(mkd.maximumOrde, MainFixtureTest.dataTestSell());
    })

    it('Check buy  priceLimit -1 service: '+MainFixtureTest.dataServiceOnePair(), async function () {
        const currentLocal = MainFixtureTest.dataEfectivePriceBuy()
        const mkd = await CalculateEffective.main(currentLocal, MainFixtureTest.priceLimitNegative(), MainFixtureTest.amount())
        assert.equal(mkd.expeditedPrice, MainFixtureTest.dataTestBuyPrice());
    })

    it('Check sell  priceLimit -1 service: '+MainFixtureTest.dataServiceOnePair(), async function () {
        const currentLocal = MainFixtureTest.dataEfectivePriceSell()
        const mkd = await CalculateEffective.main(currentLocal, MainFixtureTest.priceLimitNegative(), MainFixtureTest.amount())
        assert.equal(mkd.expeditedPrice, MainFixtureTest.dataTestSellPrice());
    })
});


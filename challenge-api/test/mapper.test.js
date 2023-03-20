import {assert} from 'chai';
import { MainFixtureTest } from './fixtures/index.js';
import { MapperService, DataOrderbookTip } from '../src/application/mapper/index.js';
describe('Mapper', function () {
  describe('#MapperService(marketSymbol, depth)', async function () {
    MainFixtureTest.servicePair().forEach(async function (row) {
      let format = 'orderbook_'+row.name+'_'+row.depth;
      let mpService = await MapperService.getService(row.name, row.depth);
        it('Check service '+format+'', () => {
          assert.equal(format, mpService[0]);
        })
    })
  });
  describe('#DataOrderbookTip(data)', async function () {
    const datTip = await DataOrderbookTip.processTip(MainFixtureTest.dataOrderbookTip());
    it('Check askDelta quantity ', () => {
      const respDelta = MainFixtureTest.dataOrderbookTipValid();
      assert.equal(datTip.askDelta.quantity, respDelta.quantity);
    })

    it('Check askDelta rate', () => {
      //dataOrderbookTipValid
      const respDelta = MainFixtureTest.dataOrderbookTipValid();
      assert.equal(datTip.askDelta.rate, respDelta.rate);
    })
  });
});

import { expect, test } from '@jest/globals';
import { ProcessDataOrderbookService } from '../src/application/service/index.js';

describe('Order book tips', () => {
    test('Execute tip', () => {
        describe.each([
            {
                describe: 'GET PAIR BTC-USDT',
                pair: 'BTC-USDT'
            },
            {
                describe: 'GET PAIR ETH-USDT',
                pair: 'ETH-USDT'
            }
        ])('$describe', ({pair}) => {
            ProcessDataOrderbookService.getTip(pair)
        })
    })
})
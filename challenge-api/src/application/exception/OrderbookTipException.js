'use strict';

export class OrderbookTipException extends Error {
    constructor(message = 'Failed to extract pairs from the order book ') {
        super(message);
    }
}
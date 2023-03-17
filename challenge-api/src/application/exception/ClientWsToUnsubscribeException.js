'use strict';

export class ClientWsToUnsubscribeException extends Error {
    constructor(message = 'Failed Unsubscribe order book. ') {
        super(message);
    }
}
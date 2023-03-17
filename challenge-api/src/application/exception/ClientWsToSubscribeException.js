'use strict';

export class ClientWsToSubscribeException extends Error {
    constructor(message = 'Failed Subscribe order book. ') {
        super(message);
    }
}
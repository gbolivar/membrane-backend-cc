export class ClientWsToConnectException extends Error {
    constructor(message = 'Failed connect order book. ') {
        super(message);
    }
}
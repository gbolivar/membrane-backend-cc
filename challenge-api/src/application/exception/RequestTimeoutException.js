'use strict';

export class RequestTimeoutException extends Error {
    constructor(message = 'Request timed out') {
      super(message);
    }
}
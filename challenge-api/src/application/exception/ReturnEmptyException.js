'use strict';

export class ReturnEmptyException extends Error {
    constructor(message = 'An unexpected error retries.') {
      super(message);
    }
}
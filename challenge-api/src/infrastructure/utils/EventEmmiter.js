import { EventEmitter } from 'events';

export const eventEmitter = {
    invoke(){
        return new EventEmitter()
    }
}
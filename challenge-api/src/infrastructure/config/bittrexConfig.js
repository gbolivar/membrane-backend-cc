'use strict';
export const bittrexConfig = {
    getPair() {
        return JSON.parse(process.env.BITTREX_WS_PAIR)
    },
    getOperation() {
        return JSON.parse(process.env.BITTREX_WS_OPERATION)
    },
    getUri() {
        return process.env.BITTREX_WS_URI
    },
    getVersion() {
        return JSON.parse(process.env.BITTREX_WS_VER)
    }
}
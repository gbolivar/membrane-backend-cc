'use strict';
import { redisConfig } from '../../config/index.js';
import Redis from 'ioredis';
// @doc https://www.npmjs.com/package/ioredis
// @doc https://www.dofactory.com/javascript/design-patterns/singleton

export const redis = (function () {
    let instance;

    async function createInstance() {
        let object = new Redis(redisConfig.config);
        return object;
    }

    return {
        main: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
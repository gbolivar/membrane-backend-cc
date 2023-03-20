'use strict';

export const redisConfig = {
  config: {
    port: process.env.RD_PORT,
    host: process.env.RD_HOST, 
    db: 0, // Defaults to 0,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    autoResubscribe: false,
    lazyConnect: true
  },
  expire: { 
    expireOrderbook: process.env.RD_TTL
  }
}

import { log } from '../utils/index.js';
import { bittrexConfig, redisConfig } from '../config/index.js';
import { client as signalR } from 'signalr-client';
import { inflateRaw } from 'zlib';
import { ClientWsToConnectException, ClientWsToSubscribeException, ClientWsToUnsubscribeException } from '../../application/exception/index.js';
import { redis } from '../store/redis/index.js';
let wsClient;
log.load('WsOrderbook');
let serviceTmp;

let matriz = [];
let nlengthLocal = 0;


let resolveInvocationPromise = () => { };
export const WsOrderbook = {
  async main(service, nlength) {
    serviceTmp = service;
    nlengthLocal = nlength
    wsClient = await WsOrderbook.connect();
    await WsOrderbook.subscribe(wsClient, service);
    WsOrderbook.close(wsClient, service);
  },
  
  async connect() {
    return new Promise((resolve) => {
      try{ 
        
        const client = new signalR(bittrexConfig.getUri(), bittrexConfig.getVersion());
        client.serviceHandlers.messageReceived = WsOrderbook.messageReceived;
        client.serviceHandlers.connected = () => {
            log.info('Connected');
          return resolve(client)
        }
      }catch(err){
        log.error('The client has been unable to connect:' + err)
        throw new ClientWsToConnectException(err)
      }
    });
  },
  
  async Offline(client) { 
    try{
      client.end();
      log.info('Offline');
    }catch(err){
        log.error('Failed to Offline', err);
    }
    
  },
  
  async subscribe(client, channel) {
    try {
      await WsOrderbook.invoke(client, 'subscribe', channel);  
      log.info('Subscription to "' + channel + '" successful');
    }catch(err){
        log.error('Subscription to "' + channel + '" failed: ' + err);
      throw new ClientWsToSubscribeException(err);
    }
  },
  
  async unsubscribe(client, channel){
    try {
      await WsOrderbook.invoke(client, 'Unsubscribe', channel); 
      WsOrderbook.Offline(client);
      log.info('Unsubscription to "' + channel + '" successful');
    }catch(err){
        log.error('Unsubscription to "' + channel + '" failed: ' + err);
      throw new ClientWsToUnsubscribeException(err);
    }
  },
  
  async invoke(client, method, ...args) {
    log.info('invoke:'+method);
    return new Promise((resolve, reject) => {
      resolveInvocationPromise = resolve
      client.call(bittrexConfig.getVersion()[0], method, ...args)
        .done(function (err) {
          if (err) { return reject(err); }
        });
    })
  },
  
  async messageReceived(message) {
    const data = JSON.parse(message.utf8Data);
    if(data['R']) resolveInvocationPromise(data.R)
    if (data['M']) {
      data.M.forEach(function (m) {
        if (m['A']) {
          if (m.A[0]) {
            const b64 = m.A[0];
            const raw = new Buffer.from(b64, 'base64');
            inflateRaw(raw, function (err, inflated) {
              if (!err) {
                if (inflated.toString('utf8') != undefined) {
                  log.debug('WsOrderbook:'+JSON.stringify(inflated.toString('utf8'))) 
                  matriz.push(inflated.toString('utf8'))
                }
              }
            });
           
          }
        }
      });
      let dataJsonString = await WsOrderbook.parserJsonFn(matriz);
      await WsOrderbook.cache(dataJsonString);//"["+matriz.toString('utf8')+"]");
    }
  },
  async cache(dataJson) { 
    (await redis.main()).del(serviceTmp);
    (await redis.main()).set(serviceTmp, dataJson);
    (await redis.main()).expire(serviceTmp, redisConfig.expire.expireOrderbook);
  },
  async close(client, channel) {
   return new Promise((resolve, reject) => {
      setTimeout(()=>{
        WsOrderbook.unsubscribe(client, channel)
      }, 1000)
    })
  },
  async parserJsonFn(matriz){
    let dataJson = [];
    for(let i=0;i<nlengthLocal; i++){
      if (matriz[i]) {
        dataJson.push(matriz[i]);
      }
    }
    return '['+dataJson.toString('utf8')+']';
  }
}
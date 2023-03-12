import { log, eventEmitter } from '../utils/index.js';
import { bittrexConfig } from '../config/index.js';
import { client as signalR } from 'signalr-client';
import { inflateRaw } from 'zlib';
import { ClientWsToConnectException, ClientWsToSubscribeException, ClientWsToUnsubscribeException } from '../../application/exception/index.js';
let wsClient;
let buffe;
log.load('WsOrderbook');

let resolveInvocationPromise = () => { };
export const WsOrderbook = {
  async main(service, Tbuffe) {
    wsClient = await WsOrderbook.connect();
    buffe =  Tbuffe;
    await WsOrderbook.subscribe(wsClient, service);
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
      const unsuscribeT = WsOrderbook.unsubscribe.bind({ client: client, channel: channel });
      eventEmitter.invoke().once('FinishedProcessing', unsuscribeT);
    }catch(err){
        log.error('Subscription to "' + channel + '" failed: ' + err);
      throw new ClientWsToSubscribeException(err);
    }
  },
  
  async unsubscribe(){
    try {
      await WsOrderbook.invoke(this.client, 'Unsubscribe', this.channel); 
      WsOrderbook.Offline(this.client);
      log.info('Unsubscription to "' + this.channel + '" successful');
    }catch(err){
        log.error('Unsubscription to "' + this.channel + '" failed: ' + err);
      throw new ClientWsToUnsubscribeException(err);
    }
  },
  
  async invoke(client, method, ...args) {
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
                const json = JSON.parse(inflated.toString('utf8'));
                buffe.push(json);
                eventEmitter.invoke().emit('newMessage');
              }
            });
          }
        }
      });
    }
  }
}

const webSocketService = require('./webSocketService');

class eventEmitterService {
    eventEmitter = new events.EventEmitter();
    static instance = null;
    constructor(){
        this.eventEmitter.on('loader',  function(progress){
              webSocketService.emitAll({topic:'loader', data:progress});
        });
        this.eventEmitter.on('message', function(message){
              webSocketService.emitAll({topic:'loader', data: message});
        });

    }
    static getInstance(){
        if(eventEmitterService.instance === null) {
             eventEmitterService.instance = new eventEmitterService();
        }
        return eventEmitterService.instance;
    }
}
module.export = eventEmitterService;

import { EventEmitter } from 'events';

const ClientService = {

    socket: null,
    heartbeat: null,
    events: new EventEmitter(),

connect(url) {
  if (!url) {
    console.warn('WS disabled: no URL');
    return;
  }

  try {
    this.socket = new WebSocket(url);
    this.socket.onopen = this._handleOpen.bind(this);
    this.socket.onclose = () => this.events.emit('closed');
    this.socket.onmessage = this._handleMessage.bind(this);
  } catch (e) {
    console.warn('WS disabled:', e);
  }
},



    _handleOpen() {
        this.events.emit('opened');
        this.heartbeat = setInterval(() => this.send('heartbeat', {}), 2000);
    },

    _handleMessage(msg) {
        const { type, payload } = this.parseEvents(msg);
        this.events.emit(type, payload);
    },

send(type, payload) {
    if (!this.socket || this.socket.readyState !== 1) return;
    this.socket.send(JSON.stringify({ type, payload }));
},

    parseEvents(msg) {
        const { data } = msg;
        const { type, payload } = JSON.parse(data);
        return { type, payload };
    }

};

export default ClientService;

// src/webSocketNotifier.js
class WebSocketNotifier {
  constructor(sessionCode) {
    const port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws?session=${sessionCode}`);
    this.handlers = [];

    this.socket.onopen = () => {
      this.receiveEvent({ from: 'System', type: 'connected', value: { msg: 'WebSocket connected' } });
    };

    this.socket.onclose = () => {
      this.receiveEvent({ from: 'System', type: 'disconnected', value: { msg: 'WebSocket disconnected' } });
    };

    this.socket.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data);
        this.receiveEvent(event);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  broadcastEvent(type, value) {
    const event = { type, value };
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(event));
    } else {
      console.warn('WebSocket is not open. Unable to send message:', event);
    }
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.handlers.forEach((handler) => handler(event));
  }
}

export default WebSocketNotifier;
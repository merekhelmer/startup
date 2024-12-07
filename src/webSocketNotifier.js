//src/webSocketNotifier.js

export class WebSocketNotifier {
    constructor() {
      const port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
      this.handlers = [];
  
      this.socket.onopen = () => {
        this.receiveEvent({ from: 'Startup', type: 'System', value: { msg: 'connected' } });
      };
  
      this.socket.onclose = () => {
        this.receiveEvent({ from: 'Startup', type: 'System', value: { msg: 'disconnected' } });
      };
  
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(msg.data);
          this.receiveEvent(event);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
  
      // Optional: Handle errors
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  
    broadcastEvent(from, type, value) {
      const event = { from, type, value };
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
  
  export const webSocketNotifier = new WebSocketNotifier();
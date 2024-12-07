// service/peerProxy.js
const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  let connections = [];

  httpServer.on('upgrade', (request, socket, head) => {
    if (request.url === '/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws };
    connections.push(connection);

    ws.on('message', (data) => {
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    ws.on('pong', () => {
      connection.alive = true;
    });

    ws.on('close', () => {
      connections = connections.filter((c) => c.id !== connection.id);
    });
  });

  // keep connections alive
  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 30000);
}

module.exports = { peerProxy };
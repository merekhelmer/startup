// service/peerProxy.js
const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const DB = require('./database.js');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  let connections = [];

  httpServer.on('upgrade', (request, socket, head) => {
    if (request.url.startsWith('/ws')) {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', (ws, request) => {
    const params = new URLSearchParams(request.url.replace('/ws?', ''));
    const sessionCode = params.get('session');
    const userId = uuid.v4();

    const connection = { id: userId, session: sessionCode, alive: true, ws };
    connections.push(connection);

    // notify others in the same session
    broadcastToSession(sessionCode, {
      type: 'userJoined',
      from: 'System',
      data: { userId },
    }, userId);

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data);
        switch (message.type) {
          case 'castVote':
            await handleCastVote(message, sessionCode, userId, ws);
            break;
          default:
            console.warn(`Unhandled message type: ${message.type}`);
            break;
        }
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });

    ws.on('pong', () => {
      connection.alive = true;
    });

    ws.on('close', () => {
      connections = connections.filter((c) => c.id !== userId);
      broadcastToSession(sessionCode, {
        type: 'userLeft',
        from: 'System',
        data: { userId },
      }, userId);
    });
  });

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

  async function handleCastVote(message, sessionCode, userId, ws) {
    const { movieId } = message.data;
    if (!movieId) {
      console.warn('Invalid vote data:', message.data);
      return;
    }

    try {
      await DB.addVote(sessionCode, movieId);
      const session = await DB.getSession(sessionCode);
      const updatedVotes = session.votes;

      broadcastToSession(sessionCode, {
        type: 'voteUpdated',
        from: 'System',
        data: { movieId, votes: updatedVotes[movieId] || 0 },
      }, userId);
    } catch (error) {
      console.error('Error processing vote:', error);
      ws.send(JSON.stringify({
        type: 'error',
        from: 'System',
        data: { msg: 'Failed to record your vote. Please try again.' },
      }));
    }
  }

  function broadcastToSession(sessionCode, message, excludeId = null) {
    connections.forEach((c) => {
      if (c.session === sessionCode && c.id !== excludeId && c.ws.readyState === WebSocket.OPEN) {
        c.ws.send(JSON.stringify(message));
      }
    });
  }
}

module.exports = { peerProxy };
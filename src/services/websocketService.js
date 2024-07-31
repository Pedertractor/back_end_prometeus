const { WebSocket } = require('ws');
let wss;
let clients = new Set();

function initializeWebSocket(server) {
  wss = new WebSocket.Server({ noServer: true });
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    clients.add(ws);
    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
}

function broadcastMessage(message) {
  const jsonmessage = JSON.stringify(message);
  if (wss && clients.size > 0) {
    clients.forEach((client) => {
      client.send(jsonmessage);
    });
  } else {
    // console.log('Nenhum cliente conectado ou WebSocket não inicializado.');
  }
}

module.exports = {
  initializeWebSocket,
  broadcastMessage,
};

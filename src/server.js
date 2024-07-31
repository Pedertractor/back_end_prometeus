const express = require('express');
const cors = require('cors');
const { apiRouter } = require('./router/routes');
const { initializeWebSocket } = require('./services/websocketService');
const { runAll } = require('./services/sendWebsocketInfo');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/thunder/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'endpoint not fould' });
});

const teste = app.listen(process.env.PORT, process.env.IP_SERVER, () => {
  console.log('running!');
});

initializeWebSocket(teste);

// return this fucntion when prometeus have datas
setInterval(() => {
  if (new Date().getHours() >= 5 && new Date().getHours() <= 16) {
    runAll();
  }
}, 2000);

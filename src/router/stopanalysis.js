const express = require('express');
const {
  createWhyProcessStop,
  reasonsForStopping,
} = require('../controllers/controllerStopAnalysis');

const routerStopAnalysis = express.Router();

routerStopAnalysis.post('/registerstop/:idPrometeus', createWhyProcessStop);

routerStopAnalysis.get(
  '/inforeasonsstop/:idPrometeus/:firstDate/:lastDate',
  reasonsForStopping
);

module.exports = {
  routerStopAnalysis,
};

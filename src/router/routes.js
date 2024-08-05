const express = require('express');

const {
  findWelding,
  findWeldinBead,
  listSquadWeldin,
  lastWeldBeadById,
} = require('../controllers/controllerInfoByWelding');

const {
  // getCicleWorkOrStop,
  getAllCicleWorkOrStop,
  getGasConsumptionValues,
  getCiclesWorkByPrometeus,
} = require('../controllers/controllerServiceCycle');

const { routerStopAnalysis } = require('./stopanalysis');
const { deviceRouter } = require('./devices');

const apiRouter = express.Router();

apiRouter.use('/whystop', routerStopAnalysis);
apiRouter.use(deviceRouter);

//rotas para verificar soldas de cada dispositivo
apiRouter.get('/weldings/:id/:first/:last', findWelding);
apiRouter.get('/specific/:id/:bead', findWeldinBead);

apiRouter.get('/prometeus/weldings/:id/:page/:pageSize', listSquadWeldin);
apiRouter.get('/lastweldbead', lastWeldBeadById); //use
apiRouter.get('/lastcycle', getAllCicleWorkOrStop); //use

apiRouter.get('/servicecycle/:ids/:first/:last', getCiclesWorkByPrometeus);
apiRouter.get('/gasconsumption/:ids/:first/:last', getGasConsumptionValues); //use

module.exports = { apiRouter };

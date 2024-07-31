const express = require('express');

const {
  createdNewProcess,
  getAllProcess,
  getProcessById,
  updateProcess,
} = require('../controllers/controllerNewProccess');

const {
  findWelding,
  findWeldinBead,
  listSquadWeldin,
  lastWeldBeadById,
} = require('../controllers/controllerInfoByWelding');

const {
  getCicleWorkOrStop,
  getAllCicleWorkOrStop,
  getGasConsumptionValues,
} = require('../controllers/controllerServiceCycle');

const { routerStopAnalysis } = require('./stopanalysis');

const apiRouter = express.Router();

apiRouter.use('/whystop', routerStopAnalysis);

//rotas para verificar e criar novos processos
apiRouter.post('/newprocess', createdNewProcess);
apiRouter.get('/allprocess', getAllProcess); // use
apiRouter.get('/findprometeus/:idPrometeus', getProcessById);
apiRouter.put('/updateprometeus/:idPrometeus', updateProcess);

//rotas para verificar soldas de cada processo
apiRouter.get('/weldings/:id/:first/:last', findWelding);
apiRouter.get('/specific/:id/:bead', findWeldinBead);

//for monitoramente
apiRouter.get('/prometeus/weldings/:id/:page/:pageSize', listSquadWeldin);
//this route get a last bead by id, use for graph home
apiRouter.get('/lastweldbead/:ids', lastWeldBeadById); //use
apiRouter.get('/lastcycle/:ids', getAllCicleWorkOrStop); //use

//rotas para verificar o controle de ciclo de serviço de cada prometeus
apiRouter.get('/servicecycle/:ids/:first/:last', getCicleWorkOrStop);
apiRouter.get('/gasconsumption/:ids/:first/:last', getGasConsumptionValues); //use

module.exports = { apiRouter };

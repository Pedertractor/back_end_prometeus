const express = require('express');
const {
  createdNewProcess,
  getAllProcess,
  getProcessById,
  updateProcess,
} = require('../controllers/controllerNewProccess');

const deviceRouter = express.Router();

deviceRouter.post('/newprocess', createdNewProcess);
deviceRouter.get('/allprocess', getAllProcess);
deviceRouter.get('/findprometeus/:idPrometeus', getProcessById);
deviceRouter.put('/updateprometeus/:idPrometeus', updateProcess);

module.exports = { deviceRouter };

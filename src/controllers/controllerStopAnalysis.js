const { calculateTest } = require('../helpers/calculateStopAnalyses');
const { prisma } = require('../services/prisma');

const createWhyProcessStop = async (req, res) => {
  try {
    const body = req.body;
    const { idPrometeus } = req.params;

    if (body && idPrometeus) {
      const statusRegisterStop = await prisma.stopAnalysis.create({
        data: {
          ...body,
          prometeusId: idPrometeus,
        },
      });

      if (statusRegisterStop) {
        await prisma.prometeus.update({
          where: {
            id: idPrometeus,
          },
          data: {
            status: statusRegisterStop.status,
          },
        });

        res.status(200).json({
          warning: 'status atualizado com sucesso!',
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const reasonsForStopping = async (req, res) => {
  try {
    const { idPrometeus, firstDate, lastDate } = req.params;

    //i use +1 for adquire a correct date, because if i remove +1 the function dont get interval
    const data = new Date(lastDate);
    data.setDate(data.getDate() + 1);

    const primeriaData = new Date(firstDate).toISOString();
    const ultimaData = data.toISOString();

    console.log(primeriaData, ultimaData);
    if (req.params) {
      const infoStopByPrometeus = await prisma.stopAnalysis.findMany({
        where: {
          prometeusId: idPrometeus,

          createdAt: {
            gte: primeriaData,
            lte: ultimaData,
          },
        },
      });

      if (infoStopByPrometeus) {
        const result = calculateTest(infoStopByPrometeus);

        res.status(200).json(result);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createWhyProcessStop,
  reasonsForStopping,
};

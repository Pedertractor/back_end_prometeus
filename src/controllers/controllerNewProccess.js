const { prisma } = require('../services/prisma');

const getAllProcess = async (req, res) => {
  try {
    const allProcess = await prisma.prometeus.findMany();

    if (allProcess) res.status(200).json(allProcess);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: 'erro interno no servidor',
    });
  }
};

const getProcessById = async (req, res) => {
  try {
    const { idPrometeus } = req.params;

    if (idPrometeus) {
      const informationsPrometeus = await prisma.prometeus.findUnique({
        where: {
          id: idPrometeus,
        },
      });

      if (!informationsPrometeus)
        return res.status(400).json({ warning: 'prometeus não encontrado' });

      res.status(200).json(informationsPrometeus);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ warning: 'erro ao identificar prometeus' });
  }
};

const createdNewProcess = async (req, res) => {
  try {
    const info = req.body;
    if (info) {
      const newProcess = await prisma.prometeus.create({
        data: info,
      });
      console.log(newProcess);
      res.status(201).json({
        message: 'processo criado com sucesso',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: 'erro interno no servidor',
    });
  }
};

const updateProcess = async (req, res) => {
  try {
    const { idPrometeus } = req.params;
    const body = req.body;

    if (idPrometeus) {
      const updatePrometeus = await prisma.prometeus.update({
        where: {
          id: idPrometeus,
        },
        data: body,
      });

      res.status(200).json(updatePrometeus);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProcess,
  getProcessById,
  updateProcess,
  createdNewProcess,
};

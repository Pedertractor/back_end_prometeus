const { prisma } = require('../services/prisma');

const { sliceSquadWeldings } = require('../helpers/helperGetIntervalWelding');

const lastWeldBeadById = async (req, res) => {
  try {
    const allDevices = await prisma.prometeus.findMany({
      select: {
        id: true,
      },
    });

    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));
    // const arrayDevicesId = allDevices.map((item) => item.id);

    const lastWeldBeadOccurances = await Promise.all(
      allDevices.map(async (device) => {
        const lastWeldBead = await prisma.welding.findFirst({
          where: {
            weldingId: device.id,
            createdAt: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
          select: {
            capture: true,
            prometeus: {
              select: {
                prometeusCode: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        if (!lastWeldBead) {
          return null;
        }

        const weldBeadFragments = await prisma.welding.findMany({
          where: { capture: lastWeldBead.capture },
          select: {
            amperagem: true,
            createdAt: true,
          },
        });

        return {
          prometeus: lastWeldBead.prometeus.prometeusCode,
          lastWelding: weldBeadFragments,
        };
      })
    );

    res.status(200).json(lastWeldBeadOccurances.filter((item) => item != null));
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: 'erro interno no servidor',
    });
  }
};

const listSquadWeldin = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.params.page) || 1;
    const pageSize = parseInt(req.params.pageSize) || 10;

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const prometeus = await prisma.prometeus.findUnique({
      where: { id },
    });

    if (prometeus) {
      const specific = await prisma.welding.findMany({
        where: {
          weldingId: prometeus.id,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      let result = sliceSquadWeldings(specific);
      result = result.reverse();
      const paginatedData = result.slice(startIndex, endIndex);
      console.log(paginatedData.length);
      res.status(200).json(paginatedData);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: 'erro interno no servidor',
    });
  }
};

const findWeldinBead = async (req, res) => {
  try {
    const { id, bead } = req.params;

    const prometeus = await prisma.prometeus.findUnique({
      where: { id },
    });

    if (prometeus) {
      const specific = await prisma.welding.findMany({
        where: {
          weldingId: prometeus.id,
          capture: bead,
        },
      });

      res.status(200).json(specific);
    } else {
      res.status(404).json({
        error: 'Nenhum prometeus encontrado',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: 'erro interno no servidor',
    });
  }
};

const findWelding = async (req, res) => {
  try {
    const { id, first, last } = req.params;

    const data = new Date(last);
    data.setDate(data.getDate() + 1);

    const firstDate = new Date(first).toISOString();
    const lastDate = data.toISOString();

    const process = await prisma.prometeus.findUnique({
      where: { id },
    });

    if (process) {
      const welding = await prisma.welding.findMany({
        where: {
          weldingId: process.id,

          createdAt: {
            gte: firstDate,
            lte: lastDate,
          },
        },
      });

      if (welding) res.status(200).json(interval);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: 'erro interno no servidor',
    });
  }
};

module.exports = {
  lastWeldBeadById,
  listSquadWeldin,
  findWeldinBead,
  findWelding,
};

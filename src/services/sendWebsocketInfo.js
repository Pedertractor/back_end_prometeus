const { broadcastMessage } = require('./websocketService');
const nodemailer = require('nodemailer');
const { prisma } = require('../services/prisma');

const transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'treinamento.ptr@gmail.com',
    pass: 'htoa steq bpeg psrq',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const enviaEmail = async (mensage) => {
  const emailOptions = {
    from: 'mailtrap@demomailtrap.com',
    to: ['joelisson.garbim@ptractor.com.br'],
    subject: 'Status Robo',
    text: mensage,
  };

  await transport.sendMail(emailOptions);
  console.log('email teste');
};

let constAcumulate01 = 0;
let constAcumulate02 = 0;
let constAcumulate03 = 0;
let constAcumulate04 = 0;
let constAcumulate05 = 0;

let statusPrometus01 = {
  prometeus: 'prometeus01',
  status: 'parado',
};

let statusPrometus02 = {
  prometeus: 'prometeus02',
  status: 'parado',
};

let statusPrometus03 = {
  prometeus: 'prometeus03',
  status: 'parado',
};

let statusPrometus04 = {
  prometeus: 'prometeus04',
  status: 'parado',
};

let statusPrometus05 = {
  prometeus: 'prometeus05',
  status: 'parado',
};

async function sendStatusPrometeus01() {
  const dateLastWelding = await prisma.welding.findFirst({
    where: {
      weldingId: process.env.IDPROMETEUS_01,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const seconds = new Date().getSeconds();
  const minutes = new Date().getMinutes();

  if (!dateLastWelding) {
    return (statusPrometus01.status = 'parado');
  }

  const minutesLastWelding = dateLastWelding.createdAt.getMinutes();
  const secondsLastWelding = dateLastWelding.createdAt.getSeconds();

  if (minutes === minutesLastWelding || minutes === minutesLastWelding + 1) {
    if (seconds === secondsLastWelding) {
      statusPrometus01.status = 'funcionando';
      constAcumulate01 = 0;
    } else {
      if (Math.abs(seconds - secondsLastWelding) <= 6) {
        statusPrometus01.status = 'funcionando';

        constAcumulate01 = 0;
      } else {
        statusPrometus01.status = 'parado';

        constAcumulate01++;
      }
    }
  } else {
    statusPrometus01.status = 'parado';

    constAcumulate01++;
  }

  console.log(constAcumulate01);
  if (
    constAcumulate01 === 900 &&
    new Date().getHours() !== 11 &&
    new Date().getHours() !== 12
  ) {
    enviaEmail('Robô-50 parado mais de 30 minutos, por favor verificar!');
    // constAcumulate01 = 0
  }
}

async function sendInfoPrometeus02() {
  const dateLastWelding = await prisma.welding.findFirst({
    where: {
      weldingId: process.env.IDPROMETEUS_02,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const seconds = new Date().getSeconds();
  const minutes = new Date().getMinutes();

  if (!dateLastWelding) {
    return (statusPrometus02.status = 'parado');
  }

  const minutesLastWelding = dateLastWelding.createdAt.getMinutes();
  const secondsLastWelding = dateLastWelding.createdAt.getSeconds();

  if (minutes === minutesLastWelding || minutes === minutesLastWelding + 1) {
    if (seconds === secondsLastWelding) {
      statusPrometus02.status = 'funcionando';
      constAcumulate02 = 0;
    } else {
      if (Math.abs(seconds - secondsLastWelding) <= 10) {
        statusPrometus02.status = 'funcionando';

        constAcumulate02 = 0;
      } else {
        statusPrometus02.status = 'parado';

        constAcumulate02++;
      }
    }
  } else {
    statusPrometus02.status = 'parado';

    constAcumulate02++;
  }

  if (
    constAcumulate02 === 900 &&
    new Date().getHours() !== 11 &&
    new Date().getHours() !== 12
  ) {
    enviaEmail('Robô-60 parado mais de 30 minutos, por favor verificar!');
    // constAcumulate02 = 0
  }
}

async function sendInfoPrometeus03() {
  const dateLastWelding = await prisma.welding.findFirst({
    where: {
      weldingId: process.env.IDPROMETEUS_03,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const seconds = new Date().getSeconds();
  const minutes = new Date().getMinutes();

  if (!dateLastWelding) {
    return (statusPrometus03.status = 'parado');
  }

  const minutesLastWelding = dateLastWelding.createdAt.getMinutes();
  const secondsLastWelding = dateLastWelding.createdAt.getSeconds();

  if (minutes === minutesLastWelding || minutes === minutesLastWelding + 1) {
    if (seconds === secondsLastWelding) {
      statusPrometus03.status = 'funcionando';
      constAcumulate03 = 0;
    } else {
      if (Math.abs(seconds - secondsLastWelding) <= 10) {
        statusPrometus03.status = 'funcionando';

        constAcumulate03 = 0;
      } else {
        statusPrometus03.status = 'parado';

        constAcumulate03++;
      }
    }
  } else {
    statusPrometus03.status = 'parado';

    constAcumulate03++;
  }
  if (
    constAcumulate03 === 900 &&
    new Date().getHours() !== 11 &&
    new Date().getHours() !== 12
  ) {
    enviaEmail('Robô-70 parado mais de 30 minutos, por favor verificar!');
    // constAcumulate03 = 0
  }
}

async function sendInfoPrometeus04() {
  const dateLastWelding = await prisma.welding.findFirst({
    where: {
      weldingId: process.env.IDPROMETEUS_04,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const seconds = new Date().getSeconds();
  const minutes = new Date().getMinutes();

  if (!dateLastWelding) {
    return (statusPrometus04.status = 'parado');
  }

  const minutesLastWelding = dateLastWelding.createdAt.getMinutes();
  const secondsLastWelding = dateLastWelding.createdAt.getSeconds();

  if (minutes === minutesLastWelding || minutes === minutesLastWelding + 1) {
    if (seconds === secondsLastWelding) {
      statusPrometus04.status = 'funcionando';
      constAcumulate04 = 0;
    } else {
      if (Math.abs(seconds - secondsLastWelding) <= 10) {
        statusPrometus03.status = 'funcionando';

        constAcumulate04 = 0;
      } else {
        statusPrometus04.status = 'parado';

        constAcumulate04++;
      }
    }
  } else {
    statusPrometus04.status = 'parado';

    constAcumulate04++;
  }
  if (
    constAcumulate04 === 900 &&
    new Date().getHours() !== 11 &&
    new Date().getHours() !== 12
  ) {
    enviaEmail('Robô-90 parado mais de 30 minutos, por favor verificar!');
    // constAcumulate04 = 0
  }
}

async function sendInfoPrometeus05() {
  const dateLastWelding = await prisma.welding.findFirst({
    where: {
      weldingId: process.env.IDPROMETEUS_05,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const seconds = new Date().getSeconds();
  const minutes = new Date().getMinutes();

  if (!dateLastWelding) {
    return (statusPrometus05.status = 'parado');
  }

  const minutesLastWelding = dateLastWelding.createdAt.getMinutes();
  const secondsLastWelding = dateLastWelding.createdAt.getSeconds();

  if (minutes === minutesLastWelding || minutes === minutesLastWelding + 1) {
    if (seconds === secondsLastWelding) {
      statusPrometus05.status = 'funcionando';
      constAcumulate05 = 0;
    } else {
      if (Math.abs(seconds - secondsLastWelding) <= 10) {
        statusPrometus03.status = 'funcionando';

        constAcumulate05 = 0;
      } else {
        statusPrometus05.status = 'parado';

        constAcumulate05++;
      }
    }
  } else {
    statusPrometus05.status = 'parado';

    constAcumulate05++;
  }
  if (
    constAcumulate05 === 900 &&
    new Date().getHours() !== 11 &&
    new Date().getHours() !== 12
  ) {
    enviaEmail('Robô-190 parado mais de 30 minutos, por favor verificar!');
    // constAcumulate05 = 0
  }
}

function runAll() {
  // sendStatusPrometeus01();
  // sendInfoPrometeus02();
  // sendInfoPrometeus03();
  // sendInfoPrometeus04();
  // sendInfoPrometeus05();

  let status = [];
  status.push(
    statusPrometus01,
    statusPrometus02,
    statusPrometus03,
    statusPrometus04,
    statusPrometus05
  );

  broadcastMessage(status);
}

module.exports = {
  runAll,
};

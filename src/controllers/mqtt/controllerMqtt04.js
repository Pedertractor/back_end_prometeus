const mqtt = require('mqtt');
const { prisma } = require('../../services/prisma');

const { v4: uuiddv4 } = require('uuid');

const client = mqtt.connect(process.env.MQTT_CONNECT);

const topics = ['prometeusNewSensorId04'];

let amperagem = 0;
let sensorId;

let currentID = uuiddv4();
let prismaPrometeus;

client.on('connect', async () => {
  await loadPrometeusData();
  client.subscribe(topics);
});

client.on('message', async (topic, payload) => {
  sensorId = topic;
  amperagem = parseFloat(payload.toString());
});

setInterval(() => {
  if (
    !isNaN(amperagem) &&
    typeof amperagem === 'number' &&
    amperagem >= 70 &&
    prismaPrometeus
  ) {
    sendData(amperagem);
  } else {
    console.log(amperagem, currentID, new Date().getSeconds());
    currentID = uuiddv4();
  }
}, 1000);

async function sendData(sensorDataArrays) {
  console.log(
    prismaPrometeus.prometeusCode,
    sensorDataArrays,
    currentID,
    new Date().getSeconds()
  );

  await prisma.welding.create({
    data: {
      capture: currentID,
      amperagem: sensorDataArrays,
      createdAt: new Date(),
      weldingId: prismaPrometeus.id,
    },
  });
}

async function loadPrometeusData() {
  try {
    const slicePrometeus = topics[0].slice(20, 22);
    console.log(slicePrometeus);

    prismaPrometeus = await prisma.prometeus.findFirst({
      where: { prometeusCode: `prometeus${slicePrometeus}` },
    });
  } catch (error) {
    console.log('erro encontrar prometeus válido no banco de dados', error);
  }
}

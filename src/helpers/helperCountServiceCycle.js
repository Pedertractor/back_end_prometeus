function someForAllDevicesMinutesWorkorStopping(data) {
  const groupByDate = {};
  const secondsToWorkInOneDay = 8 * 3600 + 56 * 60;
  const secondsEffectiveCapacity = 7 * 3600 + 56 * 60;

  data.forEach((item) => {
    const date = new Date(item.tempoInicial).toISOString().split('T')[0];

    if (!groupByDate[date]) {
      groupByDate[date] = {
        data: date,
        quantidadeDeCordoesDeSolda: 0,
        tempoTrabalhado: 0,
      };
    }

    if (item.tempoDeArc) {
      groupByDate[date].tempoTrabalhado += item.tempoDeArc;
    } else {
      groupByDate[date].tempoTrabalhado += 0;
    }
    groupByDate[date].quantidadeDeCordoesDeSolda++;
  });

  const array = Object.values(groupByDate);

  array.forEach((item) => {
    item.porcentagemTrabalhando = +(
      (item.tempoTrabalhado * 100) /
      secondsToWorkInOneDay
    ).toFixed(2);
    item.tempoParado = secondsToWorkInOneDay - item.tempoTrabalhado;

    item.porcentagemParado = +(
      (item.tempoParado * 100) /
      secondsToWorkInOneDay
    ).toFixed(2);

    item.porcentagemCapacidadeEfetiva = +(
      (item.tempoTrabalhado * 100) /
      secondsEffectiveCapacity
    ).toFixed(2);
  });
  return array;
}

function someForGasConsumption(data) {
  const groupByDate = {};
  const secondsToWorkInOneDay = 8 * 3600 + 56 * 60;
  const secondsEffectiveCapacity = 7 * 3600 + 56 * 60;

  data.forEach((item) => {
    const date = new Date(item.tempoInicial).toISOString().split('T')[0];

    if (!groupByDate[date]) {
      groupByDate[date] = {
        data: date,
        quantidadeDeCordoesDeSolda: 0,
        tempoTrabalhado: 0,
      };
    }

    if (item.tempoDeArc) {
      groupByDate[date].tempoTrabalhado += item.tempoDeArc;
    } else {
      groupByDate[date].tempoTrabalhado += 0;
    }
    groupByDate[date].quantidadeDeCordoesDeSolda++;
  });

  const array = Object.values(groupByDate);

  array.forEach((item) => {
    item.gastoComGasNoDia = +((item.tempoTrabalhado / 60) * 0.3).toFixed(2);
    item.quantidadeEmLitroNoDia = +((item.tempoTrabalhado / 60) * 15).toFixed(
      2
    );
    delete item.quantidadeDeCordoesDeSolda;
    delete item.tempoTrabalhado;
  });
  return array;
}

function someMinutesWorkorStopping(data) {
  const groupByDate = {};
  const secondsToWorkInOneDay = 8 * 3600 + 56 * 60;
  const secondsEffectiveCapacity = 7 * 3600 + 56 * 60;

  data.forEach((item) => {
    const date = new Date(item.tempoInicial).toISOString().split('T')[0];

    if (!groupByDate[date]) {
      groupByDate[date] = {
        data: date,
        quantidadeDeCordoesDeSolda: 0,
        tempoTrabalhado: 0,
      };
    }

    if (item.tempoDeArc) {
      groupByDate[date].tempoTrabalhado += item.tempoDeArc;
    } else {
      groupByDate[date].tempoTrabalhado += 0;
    }
    groupByDate[date].quantidadeDeCordoesDeSolda++;
  });

  const array = Object.values(groupByDate);

  array.forEach((item) => {
    item.porcentagemTrabalhando = +(
      (item.tempoTrabalhado * 100) /
      secondsToWorkInOneDay
    ).toFixed(2);
    item.tempoParado = secondsToWorkInOneDay - item.tempoTrabalhado;

    item.porcentagemParado = +(
      (item.tempoParado * 100) /
      secondsToWorkInOneDay
    ).toFixed(2);

    item.porcentagemCapacidadeEfetiva = +(
      (item.tempoTrabalhado * 100) /
      secondsEffectiveCapacity
    ).toFixed(2);
  });

  const total = {
    tempoTrabalhado: 0,
    tempoParado: 0,
    quantidadeDeSolda: 0,
  };

  array.forEach((item) => {
    total.tempoTrabalhado += item.tempoTrabalhado;
    total.tempoParado += item.tempoParado;
    total.quantidadeDeSolda += item.quantidadeDeCordoesDeSolda;
    total.porcentagemTrabalhando = +(
      (total.tempoTrabalhado * 100) /
      (secondsToWorkInOneDay * array.length)
    ).toFixed(2);
    total.porcentagemParado = +(
      (total.tempoParado * 100) /
      (secondsToWorkInOneDay * array.length)
    ).toFixed(2);
    total.porcentagemCapacidadeEfetiva = +(
      (total.tempoTrabalhado * 100) /
      (secondsEffectiveCapacity * array.length)
    ).toFixed(2);
  });

  const geralValues = [total];

  return [array, geralValues];
}

module.exports = {
  someForAllDevicesMinutesWorkorStopping,
  someForGasConsumption,
  someMinutesWorkorStopping,
};

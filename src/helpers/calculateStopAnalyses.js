function calculateTest(datas) {
  let totalTempoInativoMs = 0;
  let motivoParada = null;
  let tempoInativoAcumulado = 0;
  let horaParada = null;
  let horaVolta = null;

  const resultados = [];
  const status = [
    'falta de peças',
    'manutenção',
    'limpeza e troca de consumíveis',
    'programação',
    'aguardando ferramental',
    'montagem de setup',
  ];
  // Percorre as entradas para calcular o tempo de inatividade
  for (const analysis of datas) {
    if (
      analysis.status === 'parado' &&
      status.includes(analysis.motivoDaParada)
    ) {
      // Se encontrar um motivo de parada válido, guarda a data e hora
      motivoParada = analysis.motivoDaParada;
      horaParada = new Date(analysis.createdAt);
    } else if (
      analysis.status === 'funcionando' &&
      motivoParada &&
      horaParada
    ) {
      // Se encontrar um estado ativo e houver um motivo de parada anterior
      horaVolta = new Date(analysis.createdAt);
      const tempoInativoMs = horaVolta - horaParada;
      totalTempoInativoMs += tempoInativoMs;
      tempoInativoAcumulado += tempoInativoMs;
      let minutes = +(tempoInativoAcumulado / (1000 * 60)).toFixed(1);

      resultados.push({
        motivoParada,
        tempoInativoMin: minutes,
        dataDaParada: horaParada,
        dataDaVolta: horaVolta,
      });
      // Resetando para null para não contar o mesmo tempo de inatividade mais de uma vez
      motivoParada = null;
      horaParada = null;
      horaVolta = null;
      tempoInativoAcumulado = 0;
    }
  }

  const total = resultados.reduce((acc, item) => {
    return +(acc + item.tempoInativoMin).toFixed(1);
  }, 0);

  console.log([resultados, { total }]);
  return [resultados, { total }];
}

module.exports = {
  calculateTest,
};

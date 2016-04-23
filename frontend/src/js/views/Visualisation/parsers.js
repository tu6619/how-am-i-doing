/* global Plotly */

const parseData = (ij) => (_data) => {
  const data = _data.data
  const user = data.users['83749'] // just get the only hardcoded user

  // sort user completed questionnaires by date
  // then map to questionnaire objects
  const sortedQs = user.questionnaires
    .sort((qsA, qsB) => {
      const t0 = new Date(qsA.date)
      const t1 = new Date(qsB.date)
      return t0 - t1
    })
    .map((qsId) => data.questionnaires[qsId])

  // get x and y vals for plot
  const x = sortedQs.map((_, i) => i)
  const scores = sortedQs.map((qs) => qs.answers.reduce((a, b) => a + b, 0))

  // try to plot
  try {
    Plotly.newPlot('visualisation', [ {
      x: x,
      y: scores,
      type: !ij ? 'scatter' : 'bar'
    } ])
  } catch (e) {
    console.log('ERR', e)
  }
}

export default {
  0: parseData(0),
  1: parseData(1),
  2: parseData(2),
}

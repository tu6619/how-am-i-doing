import React from 'react'

import parseMap from '../views/Visualisation/parsers.js'

export default ({data, chartType}) => {
  if (data) {
    chartRenderers[chartType](data)
  }
  return (
    <div id="visualisation">
    </div>
  )
}

/* global Plotly */

const sortData = (uid, data) => {
  const ursData = data.data.users[uid]
  return ursData.questionnaires
    .sort((qsA, qsB) => {
      const t0 = new Date(qsA.date)
      const t1 = new Date(qsB.date)
      return t0 - t1
    })
    .map((qsId) => data.data.questionnaires[qsId])
}

const createAggregatedChartRenderer = chartType => (_data) => {

  const sortedQs = sortData(83749, _data)
  // get x and y vals for plot
  const x = sortedQs.map((_, i) => i)
  const scores = sortedQs.map((qs) => qs.answers.reduce((a, b) => a + b, 0))

  // try to plot
  try {
    Plotly.newPlot('visualisation', [ {
      x: x,
      y: scores,
      type: chartType
    } ])
  } catch (e) {
    console.log('ERR', e)
  }
}

const createDisaggregatedChartRenderer = type => (_data) => {

  const sortedQs = sortData(83749, _data)
  // get x and y vals for plot
  const x = sortedQs.map((_, i) => i)
  const ys = sortedQs.map(data => data.answers);
  const plotData = ys.map((y, i) => ({x, y, type}))
  // const scores = sortedQs.map((qs) => qs.answers.reduce((a, b) => a + b, 0))

  const layout = {
    barmode: 'stack'
  }

  // try to plot
  try {
    Plotly.newPlot('visualisation', plotData, layout)
  } catch (e) {
    console.log('ERR', e)
  }
}


const chartRenderers = {
  bar: createAggregatedChartRenderer('bar'),
  scatter: createAggregatedChartRenderer('scatter'),
  disaggregated: createDisaggregatedChartRenderer('bar'),
}

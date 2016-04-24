/* global d3, Plotly */
import React from 'react'

const makeBoundaryData = (x, data) => {
  return [ {
    x: x,
    y: x.map(() => data.boundaries[0]),
    type: 'scatter',
    mode: 'lines',
    name: 'Raised Score',
    line: { color: 'rgb(189, 144, 43)', dash: 'dashdot' },
    marker: { color: 'rgb(189, 144, 43)' },
  }, {
    x: x,
    y: x.map(() => data.boundaries[1]),
    type: 'scatter',
    mode: 'lines',
    name: 'High Score',
    line: { color: 'rgb(189, 43, 43)', dash: 'dashdot' },
    marker: { color: 'rgb(189, 43, 43)' },
  } ]
}

export default ({ data, chartType }) => {
  if (data) {
    chartRenderers[chartType](data)
  }
  return (
    <div id='visualisation'>
    </div>
  )
}

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
  const plotData = {
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    x: x,
    y: scores,
    type: chartType,
    name: 'My Past Scores',
    line: { shape: 'spline' }
  }

  const boundaryData = makeBoundaryData(x, _data.data)

  const WIDTH = 150
  const HEIGHT = 100

  const gd = document.getElementById('visualisation')
  gd.style.width = WIDTH + '%'
  gd.style.height = HEIGHT + '%'
  gd.style['margin-left'] = (100 - WIDTH) / 2 + '%'
  gd.style['margin-top'] = (100 - HEIGHT) / 2 + '%'

  const layout = {
    showlegend: false,
    plot_bgcolor : 'rgba(1, 1, 1, 0)',
    xaxis: {
      title: 'Session number',
      autotick: false,
      ticks: 'outside',
      tick0: 0,
      dtick: 1,
    },
    yaxis: { title: 'Score' }
  }

  // try to plot
  try {
    Plotly.newPlot(gd, boundaryData.concat([ plotData ]), layout)
    window.onresize = function () {
      Plotly.Plots.resize(gd)
    }
  } catch (e) {
    console.log('ERR', e)
  }
}

const createDisaggregatedChartRenderer = type => (_data) => {

  const sortedQs = sortData(83749, _data)
  // get x and y vals for plot
  const xAxis = sortedQs.map((_, i) => i)
  const anwsers = sortedQs.map(data => data.answers)
  const questionIndexes = anwsers[0].map((_, i) => i)
  const ys = questionIndexes.map((questionIndex) =>
    anwsers.map(answer => answer[questionIndex])
  )

  const plotData = ys.map((y) => ({ x: xAxis, y, type }))
  // const scores = sortedQs.map((qs) => qs.answers.reduce((a, b) => a + b, 0))

  const boundaryData = makeBoundaryData(xAxis, _data.data)

  const layout = {
    barmode: 'stack',
    plot_bgcolor : 'rgba(255, 255, 255, 0)'
  }

  // try to plot
  try {
    Plotly.newPlot('visualisation', plotData.concat(boundaryData), layout)
  } catch (e) {
    console.log('ERR', e)
  }
}


const chartRenderers = {
  bar: createAggregatedChartRenderer('bar'),
  scatter: createAggregatedChartRenderer('scatter'),
  disaggregated: createDisaggregatedChartRenderer('bar'),
}

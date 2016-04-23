/* global Plotly */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserDetails, changeTitle } from '../../actions/actions_index.js'
import { Grid, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import axios from 'axios'

class Viz extends React.Component {
  componentDidMount () {
    axios.get('/data.json')
      .then(parseData)
      .catch((err) => console.log(err))
  }

  render () {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Your Outcomes Data</h1>
        <Grid>
          <Row>
            <Col xs={8} xsOffset={2}>
              <div id='visualisation'></div>
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={3}>
              <ButtonToolbar>
                <ButtonGroup>
                  <Button bsStyle='primary'>Line Graph</Button>
                  <Button bsStyle='primary'>Gauge Chart</Button>
                  <Button bsStyle='primary'>Bar Chart</Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Viz.propTypes = {
  title: React.PropTypes.string,
  userDetails: React.PropTypes.string,
  changeTitle: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    title: state.changeTitle.title
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ changeTitle, getUserDetails }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Viz)

function parseData (_data) {
  const data = _data.data
  const user = data.users['83749'] // just get the only hardcoded user

  const sortedQs = user.questionnaires
    .sort((qsA, qsB) => {
      const t0 = new Date(qsA.date)
      const t1 = new Date(qsB.date)
      return t0 - t1
    })
    .map((qsId) => data.questionnaires[qsId])

  const scores = sortedQs.map((qs) => qs.answers.reduce((a, b) => a + b, 0))
  const x = sortedQs.map((_, i) => i)

  try {
    // debugger
    Plotly.newPlot('visualisation', [ {
      x: x,
      y: scores,
      type: 'scatter'
    } ])
  } catch (e) {
    console.log('ERR', e)
  }
}

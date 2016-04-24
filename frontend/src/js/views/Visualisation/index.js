/* global Plotly */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeVizType } from '../../actions/actions_index.js'
import { Grid, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import Chart from '../../components/chart.js'
import axios from 'axios'


class Viz extends React.Component {
  constructor () {
    super()

    this.state = {
      data: null
    }

    this.onClick = this.onClick.bind(this)
  }

  componentDidMount () {
    axios.get('/data.json')
      .then((data) => this.setState({ data }))
      .catch((err) => {throw err})
  }

  onClick (chartType) {
    this.props.changeVizType(chartType)
  }

  render () {
    const { data } = this.state
    const { type: chartType } = this.props
    console.log('rendering container')
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Your Outcomes Data</h1>
        <Grid>
          <Row>
            <Col xs={8} xsOffset={2}>
              <Chart {...{ data, chartType }} />
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={3}>
              <ButtonToolbar>
                <ButtonGroup>
                  <Button bsStyle='primary' onClick={() => this.onClick('scatter')}>Line Graph</Button>
                  <Button bsStyle='primary' onClick={() => this.onClick('disaggregated')}>Stacked Bar Chart</Button>
                  <Button bsStyle='primary' onClick={() => this.onClick('bar')}>Bar Chart</Button>
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
  type: React.PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    type: state.changeVizType.vizType
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ changeVizType }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Viz)

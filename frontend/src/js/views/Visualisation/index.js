/* global Plotly */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeVizType } from '../../actions/actions_index.js'
import { Grid, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import Chart from '../../components/chart.js'
import Warning from '../../components/warning.js'
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

    return (
      <div style={{ marginBottom: '120px' }}>
        <div style={{ textAlign: 'center', width: '80%', margin: '0 auto' }}>
          <h1>Your Outcomes Data</h1>
        </div>
        <Warning data={data} />
        <Grid>
          <Row>
            <Col xs={8} xsOffset={2}>
              <Chart {...{ data, chartType }} />
            </Col>
          </Row>
          <Row style={{ marginBottom: '1em' }}>
            <p style={{ textAlign: 'center' }}>Aggregated Plots</p>
            <Col xs={6} xsOffset={3}>
              <ButtonToolbar>
                <ButtonGroup>
                  <Button
                    bsStyle='primary'
                    bsSize='small'
                    onClick={() => this.onClick('scatter')}
                  >
                    Line Graph
                  </Button>
                  <Button
                    bsStyle='primary'
                    bsSize='small'
                    onClick={() => this.onClick('bar')}
                  >
                    Bar Chart
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
          <Row>
            <p style={{ textAlign: 'center' }}>Disaggregated Plots</p>
            <Col xs={6} xsOffset={3}>
              <ButtonToolbar>
                <ButtonGroup>
                  <Button
                    bsStyle='primary'
                    bsSize='small'
                    onClick={() => this.onClick('disaggregated')}
                  >
                    Bar Chart
                  </Button>
                  <Button
                    bsStyle='primary'
                    bsSize='small'
                    onClick={() => this.onClick('filledArea')}
                  >
                    Area Chart
                  </Button>
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

/* global Plotly */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeVizType } from '../../actions/actions_index.js'
import { Grid, Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import parseMap from './parsers.js'
import axios from 'axios'

class Viz extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount () {
    axios.get('/data.json')
      .then(parseMap[0])
      .catch((err) => console.log(err))
  }

  componentWillReceiveProps (nextProps) {
    axios.get('/data.json')
      .then(parseMap[nextProps.type])
      .catch((err) => console.log(err))
  }

  onClick (i) {
    this.props.changeVizType(i)
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
                  <Button bsStyle='primary' onClick={() => this.onClick(0)}>Line Graph</Button>
                  <Button bsStyle='primary' onClick={() => this.onClick(1)}>Gauge Chart</Button>
                  <Button bsStyle='primary' onClick={() => this.onClick(2)}>Bar Chart</Button>
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

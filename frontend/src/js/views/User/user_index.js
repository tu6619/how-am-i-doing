import React from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserDetails, changeTitle } from '../../actions/actions_index.js'
import Questionnaire from '../../components/questionnaire.js'
import { Link } from 'react-router'


class User extends React.Component {
  render () {
    return (
      <Grid className='user'>
        <h1>How am I doing?</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla posuere.</p>
        <Row>
          <Col>
            <Questionnaire />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Link to='/viz'><Button className='centre-button' bsSize='large'>VISUALISE</Button></Link>
          </Col>
        </Row>
      </Grid>
    )
  }
}

User.propTypes = {
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

const mapDispatchToProps = (dispatch) => bindActionCreators({getUserDetails, changeTitle}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(User)

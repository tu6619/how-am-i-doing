import React from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserDetails, changeTitle } from '../../actions/actions_index.js'
import { Link } from 'react-router'

class Home extends React.Component {
  render () {
    console.log(this.props)
    return (
      <Grid className='home'>
        <h1>How am I doing?</h1>
        <Link to='/user'><Button className='login' bsSize='large'>LOG IN</Button></Link>
        <Button className='signup' bsSize='large'>SIGN UP</Button>
        <Row>
          <Col xs={12}>
            <div className='image-container'>
              <img className='logo' src='img/silouhette.jpg' />
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Home.propTypes = {
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

const mapDispatchToProps = (dispatch) => bindActionCreators({changeTitle, getUserDetails}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)

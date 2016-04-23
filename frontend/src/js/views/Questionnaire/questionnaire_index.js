import React from 'react'
import { Modal, Button } from 'react-bootstrap'

class Questionnaire extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false,
      sent: false
    }
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  close () {
    this.setState({ showModal: false })
  }

  open () {
    this.setState({ showModal: true })
  }

  render () {
    return (
    <div>
      <Button className='start-questionnaire' bsStyle='primary' bsSize='large' onClick={this.open}>
        Start
      </Button>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            Resources
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          hello
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
  }
}

export default Questionnaire

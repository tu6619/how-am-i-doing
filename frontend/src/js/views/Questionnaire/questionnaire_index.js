import React from 'react'
// import ReactDOM from 'react-dom'
import { Modal, Button } from 'react-bootstrap'

class Questionnaire extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false,
      answers: [],
      sent: false,
      modalNumber: 0
    }
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.next = this.next.bind(this)
    this.clickRadio = this.clickRadio.bind(this)
  }

  close () {
    this.setState({ showModal: false })
  }

  open () {
    this.setState({ showModal: true })
  }

  next (e) {
    console.log(this.refs.result)
    const modalNumber = this.state.modalNumber
    this.setState({
      answers: this.state.answers.concat([this.state.radioClicked]),
      modalNumber: modalNumber + 1
    })

    // [0, 1, 2, 3].map(i => this.refs[i].value)
  }

  clickRadio (i) {
    this.setState({
      radioClicked: i
    })
  }

  render () {
    console.log(this.state)
    const { clickRadio } = this
    const { radioClicked } = this.state
    return (
    <div>
      <Button className='start-questionnaire' bsStyle='primary' bsSize='large' onClick={this.open}>
        Start
      </Button>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            I feel sad or empty ... {this.state.modalNumber}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
          <input
            type='radio'
            name='gender'
            value= 'male'
            onClick={() => clickRadio(0)}
          /> male
          <br />
          <input
            type='radio'
            name='gender'
            value= 'male'
            onClick={() => clickRadio(1)}
          /> Male<br />
          <input
            type='radio'
            name='gender'
            value= 'male'
            onClick={() => clickRadio(2)}
          /> Male<br />
          <input
            type='radio'
            name='gender'
            value= 'male'
            onClick={() => clickRadio(3)}
          /> Male<br />
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.next}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
  }
}

export default Questionnaire

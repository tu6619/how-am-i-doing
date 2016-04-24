import React from 'react'
import Axios from 'axios'
// import ReactDOM from 'react-dom'
import { Modal, Button, ButtonGroup, Row } from 'react-bootstrap'

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
    this.clear = this.clear.bind(this)
    this.send = this.send.bind(this)
  }

  close () {
    this.setState({ showModal: false })
  }

  open () {
    this.setState({ showModal: true })
  }

  next (e) {
    const modalNumber = this.state.modalNumber
    this.setState({
      answers: this.state.answers.concat([this.state.radioClicked]),
      modalNumber: modalNumber + 1,
      radioClicked: false
    })
  }

  clear () {
    document.getElementById('clear-button').addEventListener('click', () => {
      ['a', 'b', 'c', 'd'].forEach((id) => {
        document.getElementById(id).checked = false
      })
      return false
    })
  }

  clickRadio (i) {
    this.setState({
      radioClicked: i
    })
  }

  send () {
    Axios.post('/data.json', {
      questions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      answers: this.state.answers.concat([this.state.radioClicked])
    })
      .then((data) => {
        console.log(data)
        this.setState({
          modalNumber: this.state.modalNumber + 1,
          answers: data.answers,
          showModal: false
        })
      })
      .catch((err) => console.log(err))
  }

  render () {
    // array of questions
    const questions = ['I feel sad or empty ...', 'Nothing is fun much anymore ...', 'I have trouble sleeping ...',
    'I have problems with my appetite ...',
    'I have no energy for things ...', 'I am tired a lot ...', 'I cannot think clearly ...',
    'I feel worthless ...', 'I feel like I don\'t want to move ...', 'I feel restless ...']
    const { clickRadio } = this
    const { clear } = this
    const { radioClicked } = this.state
    const submitDisabled = !(typeof radioClicked === 'number')
    return (
    <div>
      <Button className='centre-button' bsSize='large' onClick={this.open}>
        QUESTIONNAIRE
      </Button>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            {questions[this.state.modalNumber]}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='centre-button'>
          <ButtonGroup className='centre-button'>
            <Button
              id='a'
              className="centre-button"
              onClick={() => {
                clickRadio(0)
              }}
            >
                Never
            </Button>
            <Button
              id='a'
              onClick={() => {
                clickRadio(1)
              }}
            >
                Sometimes
            </Button>
            <Button
              id='a'
              onClick={() => {
                clickRadio(2)
              }}
            >
                Often
            </Button>
            <Button
              id='a'
              onClick={() => {
                clickRadio(3)
              }}
            >
                Always
            </Button>
        </ButtonGroup>

        </Modal.Body>
        <Modal.Footer>
          {this.state.modalNumber === questions.length - 1 ? (
            <Button
              id='clear-button'
              onClick={this.send}
              disabled={submitDisabled}
            >
              Submit
            </Button>
          ) : (
            <Button id='clear-button'
              onClick={this.next}
              disabled={submitDisabled}
            >
              Next
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
    )
  }
}

// const cl = (fn) => (e) => {e.preventDefault(); fn ? fn() : null}
//
// const Input = ({checked, onClick}) => checked ? (
//   <input type = "radio" checked onChange = { cl(onClick) } />
// ) : (
//   <input type = "radio" onChange = {  cl(onClick) } />
// );

export default Questionnaire

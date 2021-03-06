import React from 'react'
import { Button } from 'react-bootstrap'

export default class Warning extends React.Component {
  render () {
    const data = this.props.data
    let flag
    if (data) {
      const boundaryUpper = data.data.boundaries[1]
      const qId = data.data.users[83749].questionnaires.slice(-1)
      const score = data.data.questionnaires[qId].answers.reduce((a, b) => a + b, 0)
      flag = score >= boundaryUpper
    } else {
      flag = false
    }

    if (flag) {
      return (
        <div style={divStyles}>
          <p>Your last score was quite high. Do you want to talk to someone?</p>
          <p><Button>Talk to the samaritans</Button></p>
          <p><Button>Send a message to your therapist</Button></p>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

const divStyles = {
  opacity: '0.8',
  backgroundColor: 'white',
  border: '1px solid black',
  color: 'black',
  borderRadius: '5px',
  width: '80%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '20px',
  padding: '10px',
  textAlign: 'center',
}

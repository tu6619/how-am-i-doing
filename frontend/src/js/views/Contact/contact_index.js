import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

const styles = {
  textAlign: 'center',
  margin: '4em auto'
}
const repoLink = 'https://github.com/tu6619/how-am-i-doing'

export default (props) => {
  return (
    <Grid style={styles}>
      <Row>
        <Col xs={12}>
          <h4> Check out our <a href={repoLink} target='_blank'>GitHub</a></h4>
        </Col>
      </Row>
    </Grid>
  )
}

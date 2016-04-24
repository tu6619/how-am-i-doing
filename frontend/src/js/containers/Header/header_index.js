import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { toggleMenu } from './../../actions/actions_index.js'

class Header extends React.Component {
  render () {
    return (
      <div>
        <Navbar
          expanded={this.props.menuOpen}
          onToggle={this.props.toggleMenu}
          className='top-menu'
          fixedTop={true}>
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse pullRight>
            <Nav pullRight>
              {this.props.menuItems.map(item => {
                return (
                  <li onClick={this.props.toggleMenu}
                    role='presentation'
                    key={item + '-li'}>
                    <Link key={item} to={'/' + item}>{item}</Link>
                  </li>
                )
              })}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

Header.propTypes = {
  menuOpen: React.PropTypes.bool,
  logoUrl: React.PropTypes.string,
  menuItems: React.PropTypes.array,
  toggleMenu: React.PropTypes.func
}

Header.defaultProps = {
  menuItems: [ 'about', 'contact' ]
}

const mapStateToProps = state => {
  return { menuOpen: state.toggleMenu.menuOpen }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({toggleMenu}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

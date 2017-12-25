import React from 'react'
import {Navbar, Row, Col} from 'react-bootstrap'
import LogOut from './log_out.js.jsx'

const Header = () =>
  <Navbar className="my-navbar">
    <Row>
    <Col md={2}>
      <Navbar.Header>
        <Navbar.Brand className="brand-name">
          <a href="#">IdeaBroad</a>
        </Navbar.Brand>
      </Navbar.Header>
    </Col>
    <Col md={{size:2, offset:9}}>
      <LogOut/>
    </Col>
    </Row>

  </Navbar>

export default Header

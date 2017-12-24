import React from 'react'
import {Navbar} from 'react-bootstrap'

const Header = () =>
  <Navbar className="my-navbar">
    <Navbar.Header>
      <Navbar.Brand className="brand-name">
        <a href="#">IdeaBroad</a>
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>

export default Header

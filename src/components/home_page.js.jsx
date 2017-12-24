import React, { Component } from 'react';
// import logo from './logo.svg';
import '../style/App.css';
import '../style/ideaform.css'
import '../style/ideas.css'
import Header from './header.js.jsx'
import SidebarLeft from './sidebar_left.js.jsx'
import SidebarRight from './sidebar_right.js.jsx'
import IdeasComponent from './ideas_component.js.jsx'
import {Container, Row, Col} from 'reactstrap'

class HomePage extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Container fluid>
          <Row>
            <Col md={2} xs={2} className="sidebar-left">
              <SidebarLeft />
            </Col>
            <Col md={8} xs={8} >
              <IdeasComponent key = {IdeasComponent.id}/>
            </Col>
            <Col md={2} xs={4} className="sidebar-right">
              <SidebarRight />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;

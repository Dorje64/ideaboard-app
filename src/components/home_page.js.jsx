import React, { Component } from 'react';
// import logo from './logo.svg';
import '../style/App.css';
import '../style/ideaform.css'
import '../style/ideas.css'
import Header from './header.js.jsx'
import Sidebar from './sidebar.js.jsx'
import IdeasComponent from './ideas_component.js.jsx'
import {Grid, Row, Col} from 'react-bootstrap'

class HomePage extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Grid >
          <Row>
            <Col md={1} xs={4}>
              <Sidebar />
            </Col>
            <Col md={11} xs={8} >
              <IdeasComponent key = {IdeasComponent.id}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default HomePage;

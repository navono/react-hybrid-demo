import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

// import TodoBox from './Flux/components/todoList';
// import MyButtonController from './Flux/components/MyButtonController';

import MaterialMain from './Material-UI/material-ui-demo';
import RealtimeAlarm from './Material-UI/realTimeAlarm';
import TestPage from './Material-UI/testCSS';

// import SemanticList, { SemanticListIcon, SemanticTable } from './Semantic-UI/semantic-ui-demo';

// import SemanticAlarmControl from './Semantic-UI/realTimeAlarm';
// import SiderDemo from './antd/testAntd';

class App extends Component {
  /* render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  } */

    // render () {
    //     return (
    //       <div>
    //           <SiderDemo />
    //       </div>
    //     );
    // }
  render () {
    return (
            <div>
              <Navbar inverse fixedTop>
                <Grid>
                  <Navbar.Header>
                    <Navbar.Brand>
                      <a href="/">React Style App</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                  </Navbar.Header>
                </Grid>
              </Navbar>
              <Jumbotron>
                <Grid>
                  <h1>Welcome to React</h1>
                  <p>
                    <Button
                      bsStyle="info"
                      bsSize="large"
                      href="http://facebook.github.io/react.html"
                      target="_blank">
                      View React Docs
                    </Button>
                    </p>
                </Grid>
              </Jumbotron>
               <Grid><TestPage/></Grid>
              <Grid><RealtimeAlarm/></Grid>
              {/* <div><SemanticList /></div> */}
            </div>
      )
  }
}

export default App;

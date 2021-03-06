//import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import socketio from "socket.io-client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap';

import Header from './components/Header';
import TempTable from './components/TempTable';
import FanTable from './components/FanTable';
import LogButtons from './components/LogButtons';
import NewAlert from './components/Alert';
import FanTableSet from './components/FanTableSet';
import TempTableSet from './components/TempTableSet';
import TempControlTable from './components/TempControlTable';
import HighChart from './components/Highchart';
import Timer from './components/Timer';

const ENDPOINT = "http://192.168.0.31:5000";
const socket = socketio.connect(ENDPOINT);
export { socket, ENDPOINT };


function App() {

  useEffect(() => {
    let isMounted = true
    
    socket.on("connect", msg => {
      if (isMounted) {
        console.log("Connect to socket.io server!")  
      }   
    });
    return () => { 
        console.log('Unmounted Home');
        isMounted = false;
    }; 
  }, []);

  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Container fluid>
                  <Row>
                    <Col><TempTable /></Col>
                    <Col><FanTable /></Col>
                  </Row>
                </Container>
                <Container>
                <LogButtons />
                <Timer />
                </Container>
              </Route>
              <Route exact path="/chart">
                <Container fluid>
                  <HighChart />
                </Container>
              </Route>
              <Route path="/settings">
                <TempTableSet />
                <TempControlTable />
                <FanTableSet />
              </Route>
            </Switch>
            <NewAlert />
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
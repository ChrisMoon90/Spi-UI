import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import Set_Fan_Index from './FanIndexUpdater';
import { socket } from '../App';


function FanTable() {
  const [fan_indexes, set_fan_indexes] = useState("");
  const [fan_states, set_fan_states] = useState("");

  useEffect(() => {
    socket.emit("fetch_fan_indexes")

    socket.on("fan_indexes", fan_indexes_in => {
      set_fan_indexes(fan_indexes_in);
      console.log("Fan_Indexes Received: ", fan_indexes_in)
    });
    socket.on("fan_states", fan_states_in => {
        set_fan_states(fan_states_in);
        console.log("Fan_States Received: ", fan_states_in)
      });
  }, []);
 
  const f0_index = fan_indexes["f0"];
  //const Fan1 = temps[s0_index];

  const f1_index = fan_indexes["f1"];
  //const Temp2 = temps[s1_index];

  const f2_index = fan_indexes["f2"];
  //const Temp3 = temps[s2_index];

  return(
    <Card border="dark">
      <Card.Header><h3>Fan Controls</h3></Card.Header>
      <Card.Body>
        <Table striped bordered hover>              
            <thead>
                <tr>
                <th>#</th>
                <th>Fan Name</th>
                <th>Toggle State</th>
                </tr>
            </thead>
            <tbody>      
                <tr>
                <td>1</td>
                <td>Heating Fan</td>
                <td><Set_Fan_Index fanID = "f0" fan_indexes = {fan_indexes}/></td>
                </tr>
                <tr>
                <td>2</td>
                <td>Convection Fan</td>
                <td>double buttons</td>
                </tr>          
                <tr>
                <td>3</td>
                <td>Pi Fan</td>
                <td>{f2_index}</td>
                </tr>
            </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default FanTable;
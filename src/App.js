import React from 'react';
import {Route} from 'react-router-dom';
import io from 'socket.io-client';

import './App.css';
import {DrawingBoard} from "./components/DrawingBoard";
import { DisplayBoard } from './components/DisplayBoard';

function getIPAddress() {
  return '10.0.0.104';
}

function App() {

  return (
    <main>
      <Route exact path="/draw/" render={() => <DrawingBoard socket={io(getIPAddress()+":3231")} />} 
      />
      <Route exact path="/" render={() => 
        <DisplayBoard socket={io(getIPAddress()+":3231")} 
                      localUrl={getIPAddress()}
                      />} 
      />
    </main>
  );
}

export default App;

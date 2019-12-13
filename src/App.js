import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import io from "socket.io-client";

import "./App.css";
import { DrawingBoard } from "./pages/DrawingBoard";
import { DisplayBoard } from "./pages/DisplayBoard";

const socket = io();

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route
                    exact
                    path="/draw"
                    render={() => <DrawingBoard socket={socket} />}
                />
                <Route
                    exact
                    path="/"
                    render={() => (
                        <DisplayBoard
                            socket={socket}
                            localUrl={process.env.REACT_APP_URL}
                        />
                    )}
                />
            </Switch>
        </HashRouter>
    );
}

export default App;

import React from "react";
import { Route } from "react-router-dom";
import io from "socket.io-client";

import "./App.css";
import { DrawingBoard } from "./components/DrawingBoard";
import { DisplayBoard } from "./components/DisplayBoard";

function App() {
    return (
        <main>
            <Route
                exact
                path="/draw/"
                render={() => (
                    <DrawingBoard
                        socket={io(
                            process.env.REACT_APP_URL +
                                ":" +
                                process.env.REACT_APP_PORT_SOCKET
                        )}
                    />
                )}
            />
            <Route
                exact
                path="/"
                render={() => (
                    <DisplayBoard
                        socket={io(
                            process.env.REACT_APP_URL +
                                ":" +
                                process.env.REACT_APP_PORT_SOCKET
                        )}
                        localUrl={process.env.REACT_APP_URL}
                    />
                )}
            />
        </main>
    );
}

export default App;

import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import { DrawingBoard } from "./pages/DrawingBoard";
import { DisplayBoard } from "./pages/DisplayBoard";

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/draw" component={DrawingBoard} />
                <Route exact path="/" component={DisplayBoard} />
            </Switch>
        </HashRouter>
    );
}

export default App;

import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import io from "socket.io-client";

export class DrawingBoard extends Component {
    constructor(props) {
        super();
        this.state = {
            brushColor: props.brushColor,
            brushRadius: 10,
            socket: null
        };
    }

    setColor() {
        this.setState({
            brushColor:
                "#" +
                Math.random()
                    .toString(16)
                    .slice(2, 8)
        });
    }

    initSocket() {
        const socket = io();
        this.setState({ socket });
    }

    componentDidMount() {
        this.initSocket();
        this.setColor();
    }

    save(saveableCanvas) {
        const saveData = saveableCanvas.getSaveData();
        this.state.socket.emit("savedDrawing", {
            save: saveData
        });
        saveableCanvas.clear();
    }

    render() {
        let borderStyle = {
            borderColor: this.state.brushColor
        };
        return (
            <div className="drawing-container">
                <CanvasDraw
                    className="drawing-canvas"
                    hideGrid={true}
                    lazyRadius={0}
                    brushColor={this.state.brushColor}
                    brushRadius={this.state.brushRadius}
                    canvasWidth="100%"
                    canvasHeight="100%"
                    catenaryColor="rgba(0,0,0,0)"
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    backgroundColor="rgba(0,0,0,0)"
                />
                <div className="buttons">
                    <button onClick={() => this.setColor()} style={borderStyle}>
                        Change Color
                    </button>
                    <button
                        onClick={() => this.saveableCanvas.undo()}
                        style={borderStyle}
                    >
                        Undo
                    </button>
                    <button
                        onClick={() => this.saveableCanvas.clear()}
                        style={borderStyle}
                    >
                        Clear
                    </button>
                    <button
                        onClick={() => this.save(this.saveableCanvas)}
                        style={borderStyle}
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    }
}

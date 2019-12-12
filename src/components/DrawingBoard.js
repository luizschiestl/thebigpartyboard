import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";

export class DrawingBoard extends Component {
    constructor(props) {
        super();
        this.state = {
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight,
            brushColor: props.brushColor,
            brushRadius: 10,
            save: null,
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
        const { socket } = this.props;
        socket.on("connect", () => {
            console.log("Connected");
        });
    }

    updateDimensions() {
        this.setState({
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight - 50
        });
    }

    componentDidMount() {
        this.initSocket();
        this.updateDimensions();
        this.setColor();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    switchToEraser() {
        this.setState({
            brushColor: "#ffffff",
            brushRadius: 30
        });
    }

    switchToBrush() {
        this.setState({
            brushColor: this.props.brushColor,
            brushRadius: 10
        });
    }

    async save(saveableCanvas) {
        const saveData = saveableCanvas.getSaveData();
        await this.setState({ save: saveData });
        const { socket } = this.props;
        console.log(socket);
        socket.emit("savedDrawing", {
            save: this.state.save,
            height: this.state.canvasHeight,
            width: this.state.canvasWidth
        });
        saveableCanvas.clear();
    }

    render() {
        return (
            <div>
                <CanvasDraw
                    canvasWidth={this.state.canvasWidth}
                    canvasHeight={this.state.canvasHeight}
                    hideGrid={true}
                    lazyRadius={0}
                    brushColor={this.state.brushColor}
                    brushRadius={this.state.brushRadius}
                    catenaryColor="rgba(0, 0, 0, 0)"
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    backgroundColor="rgba(0,0,0,0)"
                />
                <button onClick={() => this.saveableCanvas.undo()}>Undo</button>
                <button onClick={() => this.saveableCanvas.clear()}>
                    Clear
                </button>
                <button onClick={() => this.save(this.saveableCanvas)}>
                    Save
                </button>
            </div>
        );
    }
}

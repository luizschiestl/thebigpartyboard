import React, {Component} from "react";
import CanvasDraw from "react-canvas-draw";

export class DisplayBoard extends Component {

    constructor(props) {
        super();
        this.state = {
            canvasWidth:  window.innerWidth,
            canvasHeight: window.innerHeight,
            socket: null,
            save: null
        }
    }

    initSocket() {
        const {socket} = this.props;
        socket.on('connect', () => {
            console.log("Connected");
        });
        this.setState({socket});
    }

    loadSavedData = () => {
        this.state.socket.on('savedDrawing', ({save, height, width}) => {
            if(save) {
                this.setState({
                    canvasHeight: height,
                    canvasWidth: width
                })
                this.loadableCanvas.loadSaveData(save);
            }
        });
    }

    updateDimensions() {
        this.setState({
            canvasWidth: window.innerWidth-50,
            canvasHeight: window.innerHeight-200
        });
    }

    async componentDidMount() {
        await this.initSocket();
        this.loadSavedData();
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
       window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        return (
            <div>
                <h2>The Big Party Board</h2>
                <h3>Go to {this.props.localUrl}:3000/draw to start</h3>
                <CanvasDraw 
                            disabled={true}
                            loadTimeOffset={2}
                            className="canvas"
                            brushColor="rgba(0,0,0,0)"
                            catenaryColor="rgba(0, 0, 0, 0)"
                            canvasWidth={this.state.canvasWidth} 
                            canvasHeight={this.state.canvasHeight}
                            hideGrid={true}
                            ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                />
            </div>
        )
    }
}


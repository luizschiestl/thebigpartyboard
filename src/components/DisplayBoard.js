import React, {Component} from "react";
import CanvasDraw from "react-canvas-draw";
import '../App.css';

export class DisplayBoard extends Component {

    constructor(props) {
        super();
        this.state = {
            componentList: [],
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
                const componentList = this.state.componentList;
                componentList.push(
                    <CanvasDraw
                        disabled={true}
                        loadTimeOffset={2}
                        className="canvas"
                        brushColor="rgba(0,0,0,0)"
                        catenaryColor="rgba(0, 0, 0, 0)"
                        canvasWidth={width/3.5} 
                        canvasHeight={height/3.5}
                        hideGrid={true}
                        ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                        saveData={save}
                        backgroundColor="rgba(0,0,0,0)"
                    />
                );
                this.setState(componentList);
            }

        });
    }

    async componentDidMount() {
        await this.initSocket();
        this.loadSavedData();
    }

    render() {
        let componentList = this.state.componentList;
        return (
            <div>
                <h2>The Big Party Board</h2>
                <h3>Go to {this.props.localUrl}:3000/draw to start</h3>
                <div className="display-board">
                    {componentList.map((component, index) => (
                        <React.Fragment key={index}>
                            {component}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        )
    }
}


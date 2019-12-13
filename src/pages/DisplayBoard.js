import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import QRCode from "qrcode.react";

export class DisplayBoard extends Component {
    constructor(props) {
        super();
        this.state = {
            divWidth: window.innerWidth,
            divHeight: window.innerHeight,
            componentList: [],
            socket: null,
            save: null
        };
    }

    initSocket() {
        const { socket } = this.props;
        socket.on("connect", () => {
            console.log("Connected");
        });
        this.setState({ socket });
    }

    updateDimensions() {
        this.setState({
            divWidth: window.innerWidth,
            divHeight: window.innerHeight - 50
        });
    }

    loadSavedData = () => {
        this.state.socket.on("savedDrawing", ({ save, height, width }) => {
            if (save) {
                const obj = JSON.parse(save);
                let minX = width;
                let minY = height;
                let maxX = 0;
                let maxY = 0;
                // eslint-disable-next-line
                obj.lines.map(line =>
                    // eslint-disable-next-line
                    line.points.map(point => {
                        if (minX > point.x) {
                            minX = point.x;
                        }
                        if (minY > point.y) {
                            minY = point.y;
                        }
                        if (maxX < point.x) {
                            maxX = point.x;
                        }
                        if (maxY < point.y) {
                            maxY = point.y;
                        }
                    })
                );
                // eslint-disable-next-line
                obj.lines.map(line =>
                    // eslint-disable-next-line
                    line.points.map(point => {
                        point.x = point.x - minX + 15;
                        point.y = point.y - minY + 15;
                    })
                );
                obj.width = maxX - minX + 30;
                obj.height = maxY - minY + 30;
                let newHeight = 0;
                let newWidth = 0;
                if (obj.width > obj.height) {
                    newWidth = 300;
                    newHeight = (300 * obj.height) / obj.width;
                } else {
                    newWidth = (300 * obj.width) / obj.height;
                    newHeight = 300;
                }

                const componentList = this.state.componentList;
                componentList.push(
                    <CanvasDraw
                        disabled={true}
                        loadTimeOffset={10}
                        className="moving-canvas"
                        brushColor="rgba(0,0,0,0)"
                        catenaryColor="rgba(0, 0, 0, 0)"
                        canvasWidth={newWidth}
                        canvasHeight={newHeight}
                        hideGrid={true}
                        ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                        saveData={JSON.stringify(obj)}
                        backgroundColor="rgba(0,0,0,0)"
                    />
                );
                this.setState(componentList);
            }
        });
    };

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
        let componentList = this.state.componentList;
        return (
            <div>
                <div className="container">
                    <div className="title-board">
                        <h2>The Big Party Board!</h2>
                        <h3>Go to {this.props.localUrl}/#/draw to start</h3>
                    </div>
                    <div
                        className="display-board"
                        width={this.state.divWidth}
                        height={this.state.divHeight}
                    >
                        {componentList.map((component, index) => (
                            <React.Fragment key={index}>
                                {component}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <QRCode
                    className="qrcode"
                    value={this.props.localUrl + "/#/draw"}
                    bgColor="#000"
                    fgColor="#fff"
                    size={148}
                />
            </div>
        );
    }
}

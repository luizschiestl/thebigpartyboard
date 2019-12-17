import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import QRCode from "qrcode.react";
import io from "socket.io-client";
import "./DisplayBoard.css";

export class DisplayBoard extends Component {
    constructor(props) {
        super();
        this.state = {
            componentList: []
        };
    }

    registerToSocket() {
        const socket = io(process.env.REACT_APP_SOCKET_URL);
        socket.on("savedDrawing", ({ save }) => {
            save && this.loadSavedData(save);
        });
    }

    setMinMaxPoints(lines) {
        let xPoints = [].concat(
            ...lines.map(function(line) {
                return line.points.map(function(point) {
                    return point.x;
                });
            })
        );
        let yPoints = [].concat(
            ...lines.map(function(line) {
                return line.points.map(function(point) {
                    return point.y;
                });
            })
        );

        return {
            minX: Math.min(...xPoints),
            minY: Math.min(...yPoints),
            maxX: Math.max(...xPoints),
            maxY: Math.max(...yPoints)
        };
    }

    loadSavedData(save) {
        const obj = JSON.parse(save);
        if (obj.lines.length !== 0) {
            const minMaxPoints = this.setMinMaxPoints(obj.lines);

            obj.lines.map(function(line) {
                return line.points.map(function(point) {
                    point.x = point.x - minMaxPoints.minX + 15;
                    point.y = point.y - minMaxPoints.minY + 15;
                    return point;
                });
            });
            obj.width = minMaxPoints.maxX - minMaxPoints.minX + 30;
            obj.height = minMaxPoints.maxY - minMaxPoints.minY + 30;
            let newHeight = 0;
            let newWidth = 0;
            if (obj.width > obj.height) {
                newWidth = 300;
                newHeight = (300 * obj.height) / obj.width;
            } else {
                newWidth = (300 * obj.width) / obj.height;
                newHeight = 300;
            }

            this.setState({
                componentList: [
                    ...this.state.componentList,
                    <CanvasDraw
                        disabled={true}
                        loadTimeOffset={10}
                        className="moving-canvas"
                        brushColor="rgba(0,0,0,0)"
                        catenaryColor="rgba(0,0,0,0)"
                        canvasWidth={newWidth}
                        canvasHeight={newHeight}
                        hideGrid={true}
                        ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                        saveData={JSON.stringify(obj)}
                        backgroundColor="rgba(0,0,0,0)"
                    />
                ]
            });
        }
    }

    componentDidMount() {
        this.registerToSocket();
    }

    render() {
        let { componentList } = this.state;
        return (
            <div className="container">
                <div className="title-bar">
                    <h1>The Big Party Board</h1>
                    <h2>
                        Go to{" "}
                        <a href={process.env.REACT_APP_URL + "/#/draw"}>
                            {process.env.REACT_APP_URL}/#/draw
                        </a>{" "}
                        <br></br>
                        on your phone or scan QRCode to start
                    </h2>
                </div>
                <div className="display-board">
                    {componentList.map((component, index) => (
                        <React.Fragment key={index}>{component}</React.Fragment>
                    ))}
                </div>
                <QRCode
                    className="qrcode"
                    value={process.env.REACT_APP_URL + "/#/draw"}
                    size={148}
                />
            </div>
        );
    }
}

const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "../../build")));

io.on("connection", socket => {
    socket.on("savedDrawing", save => {
        io.sockets.emit("savedDrawing", save);
    });
});

server.listen(port);

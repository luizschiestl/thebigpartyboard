require("dotenv/config");
var app = require("http").createServer();
var io = (module.exports.io = require("socket.io")(app));

const PORT = process.env.PORT_SOCKET || 3231;

io.on("connection", socket => {
    socket.on("savedDrawing", save => {
        io.sockets.emit("savedDrawing", save);
    });
});

app.listen(PORT, () => {
    console.log("Connected to port: " + PORT);
});

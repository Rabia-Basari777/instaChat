// Handling socket.io connections

const io = require("socket.io")(2103);

const users = {};

io.on("connection", socket = {
    socket.on("new-user-joined", name => {
        users[socket.id] = name;
        socket.broadcast.emit(name, "has joined the chat");
    });
})
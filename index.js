
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 8000;

// Handling socket.io connections
const io = require("socket.io")(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.use(express.static(__dirname + '/'));

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });  // shows the message to everyone except the sender
    })

    socket.on("disconnect", (message) => {
        socket.broadcast.emit("left", users[socket.id]);
        delete users[socket.id];
    })
})

server.listen(port, () => {
    console.log("Server started at 8000");
})

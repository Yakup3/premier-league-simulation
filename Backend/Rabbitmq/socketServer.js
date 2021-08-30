class SocketServer {
    constructor(io) {
        this.io = io;
        this.connections = [];
        this.io.on('connection', (socket) => {
            this.connections.push(socket);
            socket.on('disconnect', () => {
                this.connections.splice(this.connections.indexOf(socket), 1);
            });
        });
    }

    send(input) {
        this.connections.forEach((socket) => {
            console.log("sending message to ", socket.id);
            socket.emit('message', input);
        });
    }

    send_standings(input) {
        this.connections.forEach((socket) => {
            console.log("sending standings to ", socket.id);
            socket.emit('standings', input);
        })
    }
}

module.exports = { SocketServer };
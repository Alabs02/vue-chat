const { static } = require('express')

// Initialise express server
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const port = 3300

// Use static files
app.use(static(__dirname + '/assets'))

// Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Server
http.listen(port, () => {
    console.log(`App started at port ${port} and url http://127.0.0.1:${port}`)
})

// listen to connection
io.on('connection', socket => {
    console.log(`Connection established`)

    // Total number of connected users
    console.log(Object.keys(io.sockets.connected).length)
    // emit number of connected users
    io.emit('connections', Object.keys(io.sockets.connected).length )

    // Disconnect
    socket.on('disconnect', () => {
        console.log(`Disconnected`);
    })

    socket.on('Created', data => {
        socket.broadcast.emit('Created', data)
    })

    // Broadcast new message to others
    socket.on('new-massage', data => {
        socket.broadcast.emit('new-message', data)
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })

    socket.on('stop_typing', data => {
        socket.broadcast.emit('stop_typing', data)
    })

    socket.on('joined', data => {
        socket.broadcast.emit('joined', data)
    })

    socket.on('leaved', data => {
        socket.broadcast.emit('leaved', data)
    })
})
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const ip = process.argv[2] || '127.0.0.1'
const port = process.argv[3] || '8080'

const clients = {}

const chatLog = []

const serverPort = port || '8080'

server.listen(serverPort, () => {
    console.log('Server is listening on ip: ' + ip + ' and on port: ' + port)
})

app.get('/', (req, res) => {
    res.send(chatLog)
})

io.on('connection', (socket) => {
    console.log('Client ' + socket.id + ' connected')

    if (!clients[socket.id])
        clients[socket.id] = socket

    socket.on('message', (data) => {
        chatLog.push({
            name: data.userName,
            message: data.message
        })
        
    })

    socket.on('update', (data) => {
        socket.emit('logs', chatLog)
    })

    socket.on('disconnect', function () {
        clients[socket.id] = null
        console.log('Client' + socket.id + ' disconnected')
    })
})
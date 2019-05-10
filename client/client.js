const username = process.argv[2] || 'Luis'
const ip = process.argv[3] || '127.0.0.1'
const port = process.argv[4] || '8080'
const uri = 'http://' + ip + ':' + port + ''
const socket = require('socket.io-client')(uri);

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

socket.on('logs', (data) => {
    console.log()
    data.forEach(e => {
        console.log(e.name, ':', e.message)
    });
})

readLine()

function readLine() {
    readline.question(`msg?`, (msg) => {
        if (msg == 'u') {
            socket.emit('update', 'updateChat')
            readLine()
        } else if (msg == 'close') {

        } else {
            socket.emit('message', {
                message: msg,
                userName: username
            })
            readLine()
        }

    })
}
const username = process.argv[2] || 'Anonymous' + Math.random().toString(36).slice(2)
const uri = "http://"+process.argv[3]+".ngrok.io"
const socket = require('socket.io-client')(uri);

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

socket.on('msg', (data) => {
    console.log(data.name, ':', data.message)
})

readLine()

function readLine() {
    readline.question(``, (msg) => {
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
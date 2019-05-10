const username = process.argv[2] || 'Luis'
const uri = process.argv[3]
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
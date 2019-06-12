const username = process.argv[2] || 'Anonymous' + Math.random().toString(36).slice(2)
const uri = "https://chat-cli-chatao.herokuapp.com/"
const socket = require('socket.io-client')(uri);

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

socket.on('msg', (data) => {
    // console.log(data.message.toString())
    const msg = data.message
    if (msg) {
        console.log(data.name, ':', data.message)
            // console.log(" ")
    }
})

readLine()

function readLine() {
    readline.question(``, (msg) => {
        if (msg == 'close') {
            console.log('bye!!')
        } else {
            socket.emit('message', {
                message: msg,
                userName: username
            })
            readLine()
        }

    })
}
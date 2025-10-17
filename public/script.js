// public/script.js

const socket = io()

const inputMsg = document.getElementById('inputMsg')
const btnEnviar = document.getElementById('btnEnviar')
const message = document.getElementById('message')

socket.on('connect', () => {
    console.log('Conectado ao servidor via Socket.io')
})

btnEnviar.addEventListener('click', () => {
    const msg = inputMsg.value
    if (msg.trim() !== '') {
        socket.emit('chat message', msg)
        inputMsg.value = ''
    }
})

socket.on('chat message', (msg) => {
    const li = document.createElement('li')
    li.textContent = msg
    message.appendChild(li)
})

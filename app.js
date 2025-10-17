const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const port = 3000

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')))

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// WebSocket
io.on('connection', (socket) => {
    console.log('Novo usuário conectado.')

    socket.on('chat message', (msg) => {
        console.log('Mensagem recebida:', msg)
        io.emit('chat message', msg)
    })

    socket.on('disconnect', () => {
        console.log('Usuário desconectado.')
    })
})


const porta = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})

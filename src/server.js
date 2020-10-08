const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();
//vamos desacoplar o app ao protocolo http 
const server = require('http').Server(app); //permite o http
const io = require('socket.io')(server); //para conexões via web socket também

mongoose.connect('mongodb+srv://omnistack:omnistack@grow.q9vt3.mongodb.net/appcamera?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//disponibilizar o io para todos os middleware da aplicação
app.use((req, res, next) => { //aparti daqui todas as outras rotas poderam utilizar o oi (por isso vem acima)
  req.io = io;

  next(); //para garantir que as outras rotas seja executas após o io e não quebre a aplicação
})

app.use(cors()); //para as aplicações possam acessar nossa api

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))); //para manipular arquivos estáticos

app.use(routes);

server.listen(3333);
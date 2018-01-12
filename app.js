var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
app.use(express.static(__dirname + '/public'))
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html')
})

/**
 * 存储在线用户
 * @type {Array}
 */
var users = [];
io.on('connection', function(socket){
    socket.on('addUser', function(user){
        users.push(user);
        socket.user = user;
        socket.broadcast.emit('queryUser', users);
        socket.emit('queryUser', users);
        socket.emit('cacheCurrentUser', user);
        socket.broadcast.emit('notify', {
            user: user,
            action: 'join'
        });
    })
    socket.on('disconnect', function(){
        users = users.filter(function(item){
            return item != socket.user;
        })
        socket.broadcast.emit('queryUser', users);
        socket.broadcast.emit('notify', {
            user: socket.user,
            action: 'leave'
        });
    })
    socket.on('addMessage', function(message){
        socket.broadcast.emit('queryMessage', message);
        socket.emit('queryMessage', message);
    })
})
http.listen(3000, function(){
    console.log('server start')
})
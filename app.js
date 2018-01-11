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
        socket.emit('queryUser', users);
    })
    socket.on('disconnect', function(){
        users = users.filter(function(item){
            return item != socket.user;
        })
    })
})
http.listen(3000, function(){
    console.log('server start')
})
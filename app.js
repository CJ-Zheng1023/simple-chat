var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
app.use(express.static(__dirname + '/public'))
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html')
})
io.on('connetion', function(socket){

})
http.listen(3000, function(){
    console.log('server start')
})
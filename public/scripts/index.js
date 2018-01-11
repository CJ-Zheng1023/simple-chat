$(function(){
    $('.scrollable').slimScroll({
        height: '100%'
    });
    $('.side-bar-toggle').on('click', function(){
        $('.side-bar').toggleClass('open');
    })


    var socket = io(), $login = $('.chat-login'), $room = $('.chat-room'), $userList = $('#userList'),
        $userCount = $('#userCount');
    $('#loginForm').submit(function(){
        var $loginName = $('#loginName').val().trim();
        if(!$loginName){
            return false;
        }
        $login.fadeOut(function(){
            $room.fadeIn();
        });
        socket.emit('addUser', $loginName);
        return false;
    })
    socket.on('queryUser', function(users){
        $.each(users, function(index, user){
            $userList.append('<li class="list-group-item">' + user + '</li>')
        })
        $userCount.text(users.length);
    })
})
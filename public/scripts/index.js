$(function(){
    $('.scrollable').slimScroll({
        height: '100%'
    });
    $('.side-bar-toggle').on('click', function(){
        $('.side-bar').toggleClass('open');
    })
})
//设置标题栏事件
function setTopbarEvent() {
    $('.topbar .addons ul li').eq(1).click(function() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            $(this).children('span').removeClass('icon-arrows-exit-fullscreen');
            $(this).children('span').addClass('icon-arrows-fullscreen');
        } else {
            document.documentElement.requestFullscreen();
            $(this).children('span').addClass('icon-arrows-exit-fullscreen');
            $(this).children('span').removeClass('icon-arrows-fullscreen');
        }
    });
    $('.topbar .addons ul li').eq(0).click(function() {
        $('.menu').toggle(150);
        $('.menu>div').hide();
        $('.menu .mr').show();
    });


    $('.logo').click(function() {
        if ($('.left_bar').css('left') == '0px') {
            closeLeftBar();
        } else {
            startLeftBar('setting');
        }
    });
}
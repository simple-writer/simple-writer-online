function startFunction() {
    setloca();
    querySettings();
    setSettingEvents();
    setEvents();
    setTopbarEvent();
    startDialog('files', false);
    queryTexts();
    setFilesEvent();
    setMenuEvents();
    try {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.dialog-show ul.texts li div').css('transform', 'translateX(0px)');
            console.log('mobie');
        }
    } catch (e) {

    }
    setTimeout(function() {
        alert('休息一下吧，你已经工作了三十分钟了')
    }, 1800000);
    setTime();
    setInterval(() => {
        setTime();
    }, 1000);

}
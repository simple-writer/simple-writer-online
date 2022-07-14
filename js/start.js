function startFunction() {
    setloca();
    try{
        querySettings();
        queryTexts();
    }catch(e){

    }
    setSettingEvents();
        setEvents();
        setTopbarEvent();
    setFilesEvent();
    setMenuEvents();
    tolanguage();
    try {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.dialog-show ul.texts li div').css('transform', 'translateX(0px)');
            console.log('mobie');
        }
    } catch (e) {

    }
    setTimeout(function() {
        alert(value[language].tired)
    }, 1800000);
    setTime();
    setInterval(() => {
        setTime();
    }, 1000);

}
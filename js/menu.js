function setMenuEvents() {
    $('.menu .mr .save').click(function() {
        saveNowFile();
        alert(value[language].saved+' At ' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());

    });
    $('.menu .mr .files').click(function() {
        startDialog('files', true);
    });
    $('.menu .mr .setting').click(function() {
        $('.logo').click();
    });
    $('.menu li[data-group]').click(function() {
        $('.menu').toggle(150);
        $('.menu').toggle(150);
        $('.menu>div').hide();
        $('.menu .' + $(this).attr('data-group')).show();
    });
    $('.menu .togglemode').click(function() {
        if (isread) {
            $('.editor').removeClass('read');
            setEvents();

            isread = false;
            $(this).html(value[language].menu_modeon)
        } else {
            $('.editor').addClass('read');
            $('.editor .h1').attr('contenteditable', 'false');
            $('.editor .h2').attr('contenteditable', 'false');
            $('.editor .h3').attr('contenteditable', 'false');
            $('.editor .h4').attr('contenteditable', 'false');
            $('.editor .p').attr('contenteditable', 'false');
            $('.editor .blockquote').attr('contenteditable', 'false');

            isread = true;
            $(this).html(value[language].menu_modeoff)
        }
    });
    $('.menu .mr .lin_save').click(function() {
        startDialog('lin_save', true);
    })
}
function setMenuEvents() {
    $('.menu .mr .save').click(function() {
        saveNowFile();
        alert('已保存 At ' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());

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
    $('.menu .addonedown').click(function() {
        var newxj = document.createElement('div');
        newxj.className = 'xjie';
        newxj.innerHTML = '<div class="h3"></div><div class="p"></div>';
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2') {
            $('.editor').get()[0].insertBefore(newxj, jsnow.nextSibling);
            setEvents();
        } else {
            $('.editor').get()[0].insertBefore(newxj, jsnow.parentNode.nextSibling);
            setEvents();
        }
    });
    $('.menu .addoneup').click(function() {
        var newxj = document.createElement('div');
        newxj.className = 'xjie';
        newxj.innerHTML = '<div class="h3"></div><div class="p"></div>';
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2') {} else {
            if (jsnow.parentNode.className == 'xjie mr') {} else {
                $('.editor').get()[0].insertBefore(newxj, jsnow.parentNode);
                setEvents();
            }

        }
    });
    $('.menu .addoneblockquitedown').click(function() {

        var newp = document.createElement('div');
        newp.className = 'p';
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2') {
            $('.editor .xjmr').get()[0].insertBefore(newp, $('.editor .xjmr>*').eq(0).get()[0]);
            var newxj = document.createElement('div');
            newxj.className = 'blockquote';
            $('.editor .xjmr').get()[0].insertBefore(newxj, $('.editor .xjmr>*').eq(0).get()[0]);
            setEvents();
        } else {
            jsnow.parentNode.insertBefore(newp, jsnow.nextSibling);
            var newxj = document.createElement('div');
            newxj.className = 'blockquote';
            jsnow.parentNode.insertBefore(newxj, jsnow.nextSibling);
            setEvents();
        }
    });
    $('.menu .addoneblockquiteup').click(function() {
        var newxj = document.createElement('div');
        newxj.className = 'blockquote';

        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2' || jsnow.className == 'h3') {} else {
            jsnow.parentNode.insertBefore(newxj, jsnow);
            setEvents();
        }
    });
    $('.menu .delthe').click(function() {
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2' || jsnow.className == 'h3') {} else {
            var nextf = jsnow;
            try {
                for (var i = 0; i > -1; i++) {
                    if (nextf.nextSibling.nodeType == 3) {
                        nextf = nextf.nextSibling;
                    } else {
                        break;
                    }
                }
                jsnow.remove();
                setEvents();
                nextf.focus();
            } catch (e) {
                jsnow.remove();
                setEvents();
            }

        }
    });
    $('.menu .deltheone').click(function() {
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2' || jsnow.parentNode.className ==
            'xjie mr') {} else {
            jsnow.parentNode.remove();
            setEvents();
        }
    });
    $('.menu .togglemode').click(function() {
        if (isread) {
            $('.editor').removeClass('read');
            setEvents();

            isread = false;
            $(this).html('打开阅读模式')
        } else {
            $('.editor').addClass('read');
            $('.editor .h1').attr('contenteditable', 'false');
            $('.editor .h2').attr('contenteditable', 'false');
            $('.editor .h3').attr('contenteditable', 'false');
            $('.editor .h4').attr('contenteditable', 'false');
            $('.editor .p').attr('contenteditable', 'false');
            $('.editor .blockquote').attr('contenteditable', 'false');

            isread = true;
            $(this).html('关闭阅读模式')
        }
    });
    $('.menu .mr .lin_save').click(function() {
        startDialog('lin_save', true);
    })
}
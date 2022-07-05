var nowfocus;
var nowstart;
var zdsave = setInterval(saveNowFile, 180000);
var isread = false;
var daorustr;
querySettings();

function startFunction() {
    setloca();
    querySettings();
    setSettingEvents();
    setInterval(function() {
        querySettings();
    }, 500);
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


}
// 渲染Files页面
function queryTexts() {
    $('.dialog .dialog-show ul.texts').html('');
    var textobj = JSON.parse(localStorage.getItem('texts'));
    for (var i in textobj) {
        $('.dialog .dialog-show ul.texts').append(`<li class="text"><p>${i}</p><div><span class="del" title="删除">⛔</span><span class="rename" title="重命名">📝</span></div></li>`)
    }
    setFilesEvent();
}
// 设置文件目录事件
function setFilesEvent() {
    $('.dialog .dialog-show .files ul.cz .xinjian').click(function() {
        // 新建
        startDialog('newfile', !!nowstart);
    });
    $('.dialog .dialog-show .files ul.cz .linggan').click(function() {
        // 灵感
        var a = JSON.parse(localStorage.getItem('texts'));
        var val = '灵感 At ' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
        a[val] = "<div class='xjie mr'><div class='p'></div></div>";
        localStorage.setItem('texts', JSON.stringify(a));
        startFile(val);
        closeDialog();
        queryTexts();
        setFilesEvent();
    });
    $('.dialog .dialog-show .files ul.texts li p').click(function() {
        saveNowFile();
        startFile($(this).html());
        if (isread) {
            $('.menu .togglemode').click();
        }
        closeDialog();
    })
    $('.dialog .dialog-show .newfile button').click(function() {
        saveNowFile();

        var val = $('#newfilename').val();
        if (val == '') {
            alert('文件名不能为空！');
        } else {
            var a = JSON.parse(localStorage.getItem('texts'));
            a[val] = "<div class='h1'></div><div class='h2'></div><div class='xjie mr'><div class='p'></div></div>";
            localStorage.setItem('texts', JSON.stringify(a));
            startFile(val);
            if (isread) {
                $('.menu .togglemode').click();
            }
            closeDialog();
            queryTexts();
            setFilesEvent();
        }
    });
    $('.dialog .dialog-show .files ul.texts li span.del').click(function() {
        var a = confirm('你确定要删除吗?此操作不可逆!');
        if (a) {
            var b = JSON.parse(localStorage.getItem('texts'));
            delete b[$(this).parents('li.text').find('p').html()];
            console.log($(this).parents('li.text'));
            localStorage.setItem('texts', JSON.stringify(b));
            queryTexts();
        }
    });
    $('.dialog .dialog-show .files ul.texts li span.rename').click(function() {
        var names = prompt('请输入新名字');
        if (names == '') {
            alert('不得为空');
        } else {
            var b = JSON.parse(localStorage.getItem('texts'));
            b[names] = b[$(this).parents('li.text').find('p').html()];
            delete b[$(this).parents('li.text').find('p').html()];
            localStorage.setItem('texts', JSON.stringify(b));
            queryTexts();
        }
    });
    $('.dialog .dialog-show .lin_save ul li.txt').click(function() {
        var obj = queryNowTextToLinSave();
        var data = '';
        data += obj['h1'];
        data += '\n' + obj['h2'];
        for (var i in obj) {
            if (i == 'h1' || i == 'h2') {} else {
                data += '\n';
                for (var i2 = 0; i2 < obj[i].length; i2++) {
                    data += '\n'
                    for (var i3 in obj[i][i2]) {
                        if (obj[i][i2][i3] != false) {
                            if (i3 == 'p') {
                                var da = '';
                                for (var i4 = 0; i4 < obj[i][i2][i3].length; i4++) {
                                    if (i4 + 1 < obj[i][i2][i3].length) {
                                        da += obj[i][i2][i3][i4] + '\n';

                                    } else {
                                        da += obj[i][i2][i3][i4];
                                    }
                                }
                                data += '\n\n' + da;
                            } else {
                                data += '\n' + obj[i][i2][i3];
                            }
                        }
                    }
                }
            }
        }
        downloadFile(nowstart + '.txt', data);
    });
    $('.dialog .dialog-show .lin_save ul li.md').click(function() {
        var obj = queryNowTextToLinSave();
        var data = '';
        data += '# ' + obj['h1'];
        data += '\n### ' + obj['h2'];
        for (var i in obj) {
            if (i == 'h1' || i == 'h2') {} else {
                for (var i2 = 0; i2 < obj[i].length; i2++) {
                    for (var i3 in obj[i][i2]) {
                        if (obj[i][i2][i3] != false) {
                            if (i3 == 'h') {
                                data += '\n## ' + obj[i][i2][i3];
                            } else if (i3 == 'p') {
                                var da = '';
                                for (var i4 = 0; i4 < obj[i][i2][i3].length; i4++) {
                                    if (i4 + 1 < obj[i][i2][i3].length) {
                                        da += obj[i][i2][i3][i4] + '\n';

                                    } else {
                                        da += obj[i][i2][i3][i4];
                                    }
                                }
                                data += '\n' + da;
                            } else if (i3 == 'blockquote') {
                                data += '\n> ' + obj[i][i2][i3];
                            }
                        }
                    }
                }
            }
        }
        downloadFile(nowstart + '.md', data);
    });
    $('.dialog .dialog-show .lin_save ul li.doc').click(function() {
        var obj = queryNowTextToLinSave();
        var data = '';
        data += '<h1>' + obj['h1'] + '</h1>';
        data += '<h3>' + obj['h2'] + '</h3>';
        for (var i in obj) {
            if (i == 'h1' || i == 'h2') {} else {
                for (var i2 = 0; i2 < obj[i].length; i2++) {
                    for (var i3 in obj[i][i2]) {
                        if (obj[i][i2][i3] != false) {
                            if (i3 == 'h') {
                                data += '<h2>' + obj[i][i2][i3] + '</h2>';
                            } else if (i3 == 'p') {
                                var da = '';
                                for (var i4 = 0; i4 < obj[i][i2][i3].length; i4++) {
                                    if (i4 + 1 < obj[i][i2][i3].length) {
                                        da += obj[i][i2][i3][i4] + '<br>';

                                    } else {
                                        da += obj[i][i2][i3][i4];
                                    }
                                }
                                data += '<p>' + da + '</p>'
                            } else if (i3 == 'blockquote') {
                                data += '<blockquote>' + obj[i][i2][i3] + '</blockquote>';
                            }
                        }
                    }
                }
            }
        }
        data = `<!DOCTYPE html>
        <html lang="zh-cn">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${nowstart}</title>
        </head>
        <body>
            ${data}
        </body>
        </html>`
        downloadFile(nowstart + '.doc', data);
    });
    $('.dialog .dialog-show .lin_save ul li.html').click(function() {
        var obj = queryNowTextToLinSave();
        var data = '';
        data += '<h1>' + obj['h1'] + '</h1>';
        data += '<h3>' + obj['h2'] + '</h3>';
        for (var i in obj) {
            if (i == 'h1' || i == 'h2') {} else {
                for (var i2 = 0; i2 < obj[i].length; i2++) {
                    for (var i3 in obj[i][i2]) {
                        if (obj[i][i2][i3] != false) {
                            if (i3 == 'h') {
                                data += '<h2>' + obj[i][i2][i3] + '</h2>';
                            } else if (i3 == 'p') {
                                var da = '';
                                for (var i4 = 0; i4 < obj[i][i2][i3].length; i4++) {
                                    if (i4 + 1 < obj[i][i2][i3].length) {
                                        da += obj[i][i2][i3][i4] + '<br>';

                                    } else {
                                        da += obj[i][i2][i3][i4];
                                    }
                                }
                                data += '<p>' + da + '</p>'
                            } else if (i3 == 'blockquote') {
                                data += '<blockquote>' + obj[i][i2][i3] + '</blockquote>';
                            }
                        }
                    }
                }
            }
        }
        data = `<!DOCTYPE html>
        <html lang="zh-cn">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${nowstart}</title>
        </head>
        <body>
            ${data}
        </body>
        </html>`
        downloadFile(nowstart + '.html', data);
    });
    $('.dialog .dialog-show .lin_save ul li.chtml').click(function() {
        var obj = queryNowTextToLinSave();
        var data = '';
        data += '<h1>' + obj['h1'] + '</h1>';
        data += '<h3>' + obj['h2'] + '</h3>';
        for (var i in obj) {
            if (i == 'h1' || i == 'h2') {} else {
                for (var i2 = 0; i2 < obj[i].length; i2++) {
                    for (var i3 in obj[i][i2]) {
                        if (obj[i][i2][i3] != false) {
                            if (i3 == 'h') {
                                data += '<h2>' + obj[i][i2][i3] + '</h2>';
                            } else if (i3 == 'p') {
                                var da = '';
                                for (var i4 = 0; i4 < obj[i][i2][i3].length; i4++) {
                                    if (i4 + 1 < obj[i][i2][i3].length) {
                                        da += obj[i][i2][i3][i4] + '<br>';

                                    } else {
                                        da += obj[i][i2][i3][i4];
                                    }
                                }
                                data += '<p>' + da + '</p>'
                            } else if (i3 == 'blockquote') {
                                data += '<blockquote>' + obj[i][i2][i3] + '</blockquote>';
                            }
                        }
                    }
                }
            }
        }
        data = `<!DOCTYPE html>
        <html lang="zh-cn">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${nowstart}</title>
            <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        :root {
            --textcolor: ${$('.editor').css('--textcolor')};
            --bgcolor: ${$('.editor').css('--bgcolor')};
            --maincolor: ${$('.editor').css('--maincolor')};
        }
        
        body {
            color: var(--textcolor, #000);
            background-color: var(--bgcolor, #f4f4f4);
            width: 90%;
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 20px;
            height: calc(100vh - 80px);
            overflow-y: scroll;
            overflow-x: visible;
        }
        
        body * {
            outline: 0;
            font-weight: 500;
            text-align: left;
            line-height: 40px;
            font-size: 20px;
            position: relative;
            margin: 20px 0;
        }
        
        h1,
        h2 {
            color: var(--maincolor, #00baff);
            text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        }
        
        h1 {
            font-weight: bold;
            font-size: 25px;
        }
        
        h2 {
            font-weight: 600;
        }
        
        p {
            font-weight: 500;
            margin-left: 20px;
        }
        
        h3 {
            font-size: 20px;
            margin-left: 30px;
            opacity: 0.6;
            font-weight: 300;
        }
        
        blockquote {
            opacity: 0.8;
            text-indent: 2em;
            padding-left: 20px;
            position: relative;
            height: max-content;
            margin-left: 20px;
        }
        
        blockquote:after {
            content: '';
            width: 3px;
            height: 100%;
            --maincolor: inherit;
            background-color: var(--maincolor, #00baff);
            position: absolute;
            left: 0;
            top: 0;
        }
        </style>
        </head>
        <body>
            ${data}
        </body>
        </html>`
        downloadFile(nowstart + '.html', data);
    });
    $('#dljson').change(function() {
        $('.dialog-show .page.daoruhelper .label').html('读取中');
        var resultFile = document.getElementById("dljson").files[0];
        if (resultFile) {
            var reader = new FileReader();

            reader.readAsText(resultFile, 'UTF-8');
            reader.onload = function(e) {
                var urlData = this.result;
                daorustr = urlData;
                $('.dialog-show .page.daoruhelper .label').html('读取成功');
            };
        }
    })
    $('.dialog-show .page.daoruhelper button.ok').click(function() {
        if (daorustr) {
            localStorage = JSON.parse(daorustr);
            alert('导入成功');
            closeDialog();
        } else {
            alert('导入数据有异常');
        }

    });
    $('.dialog-show .page.daoruhelper button.no').click(function() {
        daorustr = undefined;
        $('.dialog-show .page.daoruhelper .label').html('点击我<br>或将文件拖入这里');
        closeDialog();
    });
}
// 打开文件
function startFile(str) {
    $('.topbar .title').html(str);
    $('.editor').html(JSON.parse(localStorage.getItem('texts'))[str]);
    nowstart = str;
    setEvents();
    $('.editor [contenteditable="true"]:first').focus()
}

function saveNowFile() {
    if (nowstart) {
        var text = $('.editor').html();
        $('#saves').html(text);
        $('#saves *').attr('contenteditable', '');
        $('#saves *').attr('style', '');
        var acl = $('#saves').html();
        var fz = 0;
        while (true) {
            var a = acl.indexOf('contenteditable=""');
            if (a != -1) {
                acl = acl.substring(0, a) + acl.substring(a + 18, acl.length);
            } else {
                break;
            }
        }
        while (true) {
            var a = acl.indexOf('style=""');
            if (a != -1) {
                acl = acl.substring(0, a) + acl.substring(a + 8, acl.length);
            } else {
                break;
            }
        }
        var a = JSON.parse(localStorage.getItem('texts'));
        a[nowstart] = acl;
        localStorage.setItem('texts', JSON.stringify(a));
    }
}

function alert(str) {
    var a = document.createElement('div');
    a.innerHTML = str;
    document.querySelector('.message').append(a);
    setTimeout(() => {
        a.remove();
    }, 3000);
}
//设置菜单事件
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
            $('.editor *').attr('contenteditable', 'false');
            isread = true;
            $(this).html('关闭阅读模式')
        }
    });
    $('.menu .mr .lin_save').click(function() {
        startDialog('lin_save', true);
    })
}
//初始化本地存储
function setloca() {
    if (!localStorage.getItem('iswent')) {
        localStorage.setItem('iswent', 'true');
        localStorage.setItem('settings', '{"theme":"Light","maincolor":"#00BAFF","fontfamily":"sans-serif","titlemode":false}');
        localStorage.setItem('texts', '{}')
    }
}
//实现设置
function querySettings() {
    var a = JSON.parse(localStorage.getItem('settings'));
    //Theme
    if (a.theme == 'Light') {
        $('.left_bar .setting .theme div.show').html('亮');
        $('*').css({
            '--bgcolor': '#f4f4f4',
            '--titlebgcolor': '#eeeeee',
            '--textcolor': '#000',
            '--fa-primary-color': '#000',
            '--leftbar-show-hover-bgcolor': '#fff',
            '--leftbar-go-hover-bgcolor': '#e6e6e6',
            '--editor-focus-bgcolor': 'rgb(235,235,235)',
            '--box-shadow-color2': 'rgba(0,0,0,0.2)'
        });
    } else if (a.theme == 'Dark') {
        $('.left_bar .setting .theme div.show').html('暗');
        $('*').css({
            '--bgcolor': '#0b0b0b',
            '--titlebgcolor': '#111111',
            '--textcolor': '#fff',
            '--fa-primary-color': '#fff',
            '--leftbar-show-hover-bgcolor': '#000',
            '--leftbar-go-hover-bgcolor': '#191919',
            '--editor-focus-bgcolor': 'rgb(20,20,20)',
            '--box-shadow-color2': 'rgba(255,255,255,0.4)'
        });
    };
    //MainColor
    if (a.maincolor == "#00BAFF") {
        $('.left_bar .setting .maincolor div.show').html('蓝色');
        $('*').css('--maincolor', '#00BAFF');
        $('*').css('--fa-secondary-color', '#00BAFF');
    } else if (a.maincolor == "#EA6725") {
        $('.left_bar .setting .maincolor div.show').html('橙色');
        $('*').css('--maincolor', '#EA6725');
        $('*').css('--fa-secondary-color', '#EA6725');
    } else if (a.maincolor == "#31EA23") {
        $('.left_bar .setting .maincolor div.show').html('绿色');
        $('*').css('--maincolor', '#31EA23');
        $('*').css('--fa-secondary-color', '#31EA23');
    } else if (a.maincolor == "#e7ea22") {
        $('.left_bar .setting .maincolor div.show').html('黄色');
        $('*').css('--maincolor', '#e7ea22');
        $('*').css('--fa-secondary-color', '#e7ea22');
    } else if (a.maincolor == "#ea2ae7") {
        $('.left_bar .setting .maincolor div.show').html('粉色');
        $('*').css('--maincolor', '#ea2ae7');
        $('*').css('--fa-secondary-color', '#ea2ae7');
    } else {
        $('.left_bar .setting .maincolor div.show').html(a.maincolor);
        $('*').css('--maincolor', a.maincolor);
        $('*').css('--fa-secondary-color', a.maincolor);
    };
    //FontFamily
    if (a.fontfamily == 'sans-serif') {
        $('.left_bar .setting .fontfamily div.show').html('sans-serif');
        $('*').css('--font-family', 'sans-serif');
    } else {
        $('.left_bar .setting .fontfamily div.show').html(a.fontfamily);
        $('*').css('--font-family', a.fontfamily);
    };
    //TitleMode
    if (a.titlemode) {
        $('.left_bar .setting .titlemode div.show').html('开');
        $('.topbar').css('opacity', '0');
        $('.left_bar').css('height', '100%');
        $('.left_bar').css('top', '0');
        $('.cover').css('height', '100%');
        $('.cover').css('top', '0');
    } else {
        $('.left_bar .setting .titlemode div.show').html('关');
        $('.topbar').css('opacity', '1');
        $('.left_bar').css('height', 'calc(100% - 40px)');
        $('.left_bar').css('top', '40px');
        $('.cover').css('height', '100%');
        $('.cover').css('top', '0');
    }
}
// 设置设置事件
function setSettingEvents() {
    $('.left_bar .setting .theme div.show').click(function() {
        var a = JSON.parse(localStorage.getItem('settings'));
        if (a.theme == 'Light') {
            a.theme = 'Dark';
        } else {
            a.theme = 'Light';
        }
        localStorage.setItem('settings', JSON.stringify(a));
        querySettings();
    });
    $('.left_bar .setting .fontfamily div.show').click(function() {
        var a = JSON.parse(localStorage.getItem('settings'));
        if (a.fontfamily == 'sans-serif') {
            a.fontfamily = 'monospace';
        } else if (a.fontfamily == 'monospace') {
            a.fontfamily = 'cursive';
        } else if (a.fontfamily == 'cursive') {
            a.fontfamily = 'serif'
        } else if (a.fontfamily == 'serif') {
            a.fontfamily = 'Consolas'
        } else {
            a.fontfamily = 'sans-serif'
        }
        localStorage.setItem('settings', JSON.stringify(a));
        querySettings();
    });
    $('.left_bar .setting .titlemode div.show').click(function() {
        var a = JSON.parse(localStorage.getItem('settings'));
        if (a.titlemode) {
            a.titlemode = false;
        } else {
            a.titlemode = true;
        }
        localStorage.setItem('settings', JSON.stringify(a));
        querySettings();
    });
    $('.left_bar .setting .maincolor div.show').click(function() {
        var a = JSON.parse(localStorage.getItem('settings'));
        if (a.maincolor == '#00BAFF') {
            a.maincolor = '#EA6725';
        } else if (a.maincolor == '#EA6725') {
            a.maincolor = '#31EA23';
        } else if (a.maincolor == '#31EA23') {
            a.maincolor = '#e7ea22'
        } else if (a.maincolor == '#e7ea22') {
            a.maincolor = '#ea2ae7'
        } else {
            a.maincolor = '#00BAFF'
        }
        localStorage.setItem('settings', JSON.stringify(a));
        querySettings();
    });
    $('.cover').click(function() {
        $('.left_bar').css('left', '-' + ($('.left_bar').width() + 70) + 'px');
        $('.cover').css('opacity', '0');
        $('.cover').css('pointer-events', 'none');
    });
    $('.left_bar .setting .go.about').click(function() {
        startLeftBar('about');
    });
    $('.left_bar .setting .go.help').click(function() {
        startLeftBar('help');
    });
    $('.left_bar .setting .go.daochu').click(function() {
        var a = JSON.stringify(localStorage);
        downloadFile('simple-writer.json', a);
        alert('已导出，下次就通过"从文件导入数据"导入')
    });
    $('.left_bar .setting .go.daoru').click(function() {
        startDialog('daoruhelper', true);
    });
}
// 设置Editor内的事件
function setEvents() {
    $('.editor .h1').focus(function() {
        nowfocus = $(this);
    });
    $('.editor .h2').focus(function() {
        nowfocus = $(this);
    });
    $('.editor .h3').focus(function() {
        nowfocus = $(this);
    });
    $('.editor .p').focus(function() {
        nowfocus = $(this);
    });
    $('.editor .blockquote').focus(function() {
        nowfocus = $(this);
    });
    $('.editor .h1').attr('contenteditable', 'true');
    $('.editor .h2').attr('contenteditable', 'true');
    $('.editor .h3').attr('contenteditable', 'true');
    $('.editor .p').attr('contenteditable', 'true');
    $('.editor .blockquote').attr('contenteditable', 'true');

}
// 快捷键
$(document).keydown(function(e) {
    console.log(e.key, e.keyCode);
    if (e.ctrlKey && e.keyCode == 13 && !e.altKey) {
        e.preventDefault();
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
    } else if (e.ctrlKey && e.altKey && e.keyCode == 13) {
        e.preventDefault();
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
    } else if (e.ctrlKey && !e.altKey && e.key == 'q') {
        e.preventDefault();

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
            var newp = document.createElement('div');
            newp.className = 'p';
            jsnow.parentNode.insertBefore(newp, jsnow.nextSibling);
            var newxj = document.createElement('div');
            newxj.className = 'blockquote';
            jsnow.parentNode.insertBefore(newxj, jsnow.nextSibling);
            setEvents();
        }
    } else if (e.ctrlKey && e.altKey && e.key == 'q') {
        e.preventDefault();
        var newxj = document.createElement('div');
        newxj.className = 'blockquote';
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2' || jsnow.className == 'h3') {} else {
            jsnow.parentNode.insertBefore(newxj, jsnow);
            setEvents();
        }
    } else if (!e.ctrlKey && e.key == 'Delete') {
        e.preventDefault();
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


    } else if (e.ctrlKey && e.key == 'Delete') {
        e.preventDefault();
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2' || jsnow.parentNode.className ==
            'xjie mr') {} else {
            jsnow.parentNode.remove();
            setEvents();
        }
    } else if (e.key == 'F11') {
        e.preventDefault();
        $('.addons ul li').eq(1).click();
    } else if (e.ctrlKey && e.shiftKey && !e.altKey && e.key == 'S') {
        e.preventDefault();
        $('.logo').click();
    } else if (e.ctrlKey && !e.shiftKey && !e.altKey && e.key == 's') {
        e.preventDefault();
        saveNowFile();
        alert('已保存 At ' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());

    } else if (e.ctrlKey && !e.shiftKey && e.key == 'h') {
        e.preventDefault();
        startDialog('files', true);
    } else if (e.ctrlKey && !e.shiftKey && e.altKey && e.key == 's') {
        e.preventDefault();
        startDialog('lin_save', true);
    }
});
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
// 打开对话框
function startDialog(page, close) {
    $('.dialog .dialog-show').css({
        'left': '50%',
        'opacity': '1'
    });
    $('.dialog .dialog-cover').css({
        'pointer-events': 'all',
        'background-color': 'rgba(128,128,128,0.3)'
    });
    $('.dialog .dialog-show .page').hide();
    $('.dialog .dialog-show .page.' + page).show();
    if (close) {
        $('.dialog .dialog-show .close').show();
    } else {
        $('.dialog .dialog-show .close').hide();
    }
}
// 关闭对话框
function closeDialog() {
    $('.dialog .dialog-show').css({
        'left': '-100%',
        'opacity': '0'
    });
    $('.dialog .dialog-cover').css({
        'pointer-events': 'none',
        'background-color': 'rgba(128,128,128,0)'
    });
}

function startLeftBar(a) {
    $('.left_bar').css('left', '0px');
    $('.cover').css('opacity', '1');
    $('.cover').css('pointer-events', 'all');
    $('.left_bar .page').hide();
    $('.left_bar .page.' + a).show();
}

function closeLeftBar() {
    $('.left_bar').css('left', '-' + ($('.left_bar').width() + 70) + 'px');
    $('.cover').css('opacity', '0');
    $('.cover').css('pointer-events', 'none');
    $('.left_bar .page').hide();

}
$('.close').click(closeDialog);

function downloadFile(fileName, data) { // 保存 string 到 文本文件
    let aLink = document.createElement('a')
    let blob = new Blob([data]); //new Blob([content])
    let evt = document.createEvent("HTMLEvents")
    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName
    aLink.href = URL.createObjectURL(blob)
    aLink.click()
}

function queryNowTextToLinSave() {
    var a = {}
    var a_h1 = $('.editor .h1').text();
    if (a_h1) {
        a['h1'] = a_h1;
    } else {
        a['h1'] = false;
    };
    var a_h2 = $('.editor .h2').text();
    if (a_h2) {
        a['h2'] = a_h2;
    } else {
        a['h2'] = false;
    };
    var a_xjmr = [{ 'h': false }];
    var a_xjmr_c = document.querySelectorAll('.editor .xjie.mr>*');
    for (var i = 0; i < a_xjmr_c.length; i++) {
        a_xjmr[a_xjmr.length] = {};
        a_xjmr[a_xjmr.length - 1][a_xjmr_c[i].className] = a_xjmr_c[i].innerText;
    }
    a['xjmr'] = a_xjmr;
    for (var i = 1; i < document.querySelectorAll('.editor .xjie').length; i++) {
        var a_xj = [];
        a_xj[0] = { 'h': document.querySelectorAll('.editor .xjie')[i].querySelector('.h3').innerText };
        for (var i2 = 1; i2 < $('.editor .xjie').eq(i).find('>*').length; i2++) {
            a_xj[a_xj.length] = {};
            if ($('.editor .xjie').eq(i).find('>*').eq(i2).get()[0].className == 'p') {
                var sa = $('.editor .xjie').eq(i).find('>*').eq(i2).get()[0];
                var sas = $(sa).find('>*');
                a_xj[a_xj.length - 1]['p'] = [];
                if (sas.length > 0) {
                    for (var i3 = 0; i3 < sas.length; i3++) {
                        a_xj[a_xj.length - 1]['p'][i3] = sas.eq(i3).text();
                    }
                } else {
                    a_xj[a_xj.length - 1]['p'][0] = sa.innerText;
                }

            } else {
                a_xj[a_xj.length - 1][$('.editor .xjie').eq(i).find('>*').eq(i2).get()[0].className] = $('.editor .xjie').eq(i).find('>*').eq(i2).get()[0].innerText;
            }
        }
        a['xj' + i] = a_xj;
    }
    return a;
}
$(".editor").on('paste', function(event) {
    textPaste(event);
});

function textPaste(event) {
    event.preventDefault();
    console.log('gssss');
    var text;
    var clp = (event.originalEvent || event).clipboardData;
    // 兼容针对于opera ie等浏览器
    if (clp === undefined || clp === null) {
        text = window.clipboardData.getData("text") || "";
        if (text !== "") {
            if (window.getSelection) {
                // 针对于ie11 10 9 safari
                var newNode = document.createElement("span");
                newNode.innerHTML = text;
                window.getSelection().getRangeAt(0).insertNode(newNode);
            } else {
                // 兼容ie10 9 8 7 6 5
                document.selection.createRange().pasteHTML(text);
            }
        }
    } else {
        // 兼容chorme或hotfire
        text = clp.getData('text/plain') || "";
        if (text !== "") {
            document.execCommand('insertText', false, text);
        }
    }
}
/*
{
    'h1':false||'',
    'h2':false||'',
    'xjmr':{
        'h':false,
        'p':'',
        'blockquote':''
    }
    'xj1':{
        'h':'',
        'p':'',
        'blockquote':''
    }
}
*/

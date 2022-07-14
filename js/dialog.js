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
    $('.dialog .dialog-show .close').click(function() { closeDialog() });
    $('.dialog .dialog-show .files ul.cz .xinjian').click(function() {
        // 新建
        startDialog('newfile', !!nowstart);
    });
    $('.dialog .dialog-show .files ul.cz .linggan').click(function() {
        // 灵感
        var a = JSON.parse(localStorage.getItem('texts'));
        var val = value[language].lingan+' At ' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
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
            alert(value[language].nameempty);
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
        var a = confirm(value[language].delalert);
        if (a) {
            var b = JSON.parse(localStorage.getItem('texts'));
            delete b[$(this).parents('li.text').find('p').html()];
            console.log($(this).parents('li.text'));
            localStorage.setItem('texts', JSON.stringify(b));
            queryTexts();
        }
    });
    $('.dialog .dialog-show .files ul.texts li span.rename').click(function() {
        var names = prompt(value[language].renameprompt);
        if (names == '') {
            alert(value[language].empty);
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
        console.log(obj);
        var data = '';
        if(obj['h1']){
            data += obj['h1'];
        };
        if(obj['h2']){
            data += '\n' + obj['h2'];
        }
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
                            } else if(i3=='h'){
                                if(obj[i][i2][i3]){
                                    data += '\n' + obj[i][i2][i3];
                                }
                            }else if(i3=='img'){
                                data+='\n'+`[img:${obj[i][i2][i3]}]`
                            }else if(i3=='pre'){
                                data+='\n'+obj[i][i2][i3][0];
                            }else if(i3=='xxjie'){
                                for(var is=0;is<obj[i][i2][i3].length;is++){
                                    data+='\n';
                                for(var i4 in obj[i][i2][i3][is]){
                                    if (i4 == 'p') {
                                        var da = '';
                                        for (var i5 = 0; i5 < obj[i][i2][i3][is][i4].length; i5++) {
                                            if (i5 + 1 < obj[i][i2][i3][is][i4].length) {
                                                da += obj[i][i2][i3][is][i4][i5] + '\n';
        
                                            } else {
                                                da += obj[i][i2][i3][is][i4][i5];
                                            }
                                        }
                                        data += '\n\n' + da;
                                    } else if(i4=='h'){
                                            data += '\n' + obj[i][i2][i3][is][i4];
                                    }else if(i4=='img'){
                                        data+='\n'+`[img:${obj[i][i2][i3][is][i4]}]`
                                    }else if(i4=='pre'){
                                        data+='\n'+obj[i][i2][i3][is][i4][0];
                                    }else if(i4=='blockquote'){
                                        data += '\n' + obj[i][i2][i3][is][i4];
                                    }
                                }
                                                                    
                            }
                            }else if(i3=='blockquote'){
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
        data += '# ' + queryHTMLtoText(obj['h1']);;
        data += '\n#### ' + queryHTMLtoText(obj['h2']);;
        for (var i in obj) {
            if (i == 'h1' || i == 'h2') {} else {
                data+='\n___';
                for (var i2 = 0; i2 < obj[i].length; i2++) {
                    for (var i3 in obj[i][i2]) {
                        if (obj[i][i2][i3] != false) {
                            if (i3 == 'h') {
                                data += '\n\n## ' + queryHTMLtoText(obj[i][i2][i3]);
                            } else if (i3 == 'p') {
                                var da = '';
                                for (var i4 = 0; i4 < obj[i][i2][i3].length; i4++) {
                                    if (i4 + 1 < obj[i][i2][i3].length) {
                                        da += queryHTMLtoText(obj[i][i2][i3][i4]) + '\n';

                                    } else {
                                        da += queryHTMLtoText(obj[i][i2][i3][i4]);
                                    }
                                }
                                data += '\n\n' + da;
                            } else if (i3 == 'blockquote') {
                                data += '\n\n> ' + queryHTMLtoText(obj[i][i2][i3]);
                            } else if (i3 == 'pre') {
                                data += '\n\n\'\'\''+obj[i][i2][i3][1]+'\n'+queryHTMLtoText(obj[i][i2][i3][0])+'\n\'\'\'';
                            } else if (i3 == 'img') {
                                data += '\n\n!['+value[language].mdimgtext+'](' + obj[i][i2][i3]+')';
                            } else if (i3 == 'xxjie') {
                                data+='\n___';
                                for(var i4=0;i4<obj[i][i2][i3].length;i4++){
                                    for(var i5 in obj[i][i2][i3][i4]){
                                        if (i5 == 'h') {
                                            data += '\n\n### ' + queryHTMLtoText(obj[i][i2][i3][i4][i5]);
                                        } else if (i5 == 'p') {
                                            var da = '';
                                            for (var i6 = 0; i6 < obj[i][i2][i3][i4][i5].length; i6++) {
                                                if (i4 + 1 < obj[i][i2][i3][i4][i5].length) {
                                                    da += queryHTMLtoText(obj[i][i2][i3][i4][i5][i6]) + '\n';
            
                                                } else {
                                                    da += queryHTMLtoText(obj[i][i2][i3][i4][i5][i6]);
                                                }
                                            }
                                            data += '\n\n' + da;
                                        } else if (i5 == 'blockquote') {
                                            data += '\n\n> ' + queryHTMLtoText(obj[i][i2][i3][i4][i5]);
                                        } else if (i5 == 'pre') {
                                            data += '\n\n\'\'\''+obj[i][i2][i3][i4][i5][1]+'\n'+queryHTMLtoText(obj[i][i2][i3][i4][i5][0])+'\n\'\'\'';
                                        } else if (i5 == 'img') {
                                            data += '\n\n!['+value[language].mdimgtext+'](' + obj[i][i2][i3][i4][i5]+')';
                                        }
                                    }
                                }
                                data+='\n___';
                            }
                        }
                    }
                }
                data+='\n___';
            }
        }
        downloadFile(nowstart + '.md', data);
    });
    $('.dialog .dialog-show .lin_save ul li.doc').click(function() {
        var obj = queryNowTextToLinSave();
        var data = '';
        data += '<h1>' + queryHTMLtoText(obj['h1']) + '</h1>';
        data += '<q>' + queryHTMLtoText(obj['h2']) + '</q>';
        for (var i in obj) {
            if (i == 'h1' || i == 'h2') {} else {
                data+='<div class="xjie">'
                for (var i2 = 0; i2 < obj[i].length; i2++) {
                    for (var i3 in obj[i][i2]) {
                        if (obj[i][i2][i3] != false) {
                            if (i3 == 'h') {
                                data += '<h2>' + queryHTMLtoText(obj[i][i2][i3]) + '</h2>';
                            } else if (i3 == 'p') {
                                var da = '';
                                for (var i4 = 0; i4 < obj[i][i2][i3].length; i4++) {
                                    if (i4 + 1 < obj[i][i2][i3].length) {
                                        da += queryHTMLtoText(obj[i][i2][i3][i4]) + '<br>';

                                    } else {
                                        da += queryHTMLtoText(obj[i][i2][i3][i4]);
                                    }
                                }
                                data += '<p>' + da + '</p>'
                            } else if (i3 == 'blockquote') {
                                data += '<blockquote>' + queryHTMLtoText(obj[i][i2][i3]) + '</blockquote>';
                            } else if (i3 == 'img') {
                                data += '<img src="' + obj[i][i2][i3] + '"/>';
                            } else if (i3 == 'pre') {
                                data += '<pre><code class="language-'+obj[i][i2][i3][1]+'">' + queryHTMLtoText(obj[i][i2][i3][0]) + '</code></pre>';
                            }else if (i3 == 'xxjie') {
                                data+='<div class="xxjie">';
                                for(var i4=0;i4<obj[i][i2][i3].length;i4++){
                                    for (var i5 in obj[i][i2][i3][i4]) {
                                        if (i5 == 'h') {
                                            data += '<h3>' + queryHTMLtoText(obj[i][i2][i3][i4][i5]) + '</h3>';
                                        } else if (i5 == 'p') {
                                            var da = '';
                                            for (var i6 = 0; i6 < obj[i][i2][i3][i4][i5].length; i6++) {
                                                if (i4 + 1 < obj[i][i2][i3][i4][i5].length) {
                                                    da += queryHTMLtoText(obj[i][i2][i3][i4][i5][i6]) + '<br>';
            
                                                } else {
                                                    da += queryHTMLtoText(obj[i][i2][i3][i4][i5][i6]);
                                                }
                                            }
                                            data += '<p>' + da + '</p>'
                                        } else if (i5 == 'blockquote') {
                                            data += '<blockquote>' + queryHTMLtoText(obj[i][i2][i3][i4][i5]) + '</blockquote>';
                                        } else if (i5 == 'img') {
                                            data += '<img src="' + obj[i][i2][i3][i4][i5] + '"/>';
                                        } else if (i5 == 'pre') {
                                            data += '<pre><code class="language-'+obj[i][i2][i3][i4][i5][1]+'">' + queryHTMLtoText(obj[i][i2][i3][i4][i5][0]) + '</code></pre>';
                                        }
                                    }
                                }
                                data+='</div>';
                            }
                        }
                    }
                }
                data+='</div>'
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
        data += '<h1>' + queryHTMLtoText(obj['h1']) + '</h1>';
        data += '<q>' + queryHTMLtoText(obj['h2']) + '</q>';
        console.log(data);
        for (var i in obj) {
            if (i == 'h1' || i == 'h2') {} else {
                data+='<div class="xjie">'
                for (var i2 = 0; i2 < obj[i].length; i2++) {
                    for (var i3 in obj[i][i2]) {
                        if (obj[i][i2][i3] != false) {
                            if (i3 == 'h') {
                                data += '<h2>' + queryHTMLtoText(obj[i][i2][i3]) + '</h2>';
                            } else if (i3 == 'p') {
                                var da = '';
                                for (var i4 = 0; i4 < obj[i][i2][i3].length; i4++) {
                                    if (i4 + 1 < obj[i][i2][i3].length) {
                                        da += queryHTMLtoText(obj[i][i2][i3][i4]) + '<br>';

                                    } else {
                                        da += queryHTMLtoText(obj[i][i2][i3][i4]);
                                    }
                                }
                                data += '<p>' + da + '</p>'
                            } else if (i3 == 'blockquote') {
                                data += '<blockquote>' + queryHTMLtoText(obj[i][i2][i3]) + '</blockquote>';
                            } else if (i3 == 'img') {
                                data += '<img src="' + obj[i][i2][i3] + '"/>';
                            } else if (i3 == 'pre') {
                                data += '<pre><code class="language-'+obj[i][i2][i3][1]+'">' + queryHTMLtoText(obj[i][i2][i3][0]) + '</code></pre>';
                            }else if (i3 == 'xxjie') {
                                data+='<div class="xxjie">';
                                for(var i4=0;i4<obj[i][i2][i3].length;i4++){
                                    for (var i5 in obj[i][i2][i3][i4]) {
                                        if (i5 == 'h') {
                                            data += '<h3>' + queryHTMLtoText(obj[i][i2][i3][i4][i5]) + '</h3>';
                                        } else if (i5 == 'p') {
                                            var da = '';
                                            for (var i6 = 0; i6 < obj[i][i2][i3][i4][i5].length; i6++) {
                                                if (i4 + 1 < obj[i][i2][i3][i4][i5].length) {
                                                    da += queryHTMLtoText(obj[i][i2][i3][i4][i5][i6]) + '<br>';
            
                                                } else {
                                                    da += queryHTMLtoText(obj[i][i2][i3][i4][i5][i6]);
                                                }
                                            }
                                            data += '<p>' + da + '</p>'
                                        } else if (i5 == 'blockquote') {
                                            data += '<blockquote>' + queryHTMLtoText(obj[i][i2][i3][i4][i5]) + '</blockquote>';
                                        } else if (i5 == 'img') {
                                            data += '<img src="' + obj[i][i2][i3][i4][i5] + '"/>';
                                        } else if (i5 == 'pre') {
                                            data += '<pre><code class="language-'+obj[i][i2][i3][i4][i5][1]+'">' + queryHTMLtoText(obj[i][i2][i3][i4][i5][0]) + '</code></pre>';
                                        }
                                    }
                                }
                                data+='</div>';
                            }
                        }
                    }
                }
                data+='</div>'
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
        data += '<h1>' + queryHTMLtoText(obj['h1']) + '</h1>';
        data += '<q>' + queryHTMLtoText(obj['h2']) + '</q>';
        for (var i in obj) {
            if (i == 'h1' || i == 'h2') {} else {
                data+='<div class="xjie">'
                for (var i2 = 0; i2 < obj[i].length; i2++) {
                    for (var i3 in obj[i][i2]) {
                        if (obj[i][i2][i3] != false) {
                            if (i3 == 'h') {
                                data += '<h2>' + queryHTMLtoText(obj[i][i2][i3]) + '</h2>';
                            } else if (i3 == 'p') {
                                var da = '';
                                for (var i4 = 0; i4 < obj[i][i2][i3].length; i4++) {
                                    if (i4 + 1 < obj[i][i2][i3].length) {
                                        da += queryHTMLtoText(obj[i][i2][i3][i4]) + '<br>';

                                    } else {
                                        da += queryHTMLtoText(obj[i][i2][i3][i4]);
                                    }
                                }
                                data += '<p>' + da + '</p>'
                            } else if (i3 == 'blockquote') {
                                data += '<blockquote>' + queryHTMLtoText(obj[i][i2][i3]) + '</blockquote>';
                            } else if (i3 == 'img') {
                                data += '<img src="' + obj[i][i2][i3] + '"/>';
                            } else if (i3 == 'pre') {
                                data += '<pre><code class="language-'+obj[i][i2][i3][1]+'">' + queryHTMLtoText(obj[i][i2][i3][0]) + '</code></pre>';
                            }else if (i3 == 'xxjie') {
                                data+='<div class="xxjie">';
                                for(var i4=0;i4<obj[i][i2][i3].length;i4++){
                                    for (var i5 in obj[i][i2][i3][i4]) {
                                        if (i5 == 'h') {
                                            data += '<h3>' + queryHTMLtoText(obj[i][i2][i3][i4][i5]) + '</h3>';
                                        } else if (i5 == 'p') {
                                            var da = '';
                                            for (var i6 = 0; i6 < obj[i][i2][i3][i4][i5].length; i6++) {
                                                if (i4 + 1 < obj[i][i2][i3][i4][i5].length) {
                                                    da += queryHTMLtoText(obj[i][i2][i3][i4][i5][i6]) + '<br>';
            
                                                } else {
                                                    da += queryHTMLtoText(obj[i][i2][i3][i4][i5][i6]);
                                                }
                                            }
                                            data += '<p>' + da + '</p>'
                                        } else if (i5 == 'blockquote') {
                                            data += '<blockquote>' + queryHTMLtoText(obj[i][i2][i3][i4][i5]) + '</blockquote>';
                                        } else if (i5 == 'img') {
                                            data += '<img src="' + obj[i][i2][i3][i4][i5] + '"/>';
                                        } else if (i5 == 'pre') {
                                            data += '<pre><code class="language-'+obj[i][i2][i3][i4][i5][1]+'">' + queryHTMLtoText(obj[i][i2][i3][i4][i5][0]) + '</code></pre>';
                                        }
                                    }
                                }
                                data+='</div>';
                            }
                        }
                    }
                }
                data+='</div>'
            }
        }
        data = `<!DOCTYPE html>
        <html lang="zh-cn">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-coy.min.css" integrity="sha512-LOT5F67SMZVdXMrvQe4S1ZHu5l6xk3CST2qqno9kY329OsJBBpybnq+fM9qG4ZSaNzPOjoGzHAeBamSSJyyuZg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
        h2,h3 {
            color: var(--maincolor, #00baff);
            text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
            font-weight: bold;
        }
        
        h1 {
            font-weight: bold;
            font-size: 25px;
        }
        
        q {
            font-weight: 600;
        }
        
        p {
            font-weight: 500;
            margin-left: 20px;
        }
        
        h2,h3 {
            font-size: 20px;
            margin-left: 30px;
        }
        .xxjie{
            margin-left:30px;
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
        img{
            max-width: 100%;
        }
        pre[class*=language-]>span{
            display: block;
        }
        pre[class*=language-]{
            width: calc(100% - 20px);
            max-height: 500px;
            overflow: scroll;
        }
        </style>
        </head>
        <body>
            ${data}
        </body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/prism.min.js" integrity="sha512-RDQSW3KoqJMiX0L/UBgwBmH1EmRYp8LBOiLaA8rBHIy+7OGP/7Gxg8vbt8wG4ZYd29P0Fnoq6+LOytCqx3cyoQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        </html>`
        downloadFile(nowstart + '.html', data);
    });
    $('#dljson').change(function() {
        $('.dialog-show .page.daoruhelper .label').html(value[language].importing);
        var resultFile = document.getElementById("dljson").files[0];
        if (resultFile) {
            var reader = new FileReader();

            reader.readAsText(resultFile, 'UTF-8');
            reader.onload = function(e) {
                var urlData = this.result;
                daorustr = urlData;
                $('.dialog-show .page.daoruhelper .label').html(value[language].importok);
            };
        }
    })
    $('.dialog-show .page.daoruhelper button.ok').click(function() {
        if (daorustr) {
            localStorage = JSON.parse(daorustr);
            alert(value[language].importwin);
            closeDialog();
        } else {
            alert(value[language].importerr);
        }

    });
    $('.dialog-show .page.daoruhelper button.no').click(function() {
        daorustr = undefined;
        $('.dialog-show .page.daoruhelper .label').html(value[language].drtext);
        closeDialog();
    });
    $('.dialog-show .page.addimg .btn').click(function() {
        var a = $('.dialog-show .page.addimg input').val();
        $('.dialog-show .page.addimg img').attr('src', a);
    });
    $('.dialog-show .page.reimg .btn').click(function() {
        var a = $('.dialog-show .page.reimg input').val();
        $('.dialog-show .page.reimg img').attr('src', a);
    });
    $('.dialog-show .page.addimg .no').click(function() {
        closeDialog();
        addzt = null;
    })
    $('.dialog-show .page.addcode .no').click(function() {
        closeDialog();
        addzt = null;
    })
    $('.dialog-show .page.reimg .no').click(function() {
        closeDialog();
    })
    $('.dialog-show .page.recode .no').click(function() {
        closeDialog();
    });
    $('.dialog-show .page.reimg .ok').click(function() {
        nowfocus.attr('src',$('.dialog-show .page.reimg input').val());
        setEvents();
        closeDialog();
    })
    $('.dialog-show .page.recode .ok').click(function() {
        nowfocus.children('code').get()[0].className='language-'+$('.dialog-show .page.recode select').val();
        nowfocus.children('code').text($('.dialog-show .page.recode textarea').val());
        setEvents();
        
        closeDialog();
    });
    $('.dialog-show .page.reimg .del').click(function() {
        nowfocus.get()[0].remove();
        closeDialog();
    })
    $('.dialog-show .page.recode .del').click(function() {
        nowfocus.get()[0].remove();
        closeDialog();
    });
    $('.dialog-show .page.addimg .ok').click(function() {
        if (addzt == 0) {
            var newp = document.createElement('div');
            newp.className = 'p';
            var jsnow = nowfocus.get()[0];
            if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2') {
                $('.editor .xjmr').get()[0].insertBefore(newp, $('.editor .xjmr>*').eq(0).get()[0]);
                var newimg = document.createElement('img');
                newimg.src = $('.dialog-show .page.addimg input').val();
                $('.editor .xjmr').get()[0].insertBefore(newimg, $('.editor .xjmr>*').eq(0).get()[0]);
                setEvents();
            } else {
                jsnow.parentNode.insertBefore(newp, jsnow.nextSibling);

                var newimg = document.createElement('img');
                newimg.src = $('.dialog-show .page.addimg input').val();
                jsnow.parentNode.insertBefore(newimg, jsnow.nextSibling);
                setEvents();
            }
        } else if (addzt == 1) {
            var newp = document.createElement('div');
            newp.className = 'p';
            var jsnow = nowfocus.get()[0];
            if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2') {} else {
                if (jsnow.parentNode.className == 'xxjie') {
                    jsnow.parentNode.parentNode.insertBefore(newp, jsnow.parentNode.nextSibling);

                    var newimg = document.createElement('img');
                    newimg.src = $('.dialog-show .page.addimg input').val();
                    jsnow.parentNode.parentNode.insertBefore(newimg, jsnow.parentNode.nextSibling);
                }
                setEvents();
            }
        }

        closeDialog();
        addzt = null;
    })
    $('.dialog-show .page.addcode .ok').click(function() {
        var codem = $('.dialog-show .page.addcode select').val();
        var codes = $('.dialog-show .page.addcode textarea').val();
        if (addzt == 0) {
            var newp = document.createElement('div');
            newp.className = 'p';
            var jsnow = nowfocus.get()[0];
            if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2') {
                $('.editor .xjmr').get()[0].insertBefore(newp, $('.editor .xjmr>*').eq(0).get()[0]);
                var newimg = document.createElement('pre');
                newimg.innerHTML = '<code class="language-' + codem + '"></code>';
                $('.editor .xjmr').get()[0].insertBefore(newimg, $('.editor .xjmr>*').eq(0).get()[0]);
                $(newimg).children('code').text(codes);
                setEvents();
            } else {
                jsnow.parentNode.insertBefore(newp, jsnow.nextSibling);
                var newimg = document.createElement('pre');
                newimg.innerHTML = '<code class="language-' + codem + '"></code>';
                jsnow.parentNode.insertBefore(newimg, jsnow.nextSibling);
                $(newimg).children('code').text(codes);
                setEvents();
            }
        } else if (addzt == 1) {
            var newp = document.createElement('div');
            newp.className = 'p';
            var jsnow = nowfocus.get()[0];
            if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2') {} else {
                if (jsnow.parentNode.className == 'xxjie') {
                    jsnow.parentNode.parentNode.insertBefore(newp, jsnow.parentNode.nextSibling);
                    var newimg = document.createElement('pre');
                newimg.innerHTML = '<code class="language-' + codem + '"></code>';
                jsnow.parentNode.insertBefore(newimg, jsnow.nextSibling);
                $(newimg).children('code').text(codes);
                }
                setEvents();
            }
        }
        closeDialog();
        addzt = null;

    });
    $('.dialog-show .page.maincolor ul.color li').click(function(){
        $('.dialog-show .page.maincolor ul.color li').removeClass('select');
        $(this).addClass('select');
    });
    $('#maincolorxz').get()[0].oninput=function(){
        $('.dialog-show .page.maincolor ul.color li.zdy').attr('data-val',$(this).val());
        $('.dialog-show .page.maincolor ul.color li.zdy').css('background-color',$(this).val());
    };
    $('.dialog-show .page.maincolor button.no').click(function(){
        closeDialog();
    });
    $('.dialog-show .page.maincolor button.ok').click(function(){
        var a=JSON.parse(localStorage.getItem('settings'));
        a.maincolor=$('.dialog-show .page.maincolor ul.color li.select').attr('data-val');
        localStorage.setItem('settings',JSON.stringify(a));
        querySettings();
        closeDialog();
    });
    $('.dialog-show .page.lang ul li').click(function(){
        localStorage.lang=$(this).attr('data-val');
        window.location.reload();
    })
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

function queryHTMLtoText(str){
    var cl2=str;
    cl2=cl2.replaceAll('<','&lt;');
    cl2=cl2.replaceAll('>','&gt;');
    return cl2;
}
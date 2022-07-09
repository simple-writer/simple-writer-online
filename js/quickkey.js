// 快捷键
$(document).keydown(function(e) {
    // console.log(e.key, e.keyCode);
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
        newxj.className = 'xxjie';
        newxj.innerHTML = '<div class="h4"></div><div class="p"></div>';
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2') {} else {
            if (jsnow.parentNode.className == 'xjie mr') {} else {
                if (jsnow.parentNode.className == 'xjie') {
                    jsnow.parentNode.insertBefore(newxj, jsnow.nextSibling);
                } else {
                    jsnow.parentNode.parentNode.insertBefore(newxj, jsnow.parentNode.nextSibling);
                }
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
        var newp = document.createElement('div');
        newp.className = 'p';
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2') {} else {
            if (jsnow.parentNode.className == 'xxjie') {
                jsnow.parentNode.parentNode.insertBefore(newp, jsnow.parentNode.nextSibling);
                var newxj = document.createElement('div');
                newxj.className = 'blockquote';
                jsnow.parentNode.parentNode.insertBefore(newxj, jsnow.parentNode.nextSibling);
            }
            setEvents();
        }
    } else if (e.ctrlKey && !e.altKey && e.key == 'i') {
        e.preventDefault();
        startDialog('addimg', false);
        addzt = 0;
    } else if (e.ctrlKey && e.altKey && e.key == 'i') {
        e.preventDefault();
        startDialog('addimg', false);
        addzt = 1;
    } else if (e.ctrlKey && !e.altKey && e.key == 'd') {
        e.preventDefault();
        startDialog('addcode', false);
        addzt = 0;
    } else if (e.ctrlKey && e.altKey && e.key == 'd') {
        e.preventDefault();
        startDialog('addcode', false);
        addzt = 1;
    } else if (e.ctrlKey && !e.altKey && e.key == 'p') {
        e.preventDefault();

        var newp = document.createElement('div');
        newp.className = 'p';
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2') {

            $('.editor .xjmr').get()[0].insertBefore(newp, $('.editor .xjmr>*').eq(0).get()[0]);
            setEvents();
        } else {
            var newp = document.createElement('div');
            newp.className = 'p';
            jsnow.parentNode.insertBefore(newp, jsnow.nextSibling);
            setEvents();
        }
    } else if (e.ctrlKey && e.altKey && e.key == 'p') {
        e.preventDefault();
        var newp = document.createElement('div');
        newp.className = 'p';
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2') {} else {
            if (jsnow.parentNode.className == 'xxjie') {
                jsnow.parentNode.parentNode.insertBefore(newp, jsnow.parentNode.nextSibling);
            }
            setEvents();
        }
    } else if (!e.ctrlKey && !e.shiftKey && e.key == 'Delete') {
        e.preventDefault();
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2' || jsnow.className == 'h3' || jsnow.className == 'h4') {} else {
            if (jsnow.innerText.length > 10) {
                var p = confirm('你确定要删除它吗？');
                if (p) {
                    jsnow.remove();
                    setEvents();
                }
            } else {
                jsnow.remove();
                setEvents();
            }

        }


    } else if (e.ctrlKey && !e.shiftKey && e.key == 'Delete') {
        e.preventDefault();
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2' || jsnow.parentNode.className ==
            'xjie mr' || jsnow.parentNode.className ==
            'xjie') {} else {
            if (jsnow.parentNode.innerText.length > 15) {
                var p = confirm('你确定要删除它吗？');
                if (p) {
                    jsnow.parentNode.remove();
                    setEvents();
                }
            } else {
                jsnow.parentNode.remove();
                setEvents();
            }
        }
    } else if (e.ctrlKey && e.shiftKey && e.key == 'Delete') {
        e.preventDefault();
        var jsnow = nowfocus.get()[0];
        if (jsnow.className == 'h1') {} else if (jsnow.className == 'h2' || jsnow.parentNode.className ==
            'xjie mr') {} else if (jsnow.parentNode.className ==
            'xxjie') {
            if (jsnow.parentNode.parentNode.innerText.length > 20) {
                var p = confirm('你确定要删除它吗？');
                if (p) {
                    jsnow.parentNode.parentNode.remove();
                    setEvents();
                }
            } else {
                jsnow.parentNode.parentNode.remove();
                setEvents();
            }
        } else {
            if (jsnow.parentNode.innerText.length > 20) {
                var p = confirm('你确定要删除它吗？');
                if (p) {
                    jsnow.parentNode.remove();
                    setEvents();
                }
            } else {
                jsnow.parentNode.remove();
                setEvents();
            }
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
    } else if (e.ctrlKey && !e.shiftKey && e.altKey && e.key == 'b') {
        e.preventDefault();
        var obj = queryNowTextToLinSave();
        var data = '';
        // data += '<h1>' + queryHTMLtoText(obj['h1']) + '</h1>';
        // data += '<q>' + queryHTMLtoText(obj['h2']) + '</q>';
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
                            }
                        }
                    }
                }
                data+='</div>'
            }
        }
        console.log(`{
            title: "${queryHTMLtoText(obj['h1'])}",
            text: "${data}",
            date: [${new Date().getFullYear()}, ${new Date().getMonth() + 1}, ${new Date().getDate()}],
            tag: [''],
            jj: "${$('.editor').text().substring(0, 100)} ..."
        }`);
    }
});
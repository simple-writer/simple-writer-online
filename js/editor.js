// 设置Editor内的事件
function setEvents() {
    $('.editor .h1').focus(function () {
        nowfocus = $(this);
    });
    $('.editor .h2').focus(function () {
        nowfocus = $(this);
    });
    $('.editor .h3').focus(function () {
        nowfocus = $(this);
    });
    $('.editor .h4').focus(function () {
        nowfocus = $(this);
    });
    $('.editor .p').focus(function () {
        nowfocus = $(this);
    });
    $('.editor .blockquote').focus(function () {
        nowfocus = $(this);
    });
    $('.editor img').click(function(){
        nowfocus = $(this);
    })
    $('.editor pre').click(function(){
        nowfocus = $(this);
    })
    
    $('.editor .h1').attr('contenteditable', 'true');
    $('.editor .h2').attr('contenteditable', 'true');
    $('.editor .h3').attr('contenteditable', 'true');
    $('.editor .h4').attr('contenteditable', 'true');
    $('.editor .p').attr('contenteditable', 'true');
    $('.editor .blockquote').attr('contenteditable', 'true');
    $('.editor img').get().forEach(element => {
        element.ondblclick = function () {
            nowfocus = $(this);
            startDialog('reimg', false);
            $('.dialog-show .page.reimg input').val(nowfocus.attr('src'));
            $('.dialog-show .page.reimg img').attr('src', nowfocus.attr('src'))
        }
    });

    $('.editor pre').get().forEach(element => {
        element.ondblclick = function () {
            nowfocus = $(this);
            startDialog('recode', false);
            $('.dialog-show .page.recode select').val(nowfocus.children('code').attr('class').substring(9, nowfocus.children('code').attr('class').length).toUpperCase());
            console.log(nowfocus.children('code').attr('class').substring(9, nowfocus.children('code').attr('class').length).toUpperCase());
            $('.dialog-show .page.recode textarea').val(nowfocus.text());
        }
    });
    a();
    $('.editor .h1').add('.editor .h2').add('.editor .h3').add('.editor .h4').add('.editor .p').add('.editor .blockquote').on('paste', function (event) {
        textPaste(event);
        console.log(event);
    });
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
        if (a_xjmr_c[i].className == 'p') {
            var sas = a_xjmr_c[i].childNodes;
            a_xjmr[a_xjmr.length - 1]['p'] = [];

            for (var i2 = 0; i2 < sas.length; i2++) {
                a_xjmr[a_xjmr.length - 1]['p'][a_xjmr[a_xjmr.length - 1]['p'].length] = sas[i2].textContent;
            }
        } else if (a_xjmr_c[i].nodeName == 'PRE') {
            a_xjmr[a_xjmr.length - 1]['pre'] = [a_xjmr_c[i].innerText, $(a_xjmr_c[i]).children('code').get()[0].className.substring(9, $(a_xjmr_c[i]).children('code').get()[0].className.length)];
        } else if (a_xjmr_c[i].nodeName == 'IMG') {
            a_xjmr[a_xjmr.length - 1]['img'] = a_xjmr_c[i].src;
        } else {
            a_xjmr[a_xjmr.length - 1][a_xjmr_c[i].className] = a_xjmr_c[i].innerText;
        }
    }
    a['xjmr'] = a_xjmr;
    for (var i = 1; i < document.querySelectorAll('.editor .xjie').length; i++) {
        var a_xj = [];
        a_xj[0] = { 'h': document.querySelectorAll('.editor .xjie')[i].querySelector('.h3').innerText };
        for (var i2 = 1; i2 < $('.editor .xjie').eq(i).find('>*').length; i2++) {
            a_xj[a_xj.length] = {};
            if ($('.editor .xjie').eq(i).find('>*').eq(i2).get()[0].className == 'p') {

                var sa = $('.editor .xjie').eq(i).find('>*').eq(i2).get()[0];
                var sas = sa.childNodes;
                console.log(sas);
                a_xj[a_xj.length - 1]['p'] = [sas[0].textContent];
                if (sas[1]&&!sas[3]) {
                    for (var i3 = 0; i3 < sas[1].childNodes.length; i3++) {

                        a_xj[a_xj.length - 1]['p'][a_xj[a_xj.length - 1]['p'].length] = sas[1].childNodes[i3].textContent;
                    }
                }else if(sas[1]&&sas[3]){
                    for (var i3 = 1; i3 < sas.length; i3++) {

                        a_xj[a_xj.length - 1]['p'][a_xj[a_xj.length - 1]['p'].length] = sas[i3].textContent;
                    }
                }

            } else if ($('.editor .xjie').eq(i).find('>*').eq(i2).get()[0].nodeName == 'PRE') {

                a_xj[a_xj.length - 1]['pre'] = [$('.editor .xjie').eq(i).find('>*').eq(i2).get()[0].innerText, $('.editor .xjie').eq(i).find('>*').eq(i2).children('code').get()[0].className.substring(9, $('.editor .xjie').eq(i).find('>*').eq(i2).children('code').get()[0].className.length)];
            } else if ($('.editor .xjie').eq(i).find('>*').eq(i2).get()[0].nodeName == 'IMG') {

                a_xj[a_xj.length - 1]['img'] = $('.editor .xjie').eq(i).find('>*').eq(i2).get()[0].src;
            } else if ($('.editor .xjie').eq(i).find('>*').eq(i2).get()[0].className == 'xxjie') {
                var lsx = $('.editor .xjie').eq(i).find('>*').eq(i2).find('>*');
                a_xj[a_xj.length - 1]['xxjie'] = [];
                console.log(a_xj[a_xj.length - 1]);
                a_xj[a_xj.length - 1]['xxjie'][0] = { 'h': lsx.get()[0].innerText };
                console.log(a_xj[a_xj.length - 1]['xxjie']);
                for (var i3 = 1; i3 < lsx.length; i3++) {
                    a_xj[a_xj.length - 1]['xxjie'][i3] = {};
                    if (lsx.eq(i3).get()[0].className == 'p') {

                        var sa = lsx.eq(i3).get()[0];
                        var sas = sa.childNodes;
                        a_xj[a_xj.length - 1]['xxjie'][i3]['p'] = [sas[0].textContent];

                        if (sas[1]&&!sas[3]) {
                            for (var i4 = 0; i4 < sas[1].childNodes.length; i4++) {

                                a_xj[a_xj.length - 1]['xxjie'][i3]['p'][a_xj[a_xj.length - 1]['xxjie'][i3]['p'].length] = sas[1].childNodes[i4].textContent;
                            }
                        }else if(sas[1]&&sas[3]){
                            for (var i4 = 1; i4 < sas.childNodes.length; i4++) {

                                a_xj[a_xj.length - 1]['xxjie'][i3]['p'][a_xj[a_xj.length - 1]['xxjie'][i3]['p'].length] = sas.childNodes[i4].textContent;
                            }
                        }
                    } else if (lsx.eq(i3).get()[0].nodeName == 'PRE') {

                        a_xj[a_xj.length - 1]['xxjie'][i3]['pre'] = [lsx.eq(i3).get()[0].innerText, lsx.eq(i3).children('code').get()[0].className.substring(9, lsx.eq(i3).children('code').get()[0].className.length)];
                    } else if (lsx.eq(i3).get()[0].nodeName == 'IMG') {

                        a_xj[a_xj.length - 1]['xxjie'][i3]['img'] = lsx.eq(i3).get()[0].src;
                    } else {
                        a_xj[a_xj.length - 1]['xxjie'][i3][lsx.eq(i3).get()[0].className] = lsx.eq(i3).get()[0].innerText;
                    }
                }
            } else {
                a_xj[a_xj.length - 1][$('.editor .xjie').eq(i).find('>*').eq(i2).get()[0].className] = $('.editor .xjie').eq(i).find('>*').eq(i2).get()[0].innerText;
            }
        }
        a['xj' + i] = a_xj;
    }
    // console.log(a);
    return a;
}


function textPaste(event) {
    event.preventDefault();
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
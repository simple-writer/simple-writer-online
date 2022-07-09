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
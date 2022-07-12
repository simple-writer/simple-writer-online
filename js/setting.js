//实现设置
function querySettings() {
    var a = JSON.parse(localStorage.getItem('settings'));
    //Theme
    if (a.theme == 'Light') {
        $('.left_bar .setting .theme div.show').html('亮');
        $('#style').html(`*{
            --bgcolor: #f4f4f4;
            --titlebgcolor: #eeeee;
            --textcolor: #212121;
            --fa-primary-color: #212121;
            --leftbar-show-hover-bgcolor: #fff;
            --leftbar-go-hover-bgcolor: #e6e6e6;
            --editor-focus-bgcolor: rgb(235,235,235);
            --box-shadow-color2: rgba(0,0,0,0.2);
        }`);
        $('.eyes').removeClass('on');

    } else if (a.theme == 'Dark') {
        $('.left_bar .setting .theme div.show').html('暗');
        $('#style').html(`*{
            --bgcolor: #0b0b0b;
            --titlebgcolor: #111111;
            --textcolor: #f1f1fe;
            --fa-primary-color: #f1f1fe;
            --leftbar-show-hover-bgcolor: #212121;
            --leftbar-go-hover-bgcolor: #191919;
            --editor-focus-bgcolor: rgb(20,20,20);
            --box-shadow-color2: rgba(255,255,255,0.4);
        }`);
        $('.eyes').removeClass('on');

    }else if (a.theme == 'Eyes') {
        $('.left_bar .setting .theme div.show').html('护眼');
        $('#style').html(`*{
            --bgcolor: #f4f4f4;
            --titlebgcolor: #eeeee;
            --textcolor: #000;
            --fa-primary-color: #000;
            --leftbar-show-hover-bgcolor: #fff;
            --leftbar-go-hover-bgcolor: #e6e6e6;
            --editor-focus-bgcolor: rgb(235,235,235);
            --box-shadow-color2: rgba(0,0,0,0.2);
        }`);
        $('.eyes').addClass('on');
    };
    //MainColor
    if (a.maincolor == "#00baff") {
        $('.left_bar .setting .maincolor div.show').html('蓝色');
        $('#style2').html(`*{--maincolor: #00baff;
        --fa-secondary-color:#00baff;}`);
    } else if (a.maincolor == "#ea6725") {
        $('.left_bar .setting .maincolor div.show').html('橙色');
        $('#style2').html(`*{--maincolor:#ea6725;
        --fa-secondary-color:#ea6725;`);
    } else if (a.maincolor == "#31ea23") {
        $('.left_bar .setting .maincolor div.show').html('绿色');
        $('#style2').html(`*{--maincolor:#31ea23;
        --fa-secondary-color:#31ea23;`);
    } else if (a.maincolor == "#e7ea22") {
        $('.left_bar .setting .maincolor div.show').html('黄色');
        $('#style2').html(`*{--maincolor:#e7ea22;
        --fa-secondary-color:#e7ea22;`);
    } else if (a.maincolor == "#ea2ae7") {
        $('.left_bar .setting .maincolor div.show').html('粉色');
        $('#style2').html(`*{--maincolor:#ea2ae7;
        --fa-secondary-color:#ea2ae7;`);
    } else {
        $('.left_bar .setting .maincolor div.show').html(a.maincolor);
        $('#style2').html(`*{--maincolor:${a.maincolor};
        --fa-secondary-color: ${a.maincolor}`);
    };
    //FontFamily
    if (a.fontfamily == 'sans-serif') {
        $('.left_bar .setting .fontfamily div.show').html('sans-serif');
        $('#style3').html(`*{--font-family:sans-serif;}`);
    } else {
        $('.left_bar .setting .fontfamily div.show').html(a.fontfamily);
        $('#style3').html(`*{--font-family:${a.fontfamily};}`);
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
        $('.cover').css('top', '40px');
    }
    // Is Show Time
    if(a.istime){
        $('.left_bar .setting .istime div.show').html('开');
        $('.main>.time').show();
    }else{
        $('.left_bar .setting .istime div.show').html('关');
        $('.main>.time').hide();
    }
}
// 设置设置事件
function setSettingEvents() {
    $('.left_bar .setting .theme div.show').click(function() {
        var a = JSON.parse(localStorage.getItem('settings'));
        if (a.theme == 'Light') {
            a.theme = 'Dark';
        } else if(a.theme=='Dark'){
            a.theme ='Eyes';
        }else{
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
        startDialog('maincolor',true);
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
    $('.left_bar .setting .istime div.show').click(function() {
        var a = JSON.parse(localStorage.getItem('settings'));
        if (a.istime) {
            a.istime = false;
        } else {
            a.istime = true;
        }
        localStorage.setItem('settings', JSON.stringify(a));
        querySettings();
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
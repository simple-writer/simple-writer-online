function setloca() {
    if (!localStorage.getItem('iswent')) {
        localStorage.setItem('iswent', 'true');
            localStorage.setItem('settings', '{"theme":"Light","maincolor":"#00baff","fontfamily":"sans-serif","titlemode":false,"istime":false}');
            localStorage.setItem('texts', '{}')
            startDialog('files',false);
    }else{
        startDialog('files',false)
    }
}
function setloca() {
    if (!localStorage.getItem('iswent')) {
        localStorage.setItem('iswent', 'true');
        localStorage.setItem('settings', '{"theme":"Light","maincolor":"#00BAFF","fontfamily":"sans-serif","titlemode":false}');
        localStorage.setItem('texts', '{}')
    }
}
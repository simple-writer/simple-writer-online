function setTime(){
    var h=new Date().getHours();
    var m=new Date().getMinutes();
    if(h<10){
        h='0'+h;
    };
    if(m<10){
        m='0'+m;
    }
    $('.main>.time').html(h+':'+m);
}
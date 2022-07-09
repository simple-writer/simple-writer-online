function alert(str) {
    var a = document.createElement('div');
    a.innerHTML = str;
    document.querySelector('.message').append(a);
    setTimeout(() => {
        a.remove();
    }, 3000);
}
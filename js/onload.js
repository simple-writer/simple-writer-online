console.log(`    _______       _                                  _              
   |  _____|     |_|                                | |              
   | |_____    ____       _  ___  __     _  ___     | |      ___      
   |_____  |  |__  |     | |/ _ \\/_ \\   | |/ _ \\    | |     / _ \\      
    _____| |     | |__   | | | | | | |  | | |_| |   | |__  | /_\\ |      
   |_______|     |____|  |_|_| |_| |_|  | |\\___/    |____| \\ \\___        
                                        | |                 \\___/                  
                                        |_|     
    _        __        _             _         _          
   \\ \\      /  \\      / /           |_|       | |      
    \\ \\    / /\\ \\    / /   _  __   ____     __| |__     ___    _  __   
     \\ \\  / /  \\ \\  / /   | |/__\\ |__  |   |__   __|   / _ \\  | |/__\\  
      \\ \\/ /    \\ \\/ /    | |        | |__    | |__   | /_\\ | | |
       \\__/      \\__/     |_|        |____|   |____|  \\ \\___  |_|
                                                       \\___/
`)
window.onload = function() {
    setTimeout(function() {
        $('.loading').hide();
        $('.main').show();
        startFunction();
    }, 2000);
}
var nowfocus;
var nowstart;
var zdsave = setInterval(saveNowFile, 180000);
var isread = false;
var daorustr;
var addzt = null;
querySettings();
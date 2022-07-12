console.log('%cSimple Writer%cV2.0',`
  font-size:25px;
  color:#00baff;
  background:#f1f1fe;
  padding:10px;
  border-radius:3px 0 0 3px;
  margin:20px;
  margin-right:0px;
`,`
font-size:15px;
font-weight:bold;
color:#fff;
background:blue;
border-radius:0 3px 3px 0;
padding:2px;
`);
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
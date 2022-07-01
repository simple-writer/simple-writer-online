//试验代码
// document.onkeydown=function(e){
// 	e.preventDefault();
// 	if(e.ctrlKey&&e.keyCode==83){
// 		console.log('ctrl + s');
// 	}
// }


setloca();
function setloca(){
	if(!localStorage.getItem('settings')){
		localStorage.setItem('settings','{"theme":"Light","maincolor":"#00BAFF","fontfamily":"sans-serif"}');
	}
}
querySettings();
function querySettings(){
	var a=JSON.parse(localStorage.getItem('settings'));
	//Theme
	if(a.theme=='Light'){
		$('.left_bar .setting .theme div.show').html('亮');
		$('*').css({
			'--bgcolor':'#f4f4f4',
			'--titlebgcolor':'#eeeeee',
			'--textcolor':'#000',
			'--fa-primary-color':'#000',
			'--leftbar-show-hover-bgcolor':'#fff',
			'--leftbar-go-hover-bgcolor':'#e6e6e6',
			'--editor-focus-bgcolor':'rgb(235,235,235)'
		});
	}else if(a.theme=='Dark'){
		$('.left_bar .setting .theme div.show').html('暗');
		$('*').css({
			'--bgcolor':'#0b0b0b',
			'--titlebgcolor':'#111111',
			'--textcolor':'#fff',
			'--fa-primary-color':'#fff',
			'--leftbar-show-hover-bgcolor':'#000',
			'--leftbar-go-hover-bgcolor':'#191919',
			'--editor-focus-bgcolor':'rgb(20,20,20)'
		});
	};
	//MainColor
	if(a.maincolor=="#00BAFF"){
		$('.left_bar .setting .maincolor div.show').html('蓝色');
        $('*').css('--maincolor','#00BAFF');
        $('*').css('--fa-secondary-color','#00BAFF');
	}else if(a.maincolor=="#EA6725"){
		$('.left_bar .setting .maincolor div.show').html('橙色');
        $('*').css('--maincolor','#EA6725');
        $('*').css('--fa-secondary-color','#EA6725');
	}else if(a.maincolor=="#31EA23"){
		$('.left_bar .setting .maincolor div.show').html('绿色');
        $('*').css('--maincolor','#31EA23');
        $('*').css('--fa-secondary-color','#31EA23');
	}else if(a.maincolor=="#e7ea22"){
		$('.left_bar .setting .maincolor div.show').html('黄色');
        $('*').css('--maincolor','#e7ea22');
        $('*').css('--fa-secondary-color','#e7ea22');
	}else if(a.maincolor=="#ea2ae7"){
		$('.left_bar .setting .maincolor div.show').html('粉色');
        $('*').css('--maincolor','#ea2ae7');
        $('*').css('--fa-secondary-color','#ea2ae7');
	}else{
		$('.left_bar .setting .maincolor div.show').html(a.maincolor);
		$('*').css('--maincolor',a.maincolor);
		$('*').css('--fa-secondary-color',a.maincolor);
	};
	//FontFamily
	if(a.fontfamily=='sans-serif'){
		$('.left_bar .setting .fontfamily div.show').html('sans-serif');
		$('*').css('--font-family','sans-serif');
	}else{
		$('.left_bar .setting .fontfamily div.show').html(a.fontfamily);
		$('*').css('--font-family',a.fontfamily);
	}
}
setInterval(function(){
	querySettings();
},500);
//settings 
$('.left_bar .setting .theme div.show').click(function(){
	var a=JSON.parse(localStorage.getItem('settings'));
	if(a.theme=='Light'){
		a.theme='Dark';
	}else{
		a.theme='Light';
	}
	localStorage.setItem('settings',JSON.stringify(a));
	querySettings();
});
$('.left_bar .setting .fontfamily div.show').click(function(){
	var a=JSON.parse(localStorage.getItem('settings'));
	if(a.fontfamily=='sans-serif'){
		a.fontfamily='monospace';
	}else if(a.fontfamily=='monospace'){
		a.fontfamily='cursive';
	}else if(a.fontfamily=='cursive'){
		a.fontfamily='serif'
	}else if(a.fontfamily=='serif'){
		a.fontfamily='Consolas'
	}else{
		a.fontfamily='sans-serif'
	}
	localStorage.setItem('settings',JSON.stringify(a));
	querySettings();
});
$('.left_bar .setting .maincolor div.show').click(function(){
	var a=JSON.parse(localStorage.getItem('settings'));
	if(a.maincolor=='#00BAFF'){
		a.maincolor='#EA6725';
	}else if(a.maincolor=='#EA6725'){
		a.maincolor='#31EA23';
	}else if(a.maincolor=='#31EA23'){
		a.maincolor='#e7ea22'
	}else if(a.maincolor=='#e7ea22'){
		a.maincolor='#ea2ae7'
	}else{
		a.maincolor='#00BAFF'
	}
	localStorage.setItem('settings',JSON.stringify(a));
	querySettings();
});
var nowfocus;
setEvents();
function setEvents(){
	$('.editor h1').focus(function(){
		nowfocus=$(this);
	});
	$('.editor h2').focus(function(){
		nowfocus=$(this);
	});
	$('.editor h3').focus(function(){
		nowfocus=$(this);
	});
	$('.editor p').focus(function(){
		nowfocus=$(this);
	});
	$('.editor blockquote').focus(function(){
		nowfocus=$(this);
	});
	$('.editor h1').attr('contenteditable','plaintext-only');
	$('.editor h2').attr('contenteditable','plaintext-only');
	$('.editor h3').attr('contenteditable','plaintext-only');
	$('.editor p').attr('contenteditable','plaintext-only');
	$('.editor blockquote').attr('contenteditable','plaintext-only');
	
}

$(document).keydown(function(e){
	console.log(e.key,e.keyCode);
	if(e.ctrlKey&&e.keyCode==13&&!e.altKey){
		e.preventDefault();
		var newxj=document.createElement('div');
		newxj.className='xjie';
		newxj.innerHTML='<h3></h3><p></p>';
		var jsnow=nowfocus.get()[0];
		if(jsnow.nodeName=='H1'){}else if(jsnow.nodeName=='H2'){
			$('.editor').get()[0].insertBefore(newxj,jsnow.nextSibling);
			setEvents();
		}else{
			$('.editor').get()[0].insertBefore(newxj,jsnow.parentNode.nextSibling);
			setEvents();
		}
	}else if(e.ctrlKey&&e.altKey&&e.keyCode==13){
		e.preventDefault();
		var newxj=document.createElement('div');
		newxj.className='xjie';
		newxj.innerHTML='<h3></h3><p></p>';
		var jsnow=nowfocus.get()[0];
		if(jsnow.nodeName=='H1'){}else if(jsnow.nodeName=='H2'){}else{
			if(jsnow.parentNode.className=='xjie mr'){}else{
				$('.editor').get()[0].insertBefore(newxj,jsnow.parentNode);
				setEvents();
			}
			
		}
	}else if(e.ctrlKey&&!e.altKey&&e.key=='q'){
		e.preventDefault();
		var newxj=document.createElement('blockquote');
		var newp=document.createElement('p');
		var jsnow=nowfocus.get()[0];
		if(jsnow.nodeName=='H1'){}else if(jsnow.nodeName=='H2'){
			jsnow.parentNode.insertBefore(newp,jsnow.nextSibling);
			jsnow.parentNode.insertBefore(newxj,jsnow.nextSibling);
			setEvents();
		}else{
			jsnow.parentNode.insertBefore(newp,jsnow.nextSibling);
			jsnow.parentNode.insertBefore(newxj,jsnow.nextSibling);
			setEvents();
		}
	}else if(e.ctrlKey&&e.altKey&&e.key=='q'){
		e.preventDefault();
		var newxj=document.createElement('blockquote');
		var jsnow=nowfocus.get()[0];
		if(jsnow.nodeName=='H1'){}else if(jsnow.nodeName=='H2'||jsnow.nodeName=='H3'){}else{
			jsnow.parentNode.insertBefore(newxj,jsnow);
			setEvents();
		}
	}else if(!e.ctrlKey&&e.key=='Delete'){
		e.preventDefault();
		var jsnow=nowfocus.get()[0];
		if(jsnow.nodeName=='H1'){}else if(jsnow.nodeName=='H2'||jsnow.nodeName=='H3'){}else{
			var nextf=jsnow;
			for(var i=0;i>-1;i++){
				if(nextf.nextSibling.nodeType==3){
					nextf=nextf.nextSibling;
				}else{
					break;
				}
			}
			jsnow.remove();
			setEvents();
		}
		
		
	}else if(e.ctrlKey&&e.key=='Delete'){
		e.preventDefault();
		var jsnow=nowfocus.get()[0];
		if(jsnow.nodeName=='H1'){}else if(jsnow.nodeName=='H2'||jsnow.parentNode.className=='xjie mr'){}else{
			jsnow.parentNode.remove();
			setEvents();
		}
	}else if(e.key=='F11'){
		e.preventDefault();
		$('.addons ul li').eq(1).click();
	}else if(e.ctrlKey&&e.shiftKey&&e.key=='S'){
		e.preventDefault();
		$('.logo').click();
	}
});
$('.addons ul li').eq(1).click(function(){
	if(document.fullscreenElement){
		document.exitFullscreen();
		$(this).children('span').removeClass('bi-arrows-angle-contract');
		$(this).children('span').addClass('bi-arrows-angle-expand');
	}else{
		document.documentElement.requestFullscreen();
		$(this).children('span').addClass('bi-arrows-angle-contract');
		$(this).children('span').removeClass('bi-arrows-angle-expand');
	}
});
$('.addons ul li').eq(0).click(function(){
	$('.menu').toggle(150);
	$('.menu>div').hide();
	$('.menu .mr').show();
});
$('.menu li[data-group]').click(function(){
	$('.menu').toggle(150);
	$('.menu').toggle(150);
	$('.menu>div').hide();
	$('.menu .'+$(this).attr('data-group')).show();
});
$('.cover').click(function(){
		$('.left_bar').css('left','-'+($('.left_bar').width()+70)+'px');
		$('.cover').css('opacity','0');
		$('.cover').css('pointer-events','none');
});
$('.logo').click(function(){
	if($('.left_bar').css('left')=='0px'){
		$('.left_bar').css('left','-'+($('.left_bar').width()+70)+'px');
		$('.cover').css('opacity','0');
		$('.cover').css('pointer-events','none');
	}else{
		$('.left_bar').css('left','0px');
		$('.cover').css('opacity','1');
		$('.cover').css('pointer-events','all');
	}
});


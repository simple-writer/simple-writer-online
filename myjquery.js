function $(a){
	return new S(a);
}
function S(a){
	if(typeof a=='string'){
		a=document.querySelectorAll(a);
	}
	var all=[];
	for(var i=0;i<a.length;i++){
		if(a[i]){
			all[all.length]=a[i];
		}else{
			all=[a];
		}
	}
	this.fn=all;
	this.fnhis=all;
}
S.prototype={
	click:function(fun){
		if(fun==undefined){
			this.fn[0].click();
		}else{
			this.fn.forEach(e=>{
				e.addEventListener('click',fun);
			});
		}
		
	},dbclick:function(fun){
		if(fun==undefined){
			this.fn[0].dbclick();
		}else{
			this.fn.forEach(e=>{
				e.addEventListener('dbclick',fun);
			});
		}
		
	},mousedown:function(fun){
		if(fun==undefined){
			this.fn[0].mousedown();
		}else{
			this.fn.forEach(e=>{
				e.addEventListener('mousedown',fun);
			});
		}
		
	},mousemove:function(fun){
		if(fun==undefined){
			this.fn[0].mousemove();
		}else{
			this.fn.forEach(e=>{
				e.addEventListener('mousemove',fun);
			});
		}
		
	},mouseup:function(fun){
		if(fun==undefined){
			this.fn[0].mouseup();
		}else{
			this.fn.forEach(e=>{
				e.addEventListener('mouseup',fun);
			});
		}
		
	},mouseenter:function(fun){
		if(fun==undefined){
			this.fn[0].mouseenter();
		}else{
			this.fn.forEach(e=>{
				e.addEventListener('mouseenter',fun);
			});
		}
		
	},mouseleave:function(fun){
		if(fun==undefined){
			this.fn[0].mouseleave();
		}else{
			this.fn.forEach(e=>{
				e.addEventListener('mouseleave',fun);
			});
		}
		
	},mouseout:function(fun){
		if(fun==undefined){
			this.fn[0].mouseout();
		}else{
			this.fn.forEach(e=>{
				e.addEventListener('mouseout',fun);
			});
		}
		
	},mouseover:function(fun){
		if(fun==undefined){
			this.fn[0].mouseover();
		}else{
			this.fn.forEach(e=>{
				e.addEventListener('mouseover',fun);
			});
		}
		
	},input:function(fun){
		if(fun==undefined){
			this.fn[0].input();
		}else{
			this.fn.forEach(e=>{
				e.addEventListener('input',fun);
			});
		}
		
	},change:function(fun){
		if(fun==undefined){
			this.fn[0].change();
		}else{
			this.fn.forEach(e=>{
				e.addEventListener('change',fun);
			});
		}
		
	},add:function(a){
		if(typeof a=='string'){
			a=document.querySelectorAll(a);
		}
		var all=this.fn;
		for(var i=0;i<a.length;i++){
			if(a[i]){
				all[all.length]=a[i];
			}else{
				all=[a];
			}
		}
		this.fn=all;
		return this;
	},find:function(a){
		if(typeof a=='string'){
			a=this.fn[0].querySelectorAll(a);
		}
		var all=[];
		for(var i=0;i<a.length;i++){
			if(a[i]){
				all[all.length]=a[i];
			}else{
				all=[a];
			}
		}
		this.fn=all;
		return this;
	},addBack:function(){
		var h=this.fnhis;
		for(var i=0;i<this.fn.length;i++){
			h[h.length]=this.fn[i];
		}
		this.fn=h;
		this.fnhis=h;
		return this;
	},addClass:function(a){
		this.fn.forEach(e=>{
			e.classList.add(a);
		})
	}
}
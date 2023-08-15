var fs={
  FS_KEY_C:"simple_writer",
  isinit:(!!localStorage.fsinit)||false,
  init:function(){
    return new Promise(function(r,j){
      localforage.ready().then(function(){
        localforage.getItem(fs.FS_KEY_C).then(function(value){
          if(!value){
            localforage.setItem(fs.FS_KEY_C,'{}').then(function(){
              localStorage.fsinit='1';
                r();
            });
          }
          localStorage.fsinit='1';
            r();
        })
      })
      
    }) 
  },
  getRandomKey:function(){
    var d=Date.now();
    return d.toString(16);
  },
  readFile:function(path){
    return new Promise(function(r,j){
      path=path.split('\\');
      localforage.getItem(fs.FS_KEY_C).then(function(value){
        var vq=JSON.parse(value);
        for(var i=0;i<path.length;i++){
          if(path[i]=='')continue;
          if(vq[path[i]]&&typeof vq=='object'){
            vq=vq[path[i]]
          }else{
            j({
              statu:-1,
              msg:"No Such File There!"
            })
            return;
          }
        }
        if(typeof vq=='object'){
          j({
            statu:-2,
            msg:"Cannot Read A Directory!"
          })
        }else{
          localforage.getItem(vq).then(function(v){
            r(v);
          })
        }
      });
    })
  },
  writeFile:function(path,content){
    return new Promise(function(r,j){
      path=path.split('\\');
      localforage.getItem(fs.FS_KEY_C).then(function(value){
        var vq=JSON.parse(value);
        for(var i=0;i<path.length;i++){
          if(path[i]=='')continue;
          if(vq[path[i]]&&typeof vq=='object'){
            vq=vq[path[i]]
          }else{
            j({
              statu:-1,
              msg:"No Such File There!"
            })
            return;
          }
        }
        if(typeof vq=='object'){
          j({
            statu:-2,
            msg:"Cannot Write A Directory!"
          })
        }else{
          var qx=JSON.parse(value);
          var qxe='qx';
          for(var i=0;i<path.length;i++){
            if(path[i]=='')continue;
            qxe+='["'+path[i]+'"]'
          }
          var nk=fs.getRandomKey();
          qxe+='="'+nk+'"';
          eval(qxe);
          Promise.all([localforage.setItem(fs.FS_KEY_C,JSON.stringify(qx)),
          localforage.setItem(nk,content),
          localforage.removeItem(vq),]).then(function(){r()});
        }
      });
    })
  },
  createFile:function(path,filename){
    return new Promise(function(r,j){
      path=path.split('\\');
      localforage.getItem(fs.FS_KEY_C).then(function(value){
        var vq=JSON.parse(value);
        for(var i=0;i<path.length;i++){
          if(path[i]=='')continue;
          if(vq[path[i]]&&typeof vq=='object'){
            vq=vq[path[i]]
          }else{
            j({
              statu:-1,
              msg:"No Such Directory There!"
            })
            return;
          }
        }
        if(typeof vq=='string'){
          j({
            statu:-2,
            msg:"Cannot Create File In A File!"
          })
        }else if(vq[filename]){
          j({
            statu:-3,
            msg:"There Are An Same-Name File/Directory!"
          })
        }else{
          var qx=JSON.parse(value);
          var qxe='qx';
          for(var i=0;i<path.length;i++){
            if(path[i]=='')continue;
            qxe+='["'+path[i]+'"]'
          }
          qxe+='["'+filename+'"]="'+fs.getRandomKey()+'"';
          eval(qxe);
          localforage.setItem(fs.FS_KEY_C,JSON.stringify(qx)).then(function(v){
            r(v);
          })
        }
      });
    })
  },
  mkdir:function(path,dirname){
    return new Promise(function(r,j){
      path=path.split('\\');
      localforage.getItem(fs.FS_KEY_C).then(function(value){
        var vq=JSON.parse(value);
        for(var i=0;i<path.length;i++){
          if(path[i]=='')continue;
          if(vq[path[i]]&&typeof vq=='object'){
            vq=vq[path[i]]
          }else{
            j({
              statu:-1,
              msg:"No Such Directory There!"
            })
            return;
          }
        }
        if(typeof vq=='string'){
          j({
            statu:-2,
            msg:"Cannot Create Directory In A File!"
          })
        }else if(vq[dirname]){
          j({
            statu:-3,
            msg:"There Are An Same-Name File/Directory!"
          })
        }else{
          var qx=JSON.parse(value);
          var qxe='qx';
          for(var i=0;i<path.length;i++){
            if(path[i]=='')continue;
            qxe+='["'+path[i]+'"]'
          }
          qxe+='["'+dirname+'"]={}';
          eval(qxe);
          localforage.setItem(fs.FS_KEY_C,JSON.stringify(qx)).then(function(v){
            r(v);
          })
        }
      });
    })
  },
  mkdirs:function(path){
    return new Promise(function(r,j){
      function xhs(path){
        var ntl=0;
        localforage.getItem(fs.FS_KEY_C).then(function(value){
          var vq=JSON.parse(value);
          for(var i=0;i<path.length;i++){
            if(path[i]=='')continue;
            if(vq[path[i]]&&typeof vq=='object'){
              vq=vq[path[i]]
            }else{
              ntl=1;
              var a=[];
              for(var j=0;j<i;j++){
                a.push(path[j]);
              }
              fs.mkdir(a.join('\\'),path[i]).then(function(){
                xhs(path);
              });
              break;
            }
          }
          if(ntl==0){r();}
        });
      }
      xhs(path.split('\\'));
    })
  },
  delete:function(path){
    return new Promise(function(r,j){
      path=path.split('\\');
      localforage.getItem(fs.FS_KEY_C).then(function(value){
        var vq=JSON.parse(value);
        for(var i=0;i<path.length;i++){
          if(path[i]=='')continue;
          if(vq[path[i]]&&typeof vq=='object'){
            vq=vq[path[i]]
          }else{
            j({
              statu:-1,
              msg:"No Such File/Directory There!"
            })
            return;
          }
        }
        var ap=[];
        function rtk(ob){
          if(typeof ob=='string'){
            ap.push(localforage.removeItem(ob));
            return;
          }
          for(var k in ob){
            if(typeof ob[k]=='string'){
              ap.push(localforage.removeItem(ob[k]))
            }else if(typeof ob[k]=='object'){
              rtk(ob[k]);
            }
          }
        }
        rtk(vq);
        Promise.all(ap).then(function(){
          var qx=JSON.parse(value);
          var qxe='delete qx';
          for(var i=0;i<path.length;i++){
            if(path[i]=='')continue;
            qxe+='["'+path[i]+'"]'
          }
          eval(qxe);
          localforage.setItem(fs.FS_KEY_C,JSON.stringify(qx)).then(function(v){
            r(v);
          })
        })
      });
    })
  },
  list:function(path){
    return new Promise(function(r,j){
      path=path.split('\\');
      localforage.getItem(fs.FS_KEY_C).then(function(value){
        var vq=JSON.parse(value);
        for(var i=0;i<path.length;i++){
          if(path[i]=='')continue;
          if(vq[path[i]]&&typeof vq=='object'){
            vq=vq[path[i]]
          }else{
            j({
              statu:-1,
              msg:"No Such Directory There!"
            })
            return;
          }
        }
        if(typeof vq=='string'){
          j({
            statu:-2,
            msg:"Cannot List A File!"
          })
        }else{
          var qr={
            dir:[],
            file:[]
          }
          for(var k in vq){
            if(typeof vq[k]=='object'){
              qr.dir.push(k);
            }else{
              qr.file.push(k);
            }
          }
          r(qr);
        }
      });
    })
  },
  rename:function(path,name){
    return new Promise(function(r,j){
      path=path.split('\\');
      localforage.getItem(fs.FS_KEY_C).then(function(value){
        var vq=JSON.parse(value);
        for(var i=0;i<path.length;i++){
          if(path[i]=='')continue;
          if(vq[path[i]]&&typeof vq=='object'){
            vq=vq[path[i]]
          }else{
            j({
              statu:-1,
              msg:"No Such Directory/File There!"
            })
            return;
          }
        }
        var vq2=JSON.parse(value);
        var qx='vq2';
        for(var i=0;i<path.length-1;i++){
          if(path[i]=='') continue;
          qx+='["'+path[i]+'"]';
        }
        eval('delete '+qx+'["'+path[path.length-1]+'"]');
        eval(qx+'["'+name+'"]=vq');
        localforage.setItem(fs.FS_KEY_C,JSON.stringify(vq2)).then(function(v){
          r(v);
        })
      });
    })
  }
}
fs.init().then(function(){
  xr();
})

document.execCommand("defaultParagraphSeparator", false, "p");  
document.querySelector('#editor').onkeydown=function(e){
  if(e.ctrlKey){
    if(e.key=='b'||e.key=='i'){
      e.preventDefault();
    }
    if(e.altKey){
      if(e.key=='1'){
        document.execCommand('formatBlock',false,'<h1>');
      }else if(e.key=='2'){
        document.execCommand('formatBlock',false,'<h2>');
      }else if(e.key=='3'){
        document.execCommand('formatBlock',false,'<h3>');
      }
    }else if(e.shiftKey){
      if(e.key=='S'){
        if(opentext){
          openExportDialog();
        }
      }
    }else{
      if(e.key=='q'){
        document.execCommand('formatBlock',false,'<BLOCKQUOTE>');
      }
      if(e.key=='s'){
      e.preventDefault();
        if(opentext){saveTxt()};
      }
    }
  }
  if(e.key=='Enter'&&!e.shiftKey){
    setTimeout(function(){
      document.execCommand('formatBlock',false,'<p>');
    })
  };
  if(e.key=='Backspace'){
    setTimeout(function(){
      if(document.querySelector('#editor').innerHTML==''){
          document.execCommand('formatBlock',false,'<p>');
      }
    })
  }
}
document.onkeydown=function(e){
  if(e.keyCode==122){
    e.preventDefault();
    document.querySelector('.topbar .fullscreen').click();
    e.returnValue=false;
  }
}
document.querySelector('.topbar .fullscreen').onclick=function(){
  if(document.fullscreenElement){
    document.exitFullscreen();
  }else{
    document.documentElement.requestFullscreen();
  }
}
document.onfullscreenchange=function(){
  if(document.fullscreenElement){
    document.querySelector('.topbar .fullscreen i').className='bi bi-arrows-angle-contract'
  }else{
    document.querySelector('.topbar .fullscreen i').className='bi bi-arrows-angle-expand'
  }
}

var nowpath='\\';
var file_con=document.querySelector('.qmenu.files .file_con');
function xr(){
  file_con.innerHTML='';
  fs.list(nowpath).then(function(res){
    if(nowpath!='\\'){
      var item=document.createElement('div');
      item.classList.add('item');
      item.classList.add('dir');
      var n=nowpath.split('\\');
      while(!n.pop()){};
      item.setAttribute('data-path',n.join('\\')+'\\');
      item.innerHTML='<div class="left"><i class="bi bi-folder-fill"></i></div><div class="title">...</div>'
      file_con.append(item)
      item.onclick=function(){
        nowpath=this.getAttribute('data-path');
        xr();
      }
    }
    for(var i=0;i<res.dir.length;i++){
      var item=document.createElement('div');
      item.classList.add('item');
      item.classList.add('dir');
      item.setAttribute('data-path',nowpath+res.dir[i]+'\\');
      item.innerHTML='<div class="left"><i class="bi bi-folder-fill"></i></div><div class="title">'+res.dir[i]+'</div><div class="controls"><i class="bi bi-pencil"></i><i class="bi bi-trash"></i></div>'
      file_con.append(item)
      item.onclick=function(){
        nowpath=this.getAttribute('data-path');
        xr();
      }
      item.querySelector('.controls .bi-trash').onclick=function(e){
        e.stopPropagation();
        if(confirm('你确定要删除吗？删除后不可恢复！')){
          fs.delete(this.parentElement.parentElement.getAttribute('data-path')).then(function(){
            xr();
          })
        }
      }
      item.querySelector('.controls .bi-pencil').onclick=function(e){
        e.stopPropagation();
        var ylt=this.parentElement.parentElement.querySelector('.title');
        var yl=ylt.innerHTML;
        ylt.innerHTML='<input type="text"/>';
        ylt.querySelector('input').value=yl;
        item.querySelector('input').focus();
  item.querySelector('input').onblur=function(){
    _submit();
  }
  item.querySelector('input').onkeydown=function(e){
    if(e.key=='Enter'){
      this.blur();
    }
  }
  function _submit(){
    var v=item.querySelector('input').value;
    if(!v.trim()){
      xr();
      return alert('文件夹名不能为纯空格或为空');
    } 
    if(v.match(/[\/\\?:*<>|"]/)){
      xr();
      return alert('文件夹名不能包含\\\/?:*<>|"');
    }else{
      fs.rename(ylt.parentElement.getAttribute('data-path'),v).then(function(){
        setTimeout(xr,10);
      }).catch(function(e){
        alert(e.msg)
      })
    }
  }
      }
    }
    for(var i=0;i<res.file.length;i++){
      var item=document.createElement('div');
      item.classList.add('item');
      item.classList.add('file');
      item.setAttribute('data-path',nowpath+res.file[i]);
      item.innerHTML='<div class="left"><i class="bi bi-file-text"></i></div><div class="title">'+res.file[i]+'</div><div class="controls"><i class="bi bi-pencil"></i><i class="bi bi-trash"></i></div>'
      file_con.append(item)
      item.onclick=function(){
        document.querySelector(".qmenu.files .close").click();
        openTxt(this.getAttribute('data-path'));
      }
      item.querySelector('.controls .bi-trash').onclick=function(e){
        e.stopPropagation();
        if(confirm('你确定要删除吗？删除后不可恢复！')){
          fs.delete(this.parentElement.parentElement.getAttribute('data-path')).then(function(){
            xr();
          })
        }
      }
      item.querySelector('.controls .bi-pencil').onclick=function(e){
        e.stopPropagation();
        var ylt=this.parentElement.parentElement.querySelector('.title');
        var yl=ylt.innerHTML;
        ylt.innerHTML='<input type="text"/>';
        ylt.querySelector('input').value=yl;
        item.querySelector('input').focus();
  item.querySelector('input').onblur=function(){
    _submit();
  }
  item.querySelector('input').onkeydown=function(e){
    if(e.key=='Enter'){
      this.blur();
    }
  }
  function _submit(){
    var v=item.querySelector('input').value;
    if(!v.trim()){
      xr();
      return alert('文件名不能为纯空格或为空');
    } 
    if(v.match(/[\/\\?:*<>|"]/)){
      xr();
      return alert('文件名不能包含\\\/?:*<>|"');
    }else{
      fs.rename(ylt.parentElement.getAttribute('data-path'),v).then(function(){
        setTimeout(xr,10);
      }).catch(function(e){
        alert(e.msg)
      })
    }
  }
      }
    }
  })
}
var addnew_menu=document.querySelector(".cmenu.addnew_menu");
document.querySelector(".files.qmenu .bar .addnew").onclick=function(e){
  e.stopPropagation();
  if(addnew_menu.classList.contains('act')){
    addnew_menu.classList.remove('act');
  }else{
    addnew_menu.classList.add('act');
  }
}
document.querySelector(".files.qmenu").addEventListener('click',function(e){
  e.stopPropagation();
  var _a=document.querySelector(".cmenu.act")
  _a&&_a.classList.remove('act');
})

function tryaddNewFile(){
  var item=document.createElement('div');
      item.classList.add('item');
      item.classList.add('file');
      item.innerHTML='<div class="left"><i class="bi bi-file-text"></i></div><div class="title"><input type="text"/></div><div class="controls"><i class="bi bi-pencil"></i><i class="bi bi-trash"></i></div>'
  file_con.append(item);
  item.querySelector('input').focus();
  item.querySelector('input').onblur=function(){
    _submit();
  }
  item.querySelector('input').onkeydown=function(e){
    if(e.key=='Enter'){
      this.blur();
    }
  }
  function _submit(){
    var v=item.querySelector('input').value;
    if(!v.trim()){
      xr();
      return alert('文件名不能为纯空格或为空');
    } 
    if(v.match(/[\/\\?:*<>|"]/)){
      xr();
      return alert('文件名不能包含\\\/?:*<>|"');
    }else{
      fs.createFile(nowpath,v).then(function(){
        xr();
      }).catch(function(e){
        alert(e.msg)
      })
    }
  }
}
function tryaddNewFolder(){
  var item=document.createElement('div');
      item.classList.add('item');
      item.classList.add('dir');
      item.innerHTML='<div class="left"><i class="bi bi-folder-fill"></i></div><div class="title"><input type="text"/></div><div class="controls"><i class="bi bi-pencil"></i><i class="bi bi-trash"></i></div>'
  file_con.append(item);
  item.querySelector('input').focus();
  item.querySelector('input').onblur=function(){
    _submit();
  }
  item.querySelector('input').onkeydown=function(e){
    if(e.key=='Enter'){
      this.blur();
    }
  }
  function _submit(){
    var v=item.querySelector('input').value;
    if(!v.trim()){
      xr();
      return alert('文件名不能为纯空格或为空');
    } 
    if(v.match(/[\/\\?:*<>|"]/)){
      xr();
      return alert('文件名不能包含\\\/?:*<>|"');
    }else{
      fs.mkdir(nowpath,v).then(function(){
        xr();
      })
    }
  }
}
function tryimportMd(){
  getAFile('.md',function(file){
    var reader=new FileReader();
    reader.onload=function(){
      console.log(file);
      var name=file.name;
      var res=reader.result;
      fs.createFile(nowpath,name).then(function(){
        fs.writeFile(nowpath+name,res).then(function(){
          xr();
        })
      }).catch(function(){
        alert('我不管，文件重名了！')
      })
    }
    reader.readAsText(file);
  })
}

document.querySelector('.topbar .menu').onclick=function(e){
  e.stopPropagation();
  var a=document.querySelector(".files.qmenu");
  if(a.classList.contains('act')){
    a.classList.remove('act');
    a.style.left='';
    setTimeout(function(){
      a.style.display='';
    },300)
  }else{
    a.classList.remove('act');
    a.style.display='block';
    setTimeout(function(){
      a.style.left='0';
    },10)
  }
}
document.querySelector(".files.qmenu .bar .close").onclick=function(){
  var a=document.querySelector(".files.qmenu");
  a.classList.remove('act');
  a.style.left='';
  setTimeout(function(){
    a.style.display='';
  },300)
}
document.addEventListener('click',function(){
  var a=document.querySelector(".files.qmenu");
  a.classList.remove('act');
  a.style.left='';
  setTimeout(function(){
    a.style.display='';
  },300)
  var a2=document.querySelector(".settings.qmenu");
  a2.classList.remove('act');
  a2.style.right='';
  setTimeout(function(){
    a2.style.display='';
  },300)
})
var opentext=null;
function openTxt(path){
  document.querySelector(".guide").style.display='none';
  fs.readFile(path).then(function(res){
    res=res||'';
    var reslines=res.split('\n');
    var _ql=''
    for(var i=0;i<reslines.length;i++){
      if(reslines[i].trim()=='') continue;
      if(reslines[i].indexOf('# ')==0){
        reslines[i]=reslines[i].replace('# ','<h1>');
        if(i+1==reslines.length||reslines[i+1].trim()==''){
          reslines[i]+='</h1>'
        }else{
          reslines[i]+='<br>';
          _ql='h1';
        }
      }else if(reslines[i].indexOf('## ')==0){
        reslines[i]=reslines[i].replace('## ','<h2>');
        if(i+1==reslines.length||reslines[i+1].trim()==''){
          reslines[i]+='</h2>'
        }else{
          reslines[i]+='<br>';
          _ql='h2';
        }
      }else if(reslines[i].indexOf('### ')==0){
        reslines[i]=reslines[i].replace('### ','<h3>');
        if(i+1==reslines.length||reslines[i+1].trim()==''){
          reslines[i]+='</h3>'
        }else{
          reslines[i]+='<br>';
          _ql='h3';
        }
      }else if(reslines[i].indexOf('> ')==0){
        reslines[i]=reslines[i].replace('> ','<blockquote>');
        if(i+1==reslines.length||reslines[i+1].trim()==''){
          reslines[i]+='</blockquote>'
        }else{
          reslines[i]+='<br>';
          _ql='blockquote';
        }
      }else{
        if(!_ql){
          reslines[i]='<p>'+reslines[i];
          _ql='p';
        }
        if(i+1==reslines.length||reslines[i+1].trim()==''){
          reslines[i]+='</'+_ql+'>';
          _ql='';
        }else{
          reslines[i]+='<br>';
        }
      }
    }
    reslines=reslines.join('');
    opentext=path;
    document.getElementById("editor").innerHTML=reslines;
    var a=path.split('\\');
    for(var i=0;i<a.length;i++){
      if(a[i]==''){
        a.splice(i,1);
      }
    }
    document.querySelector('.topbar .title').innerHTML=a[a.length-1];
  })
}

function saveTxt(){
  fs.writeFile(opentext,editortoMd()).then(function(){
    alert('保存成功！')
  })
}
function alert(txt){
  document.querySelector(".alertMessage").innerText=txt;
  document.querySelector(".alertMessage").style.display='block';
  setTimeout(function(){
    document.querySelector(".alertMessage").style.display='none';
  },3000)
}
function editortoMd(){
  var str='';
  document.querySelector("#editor").childNodes.forEach(function(el){
    if(el.nodeType==1){
      if(el.tagName=='H1'){
        str+='# '+el.innerHTML.replaceAll('<br>','\n')+'\n\n';
      }else if(el.tagName=='H2'){
        str+='## '+el.innerHTML.replaceAll('<br>','\n')+'\n\n';
      }else if(el.tagName=='H3'){
        str+='### '+el.innerHTML.replaceAll('<br>','\n')+'\n\n';
      }else if(el.tagName=='BLOCKQUOTE'){
        str+='> '+el.innerHTML.replaceAll('<br>','\n')+'\n\n';
      }else if(el.tagName=='BR'){
        str+='\n';
      }else{
        str+=el.innerHTML.replaceAll('<br>','\n')+'\n\n';
      }
    }else{
      str+=el.textContent;
    }
    
  });
  return str;
}

document.querySelector(".topbar .setting").onclick=function(e){
  e.stopPropagation();
  var a=document.querySelector(".settings.qmenu");
  if(a.classList.contains('act')){
    a.classList.remove('act');
    a.style.left='';
    setTimeout(function(){
      a.style.display='';
    },300)
  }else{
    a.classList.remove('act');
    a.style.display='block';
    setTimeout(function(){
      a.style.right='0';
    },10)
  }
}
document.querySelector(".settings.qmenu").addEventListener('click',function(e){
  e.stopPropagation();
})
document.querySelector(".settings.qmenu .bar .close").addEventListener('click',function(){
  var a=document.querySelector(".settings.qmenu");
  a.classList.remove('act');
  a.style.right='';
  setTimeout(function(){
    a.style.display='';
  },300)
})

var defaultSettings={
  ColorTheme:"light",
  EditorTheme:"default",
  EditorTypes:[0,0,0,0]
}
if(!localStorage.simplewriterset){
  localStorage.simplewriterset=JSON.stringify(defaultSettings);
}

function xrSettings(){
  var s=JSON.parse(localStorage.simplewriterset);
  document.body.className=s.ColorTheme;
  document.querySelectorAll(".settings.qmenu .colorthemes .item").forEach(function(el){
    el.classList.remove('act');
    if(el.getAttribute('data-class')==s.ColorTheme){
      el.classList.add('act');
    }
    el.onclick=function(){
      s.ColorTheme=el.getAttribute('data-class');
      localStorage.simplewriterset=JSON.stringify(s);
      document.body.className=s.ColorTheme;
      document.querySelectorAll(".settings.qmenu .colorthemes .item").forEach(function(ell){ell.classList.remove('act')})
      el.classList.add('act');
    }
  })
  document.getElementById('editor').className=s.EditorTheme;
  document.querySelectorAll(".settings.qmenu .editorthemes .item").forEach(function(el){
    el.classList.remove('act');
    if(el.getAttribute('data-class')==s.EditorTheme){
      el.classList.add('act');
    }
    el.onclick=function(){
      s.EditorTheme=el.getAttribute('data-class');
      localStorage.simplewriterset=JSON.stringify(s);
      document.getElementById('editor').className=s.EditorTheme;
      document.querySelectorAll(".settings.qmenu .editorthemes .item").forEach(function(ell){ell.classList.remove('act')})
      el.classList.add('act');
    }
  })
  var settingstyles=['#editor h1{text-align:center;}','#editor h2{text-align:center;}','#editor h3{text-align:center;}','#editor p{text-indent:2em;}']
  document.querySelectorAll(".settings.qmenu .editortypeset li input").forEach(function(el,i){
    if(s.EditorTypes[i]==0){
      document.getElementById("settingkz"+(i+1)).innerHTML='';
      if(el.checked)el.click();
    }else{
      document.getElementById("settingkz"+(i+1)).innerHTML=settingstyles[i];
      if(!el.checked)el.click();
    }
    el.onchange=function(){
      s.EditorTypes[i]=el.checked?1:0;
      localStorage.simplewriterset=JSON.stringify(s);
      if(el.checked){
        document.getElementById("settingkz"+(i+1)).innerHTML=settingstyles[i];
      }else{
        document.getElementById("settingkz"+(i+1)).innerHTML='';
      }
    }
  })
}
xrSettings();

document.querySelector(".importFile").onclick=function(){
  getAFile('application/json',function(file){
    var reader=new FileReader();
    reader.onload=function(){
      var r=JSON.parse(reader.result);
      alert('页面即将在一会儿后刷新');
      var q=[];
      for(var k in r){
        !function(k){
          q.push(localforage.setItem(k,r[k]));
        }(k);
      }
    Promise.all(q).then(function(res){
      window.location.reload();
    });
  }
    reader.readAsText(file);
  })
}
document.querySelector(".exportFile").onclick=function(){
  var dbs={};
  localforage.keys().then(function(ks){
    var q=[];
    ks.forEach(function(k){
      q.push(localforage.getItem(k).then(function(res){
        return [k,res];
      }));
    })
    Promise.all(q).then(function(res){
      res.forEach(function(a){
        dbs[a[0]]=a[1];
      })
      downloadFile('simple-writer-export.json',JSON.stringify(dbs));
    })
  })
}
document.querySelector(".clearAll").onclick=function(){
  if(confirm('该操作将清除所有数据，且不可逆！你确定吗？')){
    var sr=prompt('请输入"simple writer"');
    if(sr=='simple writer'){
      localStorage.clear();
      localforage.clear();
      window.location.reload();
    }else{
      alert('输入错误，应为"simple writer"而不是"'+sr+'"，任务停止')
    }
  }
}
document.querySelector(".recoveyDefaultSetting").onclick=function(){
  if(confirm('该操作将恢复默认的设置，你确定吗？')){
    localStorage.simplewriterset=JSON.stringify(defaultSettings);
    xrSettings();
  }
}
function getAFile(type,fn){
  var inf=document.createElement('input');
  inf.type='file';
  inf.accept=type;
  inf.click();
  inf.onchange=function(){
    if(this.files){
      if(this.files[0]){
        fn(this.files[0]);
      }
    }
  }
}
function downloadFile(name,content){
  var a=document.createElement('a');
  var url=URL.createObjectURL(new Blob([content]));
  a.href=url;
  a.download=name;
  document.body.append(a);
  a.click();
  a.remove();
}
function openExportDialog(){
  document.querySelector(".dialog.exportText").classList.add('act');
}
document.querySelectorAll(".dialog .bi-x-lg").forEach(function(e){
  e.onclick=function(){
    e.parentElement.classList.remove('act');
  }
})
document.querySelector(".dialog.exportText").querySelectorAll('ul li').forEach(function(li){
  li.onclick=function(){
    var hz=li.getAttribute('data-exp');
    if(hz=='md'){
      saveTxt();
      downloadFile(document.querySelector(".topbar .title").innerHTML+'.md',editortoMd());
    }else if(hz=='html'){
      saveTxt();
      downloadFile(document.querySelector(".topbar .title").innerHTML+'.html',document.querySelector("#editor").innerHTML);
    }else if(hz=='doc'){
      saveTxt();
      downloadFile(document.querySelector(".topbar .title").innerHTML+'.doc',document.querySelector("#editor").innerHTML);
    }
  }

})

document.querySelector(".guide_addnew").onclick=function(e){
  e.stopPropagation();
  document.querySelector(".topbar .menu").click();
  setTimeout(function(){
    tryaddNewFile();
  },300)
}
document.querySelector(".guide_start").onclick=function(e){
  e.stopPropagation();
  document.querySelector(".topbar .menu").click();
}
document.querySelector(".guide_quick").onclick=function(){
  fs.createFile(nowpath,'文档-'+new Date().toLocaleString()).then(function(){
    xr();
    openTxt(nowpath+'文档-'+new Date().toLocaleString());
  })
}
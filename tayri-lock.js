/* Desktop deterrent only — never debugger (phones freeze / Kiwi blanks). */
(function(){
  try{
    var ua=navigator.userAgent||'';
    if(/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) return;
    var block=function(e){ try{ e.preventDefault(); e.stopPropagation(); }catch(x){} return false; };
    document.addEventListener('contextmenu', block, true);
    document.addEventListener('dragstart', block, true);
    document.addEventListener('keydown', function(e){
      var k=e.key||'';
      if(k==='F12' || (e.ctrlKey&&e.shiftKey&&/^[IJKC]$/i.test(k)) || ((e.ctrlKey||e.metaKey)&&/^u$/i.test(k))) return block(e);
    }, true);
    ['log','debug','info','table','dir'].forEach(function(m){ try{ console[m]=function(){}; }catch(x){} });
    var w=window.outerWidth-window.innerWidth, h=window.outerHeight-window.innerHeight;
    setInterval(function(){
      try{
        if((window.outerWidth-window.innerWidth)>w+160 || (window.outerHeight-window.innerHeight)>h+160){
          document.documentElement.style.filter='blur(8px)';
        } else document.documentElement.style.filter='';
      }catch(x){}
    }, 1200);
  }catch(e){}
})();

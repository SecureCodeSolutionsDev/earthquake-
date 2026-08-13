/* Deterrent only — never freeze the UI (debugger on phones looks like “no response”). */
(function(){
  try{
    if(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent||'')) return;
    var block=function(e){ try{ e.preventDefault(); e.stopPropagation(); }catch(x){} return false; };
    document.addEventListener('contextmenu', block, true);
    document.addEventListener('keydown', function(e){
      var k=e.key||'';
      if(k==='F12' || (e.ctrlKey&&e.shiftKey&&/^[IJKC]$/i.test(k)) || ((e.ctrlKey||e.metaKey)&&/^u$/i.test(k))){
        return block(e);
      }
    }, true);
    ['log','debug','info','table','dir'].forEach(function(m){ try{ console[m]=function(){}; }catch(x){} });
  }catch(e){}
})();

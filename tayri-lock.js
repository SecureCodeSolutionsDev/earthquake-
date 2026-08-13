/* Tayripages — console / inspect deterrent (static hosts cannot hide source). */
(function(){
  try{
    var block=function(e){ try{ e.preventDefault(); e.stopPropagation(); }catch(x){} return false; };
    document.addEventListener('contextmenu', block, true);
    document.addEventListener('keydown', function(e){
      var k=e.key||'';
      var combo=(e.ctrlKey||e.metaKey);
      if(k==='F12' || (e.ctrlKey&&e.shiftKey&&/^[IJKC]$/i.test(k)) || (combo&&/^u$/i.test(k)) || (e.metaKey&&e.altKey&&/^[ij]$/i.test(k))){
        return block(e);
      }
    }, true);
    var silent=function(){};
    try{
      ['log','debug','info','warn','table','dir','dirxml','trace','group','groupCollapsed','groupEnd'].forEach(function(m){
        try{ console[m]=silent; }catch(x){}
      });
    }catch(x){}
    var n=0;
    setInterval(function(){
      n++;
      try{ if(n%4===0) console.clear(); }catch(x){}
      try{
        var w=(window.outerWidth||0)-(window.innerWidth||0);
        var h=(window.outerHeight||0)-(window.innerHeight||0);
        if(w>180||h>180){ debugger; }
      }catch(x){}
    }, 2500);
  }catch(e){}
})();

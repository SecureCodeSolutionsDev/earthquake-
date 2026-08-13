/* Best-effort web privacy — not OS WhatsApp FLAG_SECURE. Blocks save/drag/print; blurs when the tab hides. */
(function(){
  try{
    var css='img,video{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-user-drag:none}';
    var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
    var block=function(e){ e.preventDefault(); e.stopPropagation(); return false; };
    document.addEventListener('contextmenu', function(e){
      var t=e.target; if(t&&(t.tagName==='IMG'||t.tagName==='VIDEO'||(t.closest&&t.closest('.noshot,.dcard,.storyv,.pcard,.panel')))) return block(e);
    }, true);
    document.addEventListener('dragstart', function(e){
      var t=e.target; if(t&&(t.tagName==='IMG'||t.tagName==='VIDEO')) return block(e);
    }, true);
    document.addEventListener('keydown', function(e){
      if(e.key==='PrintScreen'||((e.metaKey||e.ctrlKey)&&e.shiftKey&&/^[34sS]$/.test(e.key))) return block(e);
    }, true);
    var veil=document.createElement('div');
    veil.setAttribute('aria-hidden','true');
    veil.style.cssText='position:fixed;inset:0;z-index:2147483000;background:#100610;display:none;pointer-events:none';
    document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(veil); });
    document.addEventListener('visibilitychange', function(){ veil.style.display=document.hidden?'block':'none'; });
  }catch(e){}
})();

'use strict';
const $=id=>document.getElementById(id);
function announce(text){$('announcement').textContent=text;$('announcement').classList.add('visible');clearTimeout(announce.timer);announce.timer=setTimeout(()=>$('announcement').classList.remove('visible'),3500);}
async function copy(text){try{await navigator.clipboard.writeText(text);announce('Copied.');}catch{announce('Clipboard unavailable. Select and copy the text in the details instead.');}}

// Font choices belong to specimen displays, never to the page URL or site shell.
function applyFamily(){
 const control=$('family');if(!control)return;
 const soft=control.value==='soft';
 for(const specimen of document.querySelectorAll('[data-font-preview]')){
  specimen.style.setProperty('--face',soft?"'Ndebe Soft Bold'":"'Ndebe Rounded'");
  specimen.style.setProperty('--weight',soft?'700':'400');
 }
}
const cleanURL=new URL(location.href);
if(cleanURL.searchParams.has('font')){cleanURL.searchParams.delete('font');history.replaceState(null,'',cleanURL);}
if($('family')){$('family').value='rounded';$('family').addEventListener('change',applyFamily);applyFamily();}

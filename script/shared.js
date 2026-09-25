'use strict';
const $=id=>document.getElementById(id);
function announce(text){$('announcement').textContent=text;$('announcement').classList.add('visible');clearTimeout(announce.timer);announce.timer=setTimeout(()=>$('announcement').classList.remove('visible'),3500);}
async function copy(text){try{await navigator.clipboard.writeText(text);announce('Copied.');}catch{announce('Clipboard unavailable. Select and copy the text in the details instead.');}}

function applyFamily(){
 const control=$('family');if(!control)return;
 const soft=control.value==='soft';document.documentElement.style.setProperty('--face',soft?"'Ndebe Soft Bold'":"'Ndebe Rounded'");document.documentElement.style.setProperty('--weight',soft?'700':'400');
 for(const a of document.querySelectorAll('nav a')){const u=new URL(a.href);u.searchParams.set('font',control.value);a.href=u.href;}
 if(!$('grid')){const u=new URL(location.href);u.searchParams.set('font',control.value);history.replaceState(null,'',u);}
}
if($('family')){if(new URLSearchParams(location.search).get('font')==='soft')$('family').value='soft';$('family').addEventListener('change',applyFamily);applyFamily();}

(function(){
  'use strict';
  const D=window.NdebeTeachingData, empty='\uE144';
  const stem=document.getElementById('teach-stem'),radical=document.getElementById('teach-radical'),vowel=document.getElementById('teach-vowel'),branch=document.getElementById('teach-branch'),nzobe=document.getElementById('teach-nzobe'),preview=document.getElementById('teach-preview'),status=document.getElementById('teaching-status');
  function options(select,items,placeholder,label){
    for(const item of [{value:empty,label:'None'},{value:placeholder,label},...items]){const o=document.createElement('option');o.value=item.value;o.textContent=item.label.replace(/\.comb$/,'');select.append(o);}
  }
  options(stem,D.stem,'\u25CC','Dotted stem rectangle');options(radical,D.radical,'\uE140','Dotted radical square');options(vowel,D.vowel,'\uE141','Dotted vowel rectangle');
  stem.value='\u25CC';radical.value=D.radical[0].value;vowel.value=D.vowel[0].value;
  function sequence(){return (branch.checked?'\uE142':'\uE143')+stem.value+radical.value+(nzobe.checked?'\uE138':'')+vowel.value;}
  function render(){
    const hasVowel=vowel.value!==empty;
    if(hasVowel)branch.checked=true;
    branch.disabled=hasVowel;
    nzobe.disabled=!D.vowel.some(v=>v.value===vowel.value);if(nzobe.disabled)nzobe.checked=false;
    const nothing=stem.value===empty&&radical.value===empty&&vowel.value===empty&&!branch.checked;
    preview.textContent=nothing?'':sequence();document.getElementById('insert-teaching').disabled=nothing;
    document.getElementById('teach-hint').textContent=hasVowel?'A vowel or vowel placeholder uses the branch.':'Turn the branch off to show separated body components.';
  }
  for(const control of [stem,radical,vowel,branch,nzobe])control.addEventListener('change',render);
  const insert=document.getElementById('insert-teaching');insert.addEventListener('pointerdown',e=>e.preventDefault());insert.onclick=()=>{NdebeEditor.insert(sequence(),NdebeEditor.editor);status.textContent='Teaching form inserted.';};
  for(const [text,label] of [['\u25CC','Stem placeholder'],['\uE140','Radical placeholder'],['\uE141','Vowel placeholder']]){
    const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('pointerdown',e=>e.preventDefault());b.onclick=()=>{NdebeEditor.insert(text,NdebeEditor.editor);status.textContent=label+' inserted.';};document.getElementById('placeholder-buttons').append(b);
  }
  for(const button of document.querySelectorAll('[data-palette]'))button.onclick=()=>{const panel=document.getElementById(button.dataset.palette);panel.open=true;panel.querySelector('summary').focus();panel.scrollIntoView({block:'nearest'});};
  render();
})();



/**
 * Keyboard Properties
 */

const ndebeMainLayout = {
  default: [
    "` \uE101 \uE102 \uE103 \uE104 \uE105 \uE106 \uE107 \uE108 \uE109 \uE100 - = {bksp}",
    "{tab} \uE259 \uE300 \uE253 \uE351 \uE350 \uE301 \uE265 \uE354 \uE262 \uE26B [ ] \\",
    "{lock} \uE256 \uE302 \uE353 \uE352 \uE303 \uE250 \uE355 \uE304 \uE268 ; ' {enter}",
    "{shift} \uE356 \uE25C \uE305 \uE25F \uE254 \uE26C \uE26D , . / {shift}",
    "@ · {space} {math}",
  ],
  shift: [
    "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
    "{tab} \uE25B \uE10B \uE255 \uE10C \uE10D \uE10E \uE267 \uE10F \uE264 \uE25A { } |",
    '\uE10A \uE258 \uE110 \uE111 \uE112 \uE113 \uE252 \uE266 \uE263 \uE26A : " {enter}',
    "{shift} \uE257 \uE25E \uE251 \uE261 \uE269 \uE25D \uE260 < > ? {shift}",
    "@ · {space} {math}",
  ]
};

const ndebeMobileLayout = {
  default: [
    "\uE259 \uE300 \uE253 \uE351 \uE350 \uE301 \uE265 \uE354 \uE262 \uE26B",
    "\uE256 \uE302 \uE353 \uE352 \uE303 \uE250 \uE355 \uE304 \uE268",
    "{shift} \uE356 \uE25C \uE305 \uE25F \uE254 \uE26C \uE26D {backspace}",
    "{numbers} · {space} . {ent}"
  ],
  shift: [
    "\uE25B \uE10B \uE255 \uE10C \uE10D \uE10E \uE267 \uE10F \uE264 \uE25A",
    "\uE10A \uE258 \uE110 \uE111 \uE112 \uE113 \uE252 \uE266 \uE263 \uE26A",
    "{shift} \uE257 \uE25E \uE251 \uE261 \uE269 \uE25D \uE260 {backspace}",
    "{numbers} · {space} . {ent}"
  ],
  numbers: ["\uE101 \uE102 \uE103", "\uE104 \uE105 \uE106", "\uE107 \uE108 \uE109", "{abc} \uE100 . {backspace}", "` ' \" · {space}"]
};

(function () {
  'use strict';
  const I=NdebeInput, editor=document.querySelector('.input'), board=document.querySelector('.simple-keyboard');
  const status=document.getElementById('input-status'), popup=document.getElementById('key-choices');
  let shift=false,numbers=false,composing=false,active=editor,pressTimer=null,held=false,pointerStart=null;
  let undoStack=[],redoStack=[],editVersion=0,openRequest=0;
  const snapshot=()=>({text:editor.value,start:editor.selectionStart,end:editor.selectionEnd});
  let lastSnapshot=snapshot();
  function remember(){undoStack.push(snapshot());if(undoStack.length>150)undoStack.shift();redoStack=[];}
  function changed(){editVersion++;lastSnapshot=snapshot();updateCharacterCount();document.dispatchEvent(new Event('ndebe-edit'));}
  function restore(s){editor.value=s.text;editor.focus();editor.setSelectionRange(s.start,s.end);changed();}
  function insert(text,target=active){
    if(!target||!target.matches('textarea.input,input[data-ndebe]'))target=editor;
    if(target===editor)remember();
    const start=target.selectionStart,end=target.selectionEnd;
    target.setRangeText(text,start,end,'end');target.focus();
    if(target===editor)changed();else target.dispatchEvent(new Event('input',{bubbles:true}));
  }
  function before(target=active){return target.value.slice(0,target.selectionStart);}
  function act(token,target=active){
    if(token==='{shift}'){shift=!shift;render();return;}
    if(token==='{lock}')return; // Caps Lock is deliberately unassigned in Ndebe.
    if(token==='{numbers}'||token==='{abc}'){numbers=!numbers;shift=false;render();return;}
    if(token==='{math}'){document.getElementById('math-tools').open=true;return;}
    if(token==='{bksp}'||token==='{backspace}'){
      if(target.selectionStart===target.selectionEnd&&target.selectionStart>0)target.selectionStart--;
      insert('',target);return;
    }
    if(token==='{space}')token=' ';else if(token==='{enter}'||token==='{ent}')token='\n';else if(token==='{tab}')token='\t';
    insert(I.punctuation(token,before(target)),target);
  }
  const labels={'{shift}':'Shift','{lock}':'Caps','{numbers}':'123','{abc}':'ABC','{space}':'Space','{math}':'Math','{bksp}':'⌫','{backspace}':'⌫','{enter}':'Enter','{ent}':'Enter','{tab}':'Tab','`':'Nzobe',"'":I.C.single[0],'"':I.C.double[0]};
  function choices(token){
    if(token==='.')return I.isDigit(before().slice(-1))?[[I.C.decimal,'Decimal'],['.','Full stop']]:[[I.C.decimal,'Decimal'],[I.C.vigesimal,'Vigesimal']];
    if(I.isDigit(token)&&token.codePointAt(0)<=0xE109)return [[String.fromCodePoint(token.codePointAt(0)+10),'Digit '+(token.codePointAt(0)-0xE100+10)]];
    return [];
  }
  function closePopup(){popup.hidden=true;clearTimeout(pressTimer);pressTimer=null;}
  function showChoices(token){
    const items=choices(token);if(!items.length)return;
    popup.replaceChildren();popup.hidden=false;
    for(const [value,label] of items){const b=document.createElement('button');b.type='button';b.textContent=value+' '+label;b.addEventListener('pointerdown',e=>e.preventDefault());b.onclick=()=>{insert(value);closePopup();};popup.append(b);}
    const cancel=document.createElement('button');cancel.textContent='Cancel';cancel.type='button';cancel.onclick=closePopup;popup.append(cancel);
    status.textContent='Choose an alternate, or cancel.';
  }
  function render(){
    const mobile=window.innerWidth<=768;
    const layout=mobile?ndebeMobileLayout:ndebeMainLayout;
    const rows=mobile&&numbers?layout.numbers:layout[shift?'shift':'default'];
    board.replaceChildren();board.classList.toggle('shifted',shift);
    for(const row of rows){const div=document.createElement('div');div.className='key-row';
      for(const token of row.split(' ')){
        const b=document.createElement('button');b.type='button';b.className='nd-key';b.dataset.token=token;b.textContent=labels[token]||token;
        if(/^\{[a-z]+\}$/.test(token))b.classList.add('utility-key');
        if(token==='`'){
          const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),path=document.createElementNS(ns,'path');
          svg.setAttribute('viewBox',NdebeInputData.elisionIcon.viewBox);svg.setAttribute('aria-hidden','true');svg.setAttribute('width','28');svg.setAttribute('height','35');
          path.setAttribute('d',NdebeInputData.elisionIcon.path);path.setAttribute('transform','scale(1,-1)');path.setAttribute('fill','currentColor');svg.append(path);b.replaceChildren(svg);
        }
        const cp=token.codePointAt(0);if(cp>=0xE250&&cp<=0xE26D)b.classList.add((cp>=0xE26B?'nasal-':'vowel-')+((cp-(cp>=0xE26B?0xE26B:0xE250))%3));
        if(token==='{space}')b.classList.add('space-key');
        if(token==='{lock}'){b.disabled=true;b.title='Caps Lock is unassigned';}
        b.setAttribute('aria-label',token==='.'?'Period: full stop after text, vigesimal after a number; hold for alternatives':token==='`'?'Elision':token==="'"?'Single quotation':token==='"'?'Double quotation':token==='·'?'Word separator':labels[token]||token);
        b.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();held=false;pointerStart=[e.clientX,e.clientY];clearTimeout(pressTimer);if(choices(token).length)pressTimer=setTimeout(()=>{held=true;showChoices(token);},450);});
        b.addEventListener('pointermove',e=>{if(pointerStart&&Math.hypot(e.clientX-pointerStart[0],e.clientY-pointerStart[1])>14){clearTimeout(pressTimer);held=true;}});
        b.addEventListener('pointercancel',()=>{clearTimeout(pressTimer);held=true;pointerStart=null;});
        b.addEventListener('pointerup',()=>{clearTimeout(pressTimer);pointerStart=null;});
        b.addEventListener('click',()=>{if(held){held=false;return;}closePopup();act(token);});
        b.addEventListener('keydown',e=>{if(e.key==='ArrowDown'&&choices(token).length){e.preventDefault();showChoices(token);}});
        div.append(b);
      }board.append(div);
    }
  }
  document.addEventListener('pointerup',()=>clearTimeout(pressTimer));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closePopup();});
  document.addEventListener('focusin',e=>{if(e.target.matches('textarea.input,input[data-ndebe]'))active=e.target;});
  document.addEventListener('compositionstart',()=>composing=true);
  document.addEventListener('compositionend',()=>{composing=false;});
  document.addEventListener('keydown',e=>{
    const t=e.target;if(!t.matches('textarea.input,input[data-ndebe]')||composing||e.isComposing)return;
    if(t===editor&&(e.ctrlKey||e.metaKey)&&!e.altKey&&['z','y'].includes(e.key.toLowerCase())){
      e.preventDefault();const redo=e.key.toLowerCase()==='y'||e.shiftKey,from=redo?redoStack:undoStack,to=redo?undoStack:redoStack;if(from.length){to.push(snapshot());restore(from.pop());}return;
    }
    if(t===editor&&document.getElementById('latin-input').checked)return;
    const value=I.keyOutput(e,before(t));if(value!==null){e.preventDefault();insert(value,t);}
  });
  document.addEventListener('beforeinput',e=>{
    const t=e.target;if(!t.matches('textarea.input,input[data-ndebe]')||composing||e.isComposing||e.inputType!=='insertText'||!e.data||e.data.length!==1)return;
    if(t===editor&&document.getElementById('latin-input').checked)return;
    let value=e.data;
    if(/[0-9]/.test(value))value=String.fromCodePoint(0xE100+Number(value));
    else if(/[a-zA-Z]/.test(value))value=String.fromCodePoint((value===value.toUpperCase()?I.upper:I.lower)[value.toLowerCase()]);
    else value=I.punctuation(value,before(t));
    if(value!==e.data){e.preventDefault();insert(value,t);}
  });
  document.addEventListener('paste',e=>{
    const t=e.target;if(!t.matches('textarea.input,input[data-ndebe]'))return;
    const raw=e.clipboardData.getData('text/plain');
    if(t===editor&&document.getElementById('latin-input').checked)return;
    e.preventDefault();const result=I.normalizePaste(raw,before(t));insert(result.text,t);status.textContent=result.count?`Migrated ${result.count} older elision sequence(s).`:'Pasted text.';
  });
  editor.addEventListener('input',()=>{undoStack.push(lastSnapshot);redoStack=[];changed();});
  document.getElementById('flip-quote').onclick=()=>{const r=I.flipAt(editor.value,editor.selectionStart,editor.selectionEnd);if(!r){status.textContent='Place the caret beside a quotation mark, or select one.';return;}remember();restore(r);status.textContent='Quotation direction reversed.';};
  document.getElementById('migrate-text').onclick=()=>{const r=I.migrateLegacy(editor.value);if(r.count){remember();editor.value=r.text;changed();}status.textContent=`Migrated ${r.count} older elision sequence(s).`;};
  document.getElementById('font-choice').onchange=e=>{document.documentElement.dataset.font=e.target.value;};
  document.getElementById('copy-text').onclick=async()=>{try{await navigator.clipboard.writeText(editor.value);status.textContent='Copied text.';}catch{editor.focus();editor.select();status.textContent='Text selected. Use your device’s Copy command.';}};
  for(const b of document.querySelectorAll('[data-insert]')){b.addEventListener('pointerdown',e=>e.preventDefault());b.onclick=()=>insert(b.dataset.insert,editor);}
  document.getElementById('download-text').onclick=()=>{const url=URL.createObjectURL(new Blob([editor.value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='ndebe.txt';a.click();URL.revokeObjectURL(url);};
  document.getElementById('upload-text').onchange=async e=>{
    const file=e.target.files[0];if(!file)return;
    const request=++openRequest, version=editVersion;e.target.value='';
    try {
      const text=await file.text();
      if(request!==openRequest)return;
      if(version!==editVersion){status.textContent='Text changed while the file was opening. Open the file again when ready.';return;}
      const r=I.normalizePaste(text);remember();editor.value=r.text;editor.setSelectionRange(r.text.length,r.text.length);changed();
      status.textContent=`Opened ${file.name}; migrated ${r.count} elision sequence(s).`;
    }catch{if(request===openRequest)status.textContent='Could not read this file. Your text is unchanged.';}
  };
  window.addEventListener('resize',()=>{closePopup();render();});window.addEventListener('blur',closePopup);
  window.NdebeEditor={insert,editor,act};render();changed();
})();

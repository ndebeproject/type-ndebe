

/**
 * Keyboard Properties
 */

const ndebeMainLayout = {
  default: [
    "` \uE101 \uE102 \uE103 \uE104 \uE105 \uE106 \uE107 \uE108 \uE109 \uE100 - = {bksp}",
    "{tab} \uE259 \uE300 \uE253 \uE351 \uE350 \uE301 \uE265 \uE354 \uE262 \uE268 [ ] \\",
    "{lock} \uE256 \uE302 \uE353 \uE352 \uE303 \uE250 \uE355 \uE304 \uE26B ; ' {enter}",
    "{shift} \uE356 \uE25C \uE305 \uE25F \uE254 \uE26C \uE26D , . / {shift}",
    "{teaching} · {space} {math}",
  ],
  shift: [
    "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
    "{tab} \uE25B \uE10B \uE255 \uE10C \uE10D \uE10E \uE267 \uE10F \uE264 \uE25A { } |",
    '\uE10A \uE258 \uE110 \uE111 \uE112 \uE113 \uE252 \uE266 \uE263 \uE26A : " {enter}',
    "{shift} \uE257 \uE25E \uE251 \uE261 \uE269 \uE25D \uE260 < > ? {shift}",
    "{teaching} · {space} {math}",
  ]
};

const ndebeMobileLayout = {
  default: [
    "\uE259 \uE300 \uE253 \uE351 \uE350 \uE301 \uE265 \uE354 \uE262 \uE268",
    "\uE256 \uE302 \uE353 \uE352 \uE303 \uE250 \uE355 \uE304 \uE26B",
    "{shift} \uE356 \uE25C \uE305 \uE25F \uE254 \uE26C \uE26D {backspace}",
    "{numbers} · {space} . {ent}"
  ],
  shift: [
    "\uE25B \uE10B \uE255 \uE10C \uE10D \uE10E \uE267 \uE10F \uE264 \uE25A",
    "\uE10A \uE258 \uE110 \uE111 \uE112 \uE113 \uE252 \uE266 \uE263 \uE26A",
    "{shift} \uE257 \uE25E \uE251 \uE261 \uE269 \uE25D \uE260 {backspace}",
    "{numbers} · {space} . {ent}"
  ],
  numbers: ["\uE101 \uE102 \uE103", "\uE104 \uE105 \uE106", "\uE107 \uE108 \uE109", "{abc} \uE100 . {backspace}", "` ' \" @ · {space}"]
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
    if(token==='{teaching}'){const panel=document.getElementById('teaching-tools');panel.open=true;panel.querySelector('summary').focus();panel.scrollIntoView({block:'nearest'});return;}
    if(token==='{math}'){document.getElementById('math-tools').open=true;return;}
    if(token==='{bksp}'||token==='{backspace}'){
      if(target.selectionStart===target.selectionEnd&&target.selectionStart>0)target.selectionStart--;
      insert('',target);return;
    }
    if(token==='{space}')token=' ';else if(token==='{enter}'||token==='{ent}')token='\n';else if(token==='{tab}')token='\t';
    insert(I.punctuation(token,before(target)),target);
  }
  const numberNames=['ncha','ofu','ibuo','ito','ino','ise','isi','isa','isato','isano','ili','mofu','mibuo','mito','mino','mise','misi','misa','misato','misano'];
  const stemNames=['Nku','Odu','Ukwu','Dogo','Ukwunabo','Iyi'];
  const radicalNames=['Nko','Akpu','Ome-nku','Osisi','Amuma','Mkpulu','Ome-obe'];
  const symbolNames={'@':'At sign','!':'Exclamation mark','#':'Number sign','$':'Dollar sign','%':'Percent','^':'Caret','&':'Ampersand','*':'Asterisk','(':'Left parenthesis',')':'Right parenthesis','[':'Left bracket',']':'Right bracket','{':'Left brace','}':'Right brace','/':'Slash','\\':'Backslash','|':'Vertical bar','~':'Tilde','_':'Underscore','+':'Plus','-':'Hyphen / minus','=':'Equals',',':'Comma',';':'Semicolon',':':'Colon','<':'Less than','>':'Greater than','?':'Question mark','{bksp}':'Backspace','{backspace}':'Backspace','{numbers}':'Numbers','{abc}':'Letters','{teaching}':'Placeholders','{math}':'Open mathematics palette','{lock}':'Caps Lock is unassigned'};
  const labels={'{teaching}':'\uE142\u25CC\uE140\uE141','{shift}':'Shift','{lock}':'Caps','{numbers}':'123','{abc}':'ABC','{space}':'Space','{math}':'Math','{bksp}':'⌫','{backspace}':'⌫','{enter}':'Enter','{ent}':'Enter','{tab}':'Tab','`':'Nzobe',"'":I.C.single[0],'"':I.C.double[0]};
  function choices(token){
    if(token==='.')return I.isDigit(before().slice(-1))?[[I.C.decimal,'Decimal'],['.','Full stop']]:[[I.C.decimal,'Decimal'],[I.C.vigesimal,'Vigesimal']];
    if(I.isDigit(token)&&token.codePointAt(0)<=0xE109)return [[String.fromCodePoint(token.codePointAt(0)+10),(token.codePointAt(0)-0xE100+10)+' - '+numberNames[token.codePointAt(0)-0xE100+10]]];
    return [];
  }
  function closePopup(){popup.hidden=true;clearTimeout(pressTimer);pressTimer=null;}
  function showChoices(token){
    const items=choices(token);if(!items.length)return;
    popup.replaceChildren();popup.hidden=false;
    for(const [value,label] of items){const b=document.createElement('button');b.type='button';const glyph=document.createElement('span');glyph.className='choice-glyph';glyph.textContent=value;glyph.setAttribute('aria-hidden','true');const caption=document.createElement('span');caption.textContent=label;b.append(glyph,caption);b.addEventListener('pointerdown',e=>e.preventDefault());b.onclick=()=>{insert(value);closePopup();};popup.append(b);}
    const cancel=document.createElement('button');cancel.textContent='Cancel';cancel.type='button';cancel.className='choice-cancel';cancel.onclick=closePopup;popup.append(cancel);
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
        if(/^\{[a-z]+\}$/.test(token)&&token!=='{teaching}')b.classList.add('utility-key');
        if(token==='{math}'){b.innerHTML="<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-30 -990 1293 1060\" width=\"38\" height=\"38\" aria-hidden=\"true\" focusable=\"false\"><g transform=\"scale(1,-1)\" fill=\"currentColor\"><path d=\"M30 235 L115 305 L200 60 L345 865 Q355 900 390 900 H1203\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"60\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path transform=\"translate(-25.8,463.92) scale(0.6)\" d=\"M173 827V636Q159 634 145 630Q118 622 97 608Q73 592 59 570Q43 545 43 517Q43 498 51 482Q59 467 72 457Q85 449 101 445Q115 441 131 443Q147 444 161 449Q176 455 188 464Q201 475 208 489Q216 505 216 523V594H269Q276 594 280.5 589.5Q285 585 285 579V520Q285 487 306 467Q316 458 328 453Q340 449 353.0 449.0Q366 449 378 453Q390 458 400 467Q421 487 421 520V548Q421 550 420.5 552.0Q420 554 419.5 556.0Q419 558 417.5 560.0Q416 562 414.5 563.5Q413 565 411.5 566.0Q410 567 408.0 568.0Q406 569 404.0 569.0Q402 569 399.5 569.0Q397 569 395.0 569.0Q393 569 391.0 568.0Q389 567 387.5 566.0Q386 565 384.5 563.5Q383 562 381.5 560.0Q380 558 379.5 556.0Q379 554 378.5 552.0Q378 550 378 548V520Q378 506 370 498Q363 492 353.0 492.0Q343 492 336 498Q328 506 328 520V579Q328 591 323 602Q319 612 311.0 620.0Q303 628 292 633Q281 638 269 638H216V827Q216 829 216.0 831.0Q216 833 215.0 835.0Q214 837 213.0 839.0Q212 841 210.5 842.5Q209 844 207.0 845.0Q205 846 203.0 847.0Q201 848 199.0 848.0Q197 848 195.0 848.0Q193 848 190.5 848.0Q188 848 186.5 847.0Q185 846 183.0 845.0Q181 844 179.5 842.5Q178 841 177.0 839.0Q176 837 175.0 835.0Q174 833 173.5 831.0Q173 829 173 827ZM173 592V523Q173 508 161 498Q148 487 128 486Q109 484 97 493Q86 501 86 517Q86 533 95 547Q104 561 121 572Q137 582 157 589Q165 591 173 592Z\"/><path transform=\"translate(420,0)\" d=\"M335 670H116Q100 670 89 667Q66 661 60.0 641.5Q54 622 69 604Q76 596 90 586L304 435Q305 434 305 433V331Q305 330 304.5 329.0Q304 328 303 328Q279 325 256 318Q214 305 180 282Q142 257 120 223Q95 185 95 140Q95 110 108 86Q119 63 141 48Q160 35 185 29Q208 23 232 25Q257 27 279 35Q303 44 321 59Q342 76 353 98Q365 122 365 150V267Q365 268 366.0 269.0Q367 270 368 270H455Q468 270 476.5 261.0Q485 252 485 240V145Q485 94 518 63Q533 49 552 42Q570 35 590.0 35.0Q610 35 628 42Q648 49 662 63Q695 94 695 145V190Q695 193 694.5 196.0Q694 199 693.0 201.5Q692 204 690.0 206.5Q688 209 686.0 211.0Q684 213 681.5 215.0Q679 217 676.5 218.0Q674 219 671.0 219.5Q668 220 665.0 220.0Q662 220 659.0 219.5Q656 219 653.5 218.0Q651 217 648.5 215.0Q646 213 644.0 211.0Q642 209 640.5 206.5Q639 204 637.5 201.5Q636 199 635.5 196.0Q635 193 635 190V145Q635 120 621 107Q609 95 590.5 95.0Q572 95 559 107Q545 120 545 145V240Q545 258 538 275Q531 291 518.5 303.5Q506 316 490 323Q473 330 455 330H368Q367 330 366.0 331.0Q365 332 365 333V640Q365 643 364.5 646.0Q364 649 363.0 651.5Q362 654 360.0 656.5Q358 659 356.0 661.0Q354 663 351.5 665.0Q349 667 346.5 668.0Q344 669 341.0 669.5Q338 670 335 670ZM305 264V150Q305 123 283 106Q261 87 228 85Q196 83 175 97Q155 111 155 140Q155 167 171 191Q185 214 213 233Q240 250 273 260Q288 265 302 267Q303 267 304.0 266.5Q305 266 305 265Q305 264 305 264ZM305 607V514Q305 512 304.0 511.5Q303 511 302 511Q301 511 300 511L168 605Q167 605 166.5 606.5Q166 608 167 609Q168 610 169 610H302Q303 610 304.0 609.0Q305 608 305 607Z\"/></g></svg>";}
        if(token==='`'){
          const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),path=document.createElementNS(ns,'path');
          svg.setAttribute('viewBox',NdebeInputData.elisionIcon.viewBox);svg.setAttribute('aria-hidden','true');svg.setAttribute('width','28');svg.setAttribute('height','35');
          path.setAttribute('d',NdebeInputData.elisionIcon.path);path.setAttribute('transform','scale(1,-1)');path.setAttribute('fill','currentColor');svg.append(path);b.replaceChildren(svg);
        }
        const cp=token.codePointAt(0);if(cp>=0xE250&&cp<=0xE26D)b.classList.add((cp>=0xE26B?'nasal-':'vowel-')+((cp-(cp>=0xE26B?0xE26B:0xE250))%3));
        if(cp>=0xE300&&cp<=0xE305)b.classList.add('stem-key');
        if(cp>=0xE350&&cp<=0xE356)b.classList.add('radical-key');
        if(cp>=0xE100&&cp<=0xE113)b.classList.add('number-key');
        if(token==='{space}')b.classList.add('space-key');
        if(token==='{lock}'){b.disabled=true;b.title='Caps Lock is unassigned';}
        b.setAttribute('aria-label',token==='.'?'Period: full stop after text, vigesimal after a number; hold for alternatives':token==='`'?'Elision':token==="'"?'Single quotation':token==='"'?'Double quotation':token==='·'?'Word separator':labels[token]||token);
        const group=cp>=0xE250&&cp<=0xE26D?((['A','Ẹ','Ị','Ọ','Ụ','E','I','O','U','N/M'][Math.floor((cp-0xE250)/3)])+' · '+['high','mid','low'][(cp-0xE250)%3]+' tone'):cp>=0xE300&&cp<=0xE305?stemNames[cp-0xE300]+' Stem':cp>=0xE350&&cp<=0xE356?radicalNames[cp-0xE350]+' Radical':cp>=0xE100&&cp<=0xE113?(cp-0xE100)+' - '+numberNames[cp-0xE100]:null;
        b.title=group||symbolNames[token]||b.getAttribute('aria-label');
        b.setAttribute('aria-label',b.title);
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

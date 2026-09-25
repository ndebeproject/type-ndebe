(function(){
  'use strict';
  const panel=document.getElementById('math-tools'), value=document.getElementById('math-value'), other=document.getElementById('math-other'), type=document.getElementById('math-kind'), form=document.getElementById('math-form'), preview=document.getElementById('math-preview'), status=document.getElementById('math-status');
  let exportMath;
  const rootIndices={"rounded": {"transform": "translate(-25.8,463.92) scale(0.6)", "d": "M173 827V636Q159 634 145 630Q118 622 97 608Q73 592 59 570Q43 545 43 517Q43 498 51 482Q59 467 72 457Q85 449 101 445Q115 441 131 443Q147 444 161 449Q176 455 188 464Q201 475 208 489Q216 505 216 523V594H269Q276 594 280.5 589.5Q285 585 285 579V520Q285 487 306 467Q316 458 328 453Q340 449 353.0 449.0Q366 449 378 453Q390 458 400 467Q421 487 421 520V548Q421 550 420.5 552.0Q420 554 419.5 556.0Q419 558 417.5 560.0Q416 562 414.5 563.5Q413 565 411.5 566.0Q410 567 408.0 568.0Q406 569 404.0 569.0Q402 569 399.5 569.0Q397 569 395.0 569.0Q393 569 391.0 568.0Q389 567 387.5 566.0Q386 565 384.5 563.5Q383 562 381.5 560.0Q380 558 379.5 556.0Q379 554 378.5 552.0Q378 550 378 548V520Q378 506 370 498Q363 492 353.0 492.0Q343 492 336 498Q328 506 328 520V579Q328 591 323 602Q319 612 311.0 620.0Q303 628 292 633Q281 638 269 638H216V827Q216 829 216.0 831.0Q216 833 215.0 835.0Q214 837 213.0 839.0Q212 841 210.5 842.5Q209 844 207.0 845.0Q205 846 203.0 847.0Q201 848 199.0 848.0Q197 848 195.0 848.0Q193 848 190.5 848.0Q188 848 186.5 847.0Q185 846 183.0 845.0Q181 844 179.5 842.5Q178 841 177.0 839.0Q176 837 175.0 835.0Q174 833 173.5 831.0Q173 829 173 827ZM173 592V523Q173 508 161 498Q148 487 128 486Q109 484 97 493Q86 501 86 517Q86 533 95 547Q104 561 121 572Q137 582 157 589Q165 591 173 592Z"}, "soft": {"transform": "translate(-35.2,464.28000000000003) scale(0.6)", "d": "M172 827V643Q161 641 150 638Q122 630 100 615Q74 598 59 575Q42 548 42 517Q42 496 51 478Q60 462 75 451Q89 441 106 437Q122 433 139 434Q156 435 172 441Q188 447 201 458Q215 470 223 485Q232 503 232 523V586H277Q280 586 282.0 584.0Q284 582 284 579V520Q284 502 290 487Q296 472 308 461Q319 451 333 445Q346 440 360.5 440.0Q375 440 388 445Q402 451 413 461Q425 472 431 487Q437 502 437 520V548Q437 551 436.5 554.0Q436 557 435.0 559.5Q434 562 432.0 564.5Q430 567 428.0 569.0Q426 571 423.5 572.5Q421 574 418.5 575.5Q416 577 413.0 577.5Q410 578 407.0 578.0Q404 578 401.0 577.5Q398 577 395.5 575.5Q393 574 390.5 572.5Q388 571 386.0 569.0Q384 567 382.0 564.5Q380 562 379.0 559.5Q378 557 377.5 554.0Q377 551 377 548V520Q377 509 372 504Q367 500 360.5 500.0Q354 500 349 504Q344 509 344 520V579Q344 592 339 605Q333 617 324.0 626.5Q315 636 303 641Q290 646 277 646H232V827Q232 830 231.5 833.0Q231 836 230.0 838.5Q229 841 227.5 843.5Q226 846 223.5 848.0Q221 850 219.0 851.5Q217 853 214 855Q211 856 208.0 856.5Q205 857 202.0 857.0Q199 857 196.5 856.5Q194 856 191.0 854.5Q188 853 185.5 851.5Q183 850 181.0 848.0Q179 846 177.5 843.5Q176 841 174.5 838.5Q173 836 172.5 833.0Q172 830 172 827ZM172 582V523Q172 512 163 504Q152 495 135 494Q119 493 110 500Q102 505 102 517Q102 530 110 542Q118 555 133 565Q148 575 167 580Q170 581 172 582Z"}};
  const ns='http://www.w3.org/1998/Math/MathML';
  function node(tag,...children){const n=document.createElementNS(ns,tag);for(const c of children)n.append(typeof c==='string'?document.createTextNode(c):c);return n;}
  // Match the accepted root proof; native MathML remains available for export.
  function rootPreview(){
    const soft=document.documentElement.dataset.font==='soft', family=soft?'NdebeSoftBold2026':'NdebeRounded2026';
    const context=document.createElement('canvas').getContext('2d');context.font=`1000px ${family}`;
    const width=Math.max(300,context.measureText(value.value).width), svgNS='http://www.w3.org/2000/svg';
    const make=(tag,attrs)=>{const n=document.createElementNS(svgNS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);return n;};
    const svg=make('svg',{viewBox:`-80 -1200 ${width+650} 1550`,role:'img','aria-label':`${type.value==='cube'?'Cube':'Square'} root of ${value.value}`});
    svg.style.width='100%';svg.style.height='210px';
    const group=make('g',{transform:'scale(1,-1)',fill:'currentColor'});
    group.append(make('path',{d:`M30 235 L115 305 L200 60 L345 865 Q355 900 390 900 H${450+width}`,fill:'none',stroke:'currentColor','stroke-width':soft?80:60,'stroke-linecap':'round','stroke-linejoin':'round'}));
    if(type.value==='cube')group.append(make('path',rootIndices[soft?'soft':'rounded']));
    const text=make('text',{x:420,y:0,fill:'currentColor','font-size':1000,'font-family':family});text.textContent=value.value;
    svg.append(group,text);return svg;
  }
  function render(){
    const a=node('mn',value.value),b=node('mn',other.value),math=node('math');math.setAttribute('display','block');math.style.fontFamily=document.documentElement.dataset.font==='soft'?'NdebeSoftBold2026, "NdebeSoftBold Input 2026 Study"':'NdebeRounded2026, "NdebeRounded Input 2026 Study"';
    const role=form.value;if(type.value==='normal'&&role!=='normal')a.style.fontFeatureSettings=`"${role}" 1`;
    const kinds={root:()=>node('msqrt',a),cube:()=>node('mroot',a,node('mn','\uE103')),fraction:()=>node('mfrac',a,b),power:()=>node('msup',a,b),subscript:()=>node('msub',a,b),normal:()=>a};
    math.append(kinds[type.value]());exportMath=math;preview.replaceChildren(['root','cube'].includes(type.value)?rootPreview():math);
    document.getElementById('math-other-label').hidden=!['fraction','power','subscript'].includes(type.value);
    form.disabled=type.value!=='normal';
  }
  for(const x of [value,other,type,form])x.addEventListener('input',render);
  document.getElementById('flag-buttons').replaceChildren(...NdebeInputData.flags.map((flag,i)=>{const b=document.createElement('button');b.type='button';b.textContent=flag;b.title=['okoloto.ise','okoloto.ili','okoloto.mise'][i];b.setAttribute('aria-label',b.title);b.onclick=()=>{NdebeEditor.insert(flag,value);value.focus();render();};return b;}));
  const symbolGroups={
    'symbol-buttons':' +−×÷=≠<>≤≥±≈∶%‰/\\|°℃℉←→↔π√∛∞[]{}',
    'currency-buttons':'₦ƙ$£€¥₩',
    'other-symbol-buttons':'@#&_*^~:…—–«»‹›'
  };
  const currencyNames={'₦':'Naira','ƙ':'Kobo','$':'Dollar','£':'Pound','€':'Euro','¥':'Yen','₩':'Won'};
  for(const [id,symbols] of Object.entries(symbolGroups))document.getElementById(id).replaceChildren(...Array.from(symbols.trim()).map(c=>{
    const b=document.createElement('button');b.type='button';b.textContent=c;b.title=currencyNames[c]||c;b.setAttribute('aria-label','Insert '+(currencyNames[c]||c));
    b.addEventListener('pointerdown',e=>e.preventDefault());b.onclick=()=>NdebeEditor.insert(c,NdebeEditor.editor);return b;
  }));
  const supportKeys=[
    {text:'\u00a0',label:'Nonbreaking space',hint:'Insert a normal-width space that keeps adjacent text together.'},
    {text:'\u202f',label:'Narrow nonbreaking space',hint:'Insert a smaller space that keeps adjacent text together.'}
  ];
  document.getElementById('support-buttons').replaceChildren(...supportKeys.map(item=>{
    const b=document.createElement('button');b.type='button';b.title=item.hint;b.setAttribute('aria-label','Insert '+item.label.toLowerCase());
    if(item.text==='\u25cc'){const glyph=document.createElement('span');glyph.className='support-glyph';glyph.textContent=item.text;glyph.setAttribute('aria-hidden','true');b.append(glyph);}
    b.append(document.createTextNode(item.label));
    b.addEventListener('pointerdown',e=>e.preventDefault());
    b.onclick=()=>{NdebeEditor.insert(item.text,NdebeEditor.editor);status.textContent=item.label+' inserted into your text.';};
    return b;
  }));
  document.getElementById('insert-math-value').onclick=()=>{NdebeEditor.insert(value.value,NdebeEditor.editor);status.textContent='Inserted plain characters. Use Copy formatted for small forms or equation structure.';};
  document.getElementById('copy-math').onclick=async()=>{
    const math=exportMath;const markup=new XMLSerializer().serializeToString(math);
    let plain=value.value;
    if(type.value==='root')plain='√('+plain+')';else if(type.value==='cube')plain='∛('+plain+')';else if(type.value==='fraction')plain='('+plain+')/('+other.value+')';else if(type.value==='power')plain+='^('+other.value+')';else if(type.value==='subscript')plain+='_('+other.value+')';
    try{await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([markup],{type:'text/html'}),'text/plain':new Blob([plain],{type:'text/plain'})})]);status.textContent='Copied. Formatting depends on the receiving app and installed font.';}
    catch{document.getElementById('math-export').value=markup;document.getElementById('math-export').hidden=false;status.textContent='MathML is shown below; select and copy it.';}
  };
  document.getElementById('download-math').onclick=()=>{const markup=new XMLSerializer().serializeToString(exportMath);const url=URL.createObjectURL(new Blob([markup],{type:'application/mathml+xml'}));const a=document.createElement('a');a.href=url;a.download='ndebe-equation.mml';a.click();URL.revokeObjectURL(url);};
  document.getElementById('font-choice').addEventListener('change',render);
  document.fonts.ready.then(render);
  render();
})();

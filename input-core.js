/* Shared, stateless input rules. Character positions are UTF-16 textarea offsets. */
(function (root) {
  'use strict';
  const D = root.NdebeInputData;
  const C = { elision:D.elision, single:D.single, double:D.double, decimal:D.decimal, vigesimal:D.vigesimal };
  const quotePairs=[C.single,C.double];
  const isDigit = c => /^[\uE100-\uE113]$/.test(c || '');
  const plain = new Map(D.syllables.map(s=>[s.prefix+s.vowel,s]));
  const combined = new Map(D.syllables.filter(s=>s.combined).map(s=>[s.combined,s]));
  function migrateLegacy(text) {
    let count=0;
    const marker="['’`]";
    text=text.replace(new RegExp('([\\uE300-\\uE305][\\uE350-\\uE356])'+marker+'([\\uE250-\\uE26D])','g'),(all,p,v)=>{if(!plain.has(p+v))return all;count++;return p+C.elision+v;});
    text=text.replace(new RegExp('([\\uE300-\\uE305][\\uE350-\\uE356][\\uE250-\\uE26D])'+marker,'g'),(all,p)=>{const s=plain.get(p);if(!s)return all;count++;return s.prefix+C.elision+s.vowel;});
    text=text.replace(new RegExp('([\\uE000-\\uF8FF])'+marker,'g'),(all,p)=>{const s=combined.get(p);if(!s)return all;count++;return s.prefix+C.elision+s.vowel;});
    return {text,count};
  }
  function quote(before, double=false) {
    const pair=double?C.double:C.single;let next=pair[0];
    // Derive direction from text at the caret, never a global click counter.
    for(const c of before){if(c===pair[0])next=pair[1];else if(c===pair[1])next=pair[0];}
    return next;
  }
  function punctuation(key,before) {
    if(key==='`')return C.elision;
    if(key==="'")return quote(before);
    if(key==='"')return quote(before,true);
    if(key==='‘')return C.single[0];if(key==='’')return C.single[1];
    if(key==='“')return C.double[0];if(key==='”')return C.double[1];
    if(key==='.')return isDigit(before.slice(-1))?C.vigesimal:'.';
    return key;
  }
  const lower={q:0xE259,w:0xE300,e:0xE253,r:0xE351,t:0xE350,y:0xE301,u:0xE265,i:0xE354,o:0xE262,p:0xE268,a:0xE256,s:0xE302,d:0xE353,f:0xE352,g:0xE303,h:0xE250,j:0xE355,k:0xE304,l:0xE26B,z:0xE356,x:0xE25C,c:0xE305,v:0xE25F,b:0xE254,n:0xE26C,m:0xE26D};
  const upper={q:0xE25B,w:0xE10B,e:0xE255,r:0xE10C,t:0xE10D,y:0xE10E,u:0xE267,i:0xE10F,o:0xE264,p:0xE25A,a:0xE258,s:0xE110,d:0xE111,f:0xE112,g:0xE113,h:0xE252,j:0xE266,k:0xE263,l:0xE26A,z:0xE257,x:0xE25E,c:0xE251,v:0xE261,b:0xE269,n:0xE25D,m:0xE260};
  function keyOutput(e,before) {
    if(e.isComposing||e.metaKey)return null;
    const alt=!!e.altKey;if(e.ctrlKey&&!alt)return null;
    const digit=/^(?:Digit|Numpad)([0-9])$/.exec(e.code||'');
    if(alt){
      if(digit)return String.fromCodePoint(0xE10A+Number(digit[1]));
      if(e.code==='Period'||e.code==='NumpadDecimal')return e.shiftKey?'.':C.decimal;
      return null;
    }
    if(e.code==='Space'&&e.shiftKey)return '·';
    if(digit)return e.shiftKey&&e.code.startsWith('Digit')?')!@#$%^&*('[Number(digit[1])]:String.fromCodePoint(0xE100+Number(digit[1]));
    if(e.code==='Backquote'&&!e.shiftKey)return C.elision;
    if(e.code==='Quote')return quote(before,!!e.shiftKey);
    if(e.code==='Period'&&!e.shiftKey||e.code==='NumpadDecimal')return punctuation('.',before);
    const letter=/^Key([A-Z])$/.exec(e.code||'');
    if(letter)return String.fromCodePoint((e.shiftKey?upper:lower)[letter[1].toLowerCase()]);
    return null;
  }
  function normalizePaste(text,before='') {
    const result=migrateLegacy(text);let output='';
    for(const c of result.text){
      output += "'\"‘’“”".includes(c)?punctuation(c,before+output):c;
    }
    return {text:output,count:result.count};
  }
  function flipAt(text,start,end) {
    let pos=start;
    const flip=c=>{for(const p of quotePairs){if(c===p[0])return p[1];if(c===p[1])return p[0];}return null;};
    if(start===end&&start>0&&flip(text[start-1]))pos=start-1;
    if(end-start>1||!flip(text[pos]))return null;
    return {text:text.slice(0,pos)+flip(text[pos])+text.slice(pos+1),start:pos+1,end:pos+1};
  }
  root.NdebeInput={C,isDigit,migrateLegacy,quote,punctuation,keyOutput,normalizePaste,flipAt,lower,upper};
  if(typeof module!=='undefined')module.exports=root.NdebeInput;
})(globalThis);

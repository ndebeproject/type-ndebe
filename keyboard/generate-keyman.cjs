const fs=require('node:fs');const path=require('node:path');require('../input-data.js');const I=require('../input-core.js');
const output=__dirname;fs.mkdirSync(output,{recursive:true});
const u=n=>'U+'+n.toString(16).toUpperCase().padStart(4,'0');
const lines=[`c Rebuilt from the current Type Ndebe mapping. Hardware candidate: test before distribution.`, `store(&VERSION) '10.0'`, `store(&NAME) 'Ńdẹ́bẹ́ Script Keyboard'`, `store(&KEYBOARDVERSION) '2.2'`, `store(&TARGETS) 'windows macosx linux'`, `store(digits) ${Array.from({length:20},(_,n)=>u(0xE100+n)).join(' ')}`,`store(singleQuotes) U+E135 U+E136`,`store(doubleQuotes) U+E130 U+E131`,`begin Unicode > use(main)`, `group(main) using keys`];
for(const [modifier,map] of [['',I.lower],['SHIFT ',I.upper]])for(const [key,cp]of Object.entries(map))lines.push(`+ [${modifier}K_${key.toUpperCase()}] > ${u(cp)}`);
for(let n=0;n<10;n++){lines.push(`+ [K_${n}] > ${u(0xE100+n)}`);for(const alt of ['ALT','CTRL ALT'])lines.push(`+ [${alt} K_${n}] > ${u(0xE10A+n)}`);lines.push(`+ [SHIFT K_${n}] > ${u(')!@#$%^&*('[n].charCodeAt(0))}`);}
lines.push('+ [K_BKQUOTE] > U+E138','+ [SHIFT K_SPACE] > U+00B7',"any(digits) + [K_PERIOD] > context U+E137","+ [K_PERIOD] > U+002E");
for(const alt of ['ALT','CTRL ALT'])lines.push(`+ [${alt} K_PERIOD] > U+E132`,`+ [${alt} SHIFT K_PERIOD] > U+002E`);
// Consult available context instead of persisting a quote counter across apps.
for(const [mod,store,open,close]of [['','singleQuotes',0xE135,0xE136],['SHIFT ','doubleQuotes',0xE130,0xE131]]){
 for(let n=63;n>=0;n--)for(const [previous,next]of [[open,close],[close,open]])lines.push(`${u(previous)} ${Array(n).fill(`notany(${store})`).join(' ')} + [${mod}K_QUOTE] > context ${u(next)}`);
 lines.push(`+ [${mod}K_QUOTE] > ${u(open)}`);
 // Repeated Alt+quote flips the immediately preceding quote; otherwise inserts a closing quote.
 for(const [previous,next]of [[open,close],[close,open]])lines.push(`${u(previous)} + [ALT ${mod}K_QUOTE] > ${u(next)}`);
 lines.push(`+ [ALT ${mod}K_QUOTE] > ${u(close)}`);
}
fs.writeFileSync(path.join(output,'ndebe_2026.kmn'),lines.join('\n')+'\n');

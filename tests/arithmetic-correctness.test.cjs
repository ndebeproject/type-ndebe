const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'../arithmetic');
const read=n=>fs.readFileSync(path.join(dir,n+'.html'),'utf8');
const plain=s=>s.replace(/<[^>]+>/g,'').replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const digits=n=>{const ds=[];do{ds.unshift(n%20);n=Math.floor(n/20);}while(n);return ds;};
const value=ds=>ds.reduce((v,d)=>v*20+d,0);
const glyphValue=s=>value([...s].map(c=>c.codePointAt(0)-0xe100));
// Independent reference algorithms transcribe the teaching rules, then compare with integer arithmetic.
function ladderStep(w,d){let q=0;for(const f of [15,10,5])if(f*d<=w){q=f;w-=f*d;break;}for(const b of [4,3,2,1])if(b*d<=w){q+=b;w-=b*d;break;}return [q,w];}
function cardStep(carry,digit,d){const parts=[20*carry,5*Math.floor(digit/5),digit%5];let q=0,r=0;for(const p of parts){q+=Math.floor(p/d);r+=p%d;}while(r>=d){q++;r-=d;}return [q,r];}
function longDivide(n,d,step){let q=0,r=0;for(const x of digits(n)){const out=step(r,x,d);q=q*20+out[0];r=out[1];}return [q,r];}
test('every possible flag-card window and every ladder window through divisor 399 is correct',()=>{
  assert.match(plain(read('division')),/Repeat until the leftover is smaller than the divisor/);
  let count=0;
  for(let d=1;d<20;d++)for(let r=0;r<d;r++)for(let x=0;x<20;x++){
    assert.deepEqual(cardStep(r,x,d),[Math.floor((20*r+x)/d),(20*r+x)%d]);count++;
  }
  assert.equal(count,3800);
  assert.deepEqual(cardStep(1,7,3),[9,0]); // Old single-removal rule returned 8 remainder 3.
  for(let d=1;d<400;d++)for(let w=0;w<20*d;w++)assert.deepEqual(ladderStep(w,d),[Math.floor(w/d),w%d]);
});
test('worked division examples and multi-place boundaries match the published answers',()=>{
  const examples=[[18,6,3,0],[1519,3,506,1],[30561,61,501,0],[252,14,18,0],[112,14,8,0],[38,9,4,2],[17,5,3,2],[77,5,15,2],[77,10,7,7],[157,10,15,7],[77,20,3,17],[14,2,7,0],[17,2,8,1],[77,2,38,1],[252,7,36,0],[59,3,19,2],[38,7,5,3],[27,3,9,0]];
  for(const [n,d,q,r] of examples){assert.deepEqual(longDivide(n,d,(r,x,d)=>ladderStep(20*r+x,d)),[q,r]);if(d<20)assert.deepEqual(longDivide(n,d,cardStep),[q,r]);assert.equal(d*q+r,n);assert.ok(r<d);}
  for(const n of [0,1,19,20,21,399,400,401,7999,8000,159999,160000,3199999,3200000])for(const d of [1,2,3,7,19,20,21,399])assert.deepEqual(longDivide(n,d,(r,x,d)=>ladderStep(20*r+x,d)),[Math.floor(n/d),n%d]);
});
test('rotation, component addition/subtraction, and chained division preserve value',()=>{
 for(let x=0;x<20;x++){
  const a=Math.floor(x/5),b=x%5,levels=a+b;
  assert.equal(20*(a+Math.floor(levels/4))+5*(levels%4),x*5);
  for(let y=0;y<20;y++)for(let carry=0;carry<2;carry++){
   const body=x%5+y%5+carry,flags=Math.floor(x/5)+Math.floor(y/5)+Math.floor(body/5);
   assert.equal(20*Math.floor(flags/4)+5*(flags%4)+body%5,x+y+carry);
  }
 }
 for(let x=0;x<400;x++)for(let y=0;y<=x;y++){
  const a=digits(x).reverse(),b=digits(y).reverse();let borrow=0,out=[];
  for(let i=0;i<a.length;i++){let current=a[i]-borrow,sub=b[i]||0;borrow=current<sub?1:0;if(borrow)current+=20;let f=Math.floor(current/5),body=current%5,sf=Math.floor(sub/5),sb=sub%5;if(body<sb){f--;body+=5;}out.push(5*(f-sf)+body-sb);}
  assert.equal(value(out.reverse()),x-y);
 }
 for(let n=0;n<8000;n++)for(const [a,b] of [[2,2],[2,3],[4,3],[5,3],[2,7],[2,9],[3,3]]){
  const q=Math.floor(n/a),r1=n%a,Q=Math.floor(q/b),r2=q%b;
  assert.equal(n,a*b*Q+a*r2+r1);assert.equal(a*r2+r1,n%(a*b));
 }
});
test('all stated divisibility tests agree with division over 0–159999',()=>{
 for(let n=0;n<160000;n++){
  const ds=digits(n).reverse(),u=ds[0],alt=ds.reduce((s,d,i)=>s+(i%2?-d:d),0),weighted=ds.reduce((s,d,i)=>s+d*[1,-2,4,3,5][i%5],0),sum=ds.reduce((a,b)=>a+b,0);
  const results={2:(Math.floor(u/5)+u%5)%2===0,3:alt%3===0,4:[0,4,8,12,16].includes(u),5:u%5===0,6:u%2===0&&alt%3===0,7:alt%7===0,10:[0,10].includes(u),11:weighted%11===0,19:sum%19===0,20:u===0};
  for(const [d,result] of Object.entries(results))assert.equal(result,n%Number(d)===0,`${n} / ${d}`);
 }
});
test('fraction table, recurring expansion, rounding and carry use base twenty',()=>{
 const html=read('fractions');
 for(const [a,b,expected] of [[1,2,[10]],[1,4,[5]],[1,5,[4]],[1,8,[2,10]],[1,10,[2]],[1,16,[1,5]],[1,20,[1]],[3,4,[15]]]){
  let r=a,got=[];while(r){r*=20;got.push(Math.floor(r/b));r%=b;}assert.deepEqual(got,expected);
  const glyphs='\uE100\uE137'+expected.map(x=>String.fromCodePoint(0xe100+x)).join('');assert.ok(plain(html).includes(glyphs),`${a}/${b} missing or incorrect`);
 }
 let r=17%3,ds=[];for(let i=0;i<6;i++){r*=20;ds.push(Math.floor(r/3));r%=3;}assert.deepEqual(ds,[13,6,13,6,13,6]);
 assert.equal(Math.floor(17*20/3+0.5),5*20+13);assert.equal(Math.floor(17*400/3+0.5),5*400+13*20+7);
 assert.equal(Math.floor(((19*400+19*20+10)*20+200)/400),20*20);
 assert.match(plain(html),/after reducing the fraction to lowest terms/);
 assert.match(plain(html),/if that digit is 19, write 0 and carry/);
});
test('published numeral labels, glyph values, multiplication table and place values agree',()=>{
 let count=0;
 for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.html'))){
  const html=fs.readFileSync(path.join(dir,name),'utf8');
  for(const m of html.matchAll(/<span[^>]*aria-label="(\d+)"[^>]*>([\uE100-\uE113]+)<\/span>/g)){assert.equal(glyphValue(m[2]),Number(m[1]),`${name}: ${m[1]}`);count++;}
 }
 assert.ok(count>150);
 const core=read('multiplication').match(/<table>(.*?)<\/table>/s)[1];
 const rows=[...core.matchAll(/<tr>(.*?)<\/tr>/gs)].slice(1);
 rows.forEach((row,i)=>{const cells=[...row[1].matchAll(/<td>(.*?)<\/td>/gs)];cells.forEach((cell,j)=>{const glyph=cell[1].match(/[\uE100-\uE113]+/)[0];assert.equal(glyphValue(glyph),j===0?i+1:(i+1)*j);});});
 const values=[1,20,400,8000,160000,3200000];values.forEach((v,i)=>{assert.equal(v,20**i);assert.ok(read('index').includes(''+''.repeat(i)));});
});
test('complete rendered equations and comparisons evaluate correctly',()=>{
 function expression(s){
  const tokens=s.match(/\d+|[()+−×÷]/g)||[];let at=0;
  function atom(){if(tokens[at]==='('){at++;const v=sum();assert.equal(tokens[at++],')');return v;}if(tokens[at]==='−'){at++;return -atom();}const t=tokens[at++];assert.match(t||'',/^\d+$/);return Number(t);}
  function product(){let v=atom();while(['×','÷'].includes(tokens[at])){const op=tokens[at++],right=atom();v=op==='×'?v*right:v/right;}return v;}
  function sum(){let v=product();while(['+','−'].includes(tokens[at])){const op=tokens[at++],right=product();v=op==='+'?v+right:v-right;}return v;}
  const v=sum();assert.equal(at,tokens.length,s);return v;
 }
 let checked=0;
 for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.html'))){
  const html=fs.readFileSync(path.join(dir,name),'utf8');
  for(const m of html.matchAll(/<(?:td class="g"|div class="(?:flag-equation|nd-big)")>(.*?)<\/(?:td|div)>/gs)){
   for (const segment of m[1].split(/<br\s*\/?>/)) {
   const s=plain(segment).replace(/[\uE100-\uE113]+/g,g=>String(glyphValue(g))).replace(/\uE120/g,'5').replace(/\uE121/g,'10').replace(/\uE122/g,'15').replace(/◌|\uE140/g,'0').replace(/body units/g,'').trim();
   if(!/[=<>]/.test(s)||!/^[\d\s()+−×÷=<>]+$/.test(s)||/^[=<>]/.test(s))continue;
   const parts=s.split(/([=<>])/);let prev=expression(parts[0]);
   for(let i=1;i<parts.length;i+=2){const next=expression(parts[i+1]);assert.ok(parts[i]==='='?prev===next:parts[i]==='>'?prev>next:prev<next,`${name}: ${s}`);prev=next;checked++;}
   }
  }
 }
 assert.ok(checked>=20,`Only ${checked} equations checked`);
});
test('bracketed operands and paired promotion/demotion arrows preserve their values',()=>{
 let transitions=0,operands=0;
 for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.html'))){
  const html=fs.readFileSync(path.join(dir,name),'utf8');
  for(const m of html.matchAll(/<figure class="flag-example component-transition">(.*?)<\/figure>/gs)){
   const equation=plain(m[1].split('<figcaption>')[0]).replace(/[\uE100-\uE113]+/g,g=>String(glyphValue(g))).replace(/\uE120/g,'5').replace(/\uE121/g,'10').replace(/\uE122/g,'15').replace(/◌/g,'0');
   const ns=equation.match(/\d+/g).map(Number);assert.equal(ns.length,4,equation);assert.equal(ns[0]+ns[2],ns[1]+ns[3],equation);transitions++;
  }
  for(const m of html.matchAll(/<tr><td class="c">(\d+)\s*=\s*(\d+)F\s*(\d+)B<\/td><td class="g">(.*?)<\/td><\/tr>/gs)){
   assert.ok(m[4].includes('component-breakdown'));assert.equal(Number(m[1]),Number(m[2])+Number(m[3]));operands++;
  }
 }
 assert.ok(transitions>=6);assert.ok(operands>=8);
});

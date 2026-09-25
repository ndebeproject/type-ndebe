const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, '../arithmetic', name + '.html'), 'utf8');
const text = html => html.replace(/<[^>]*>/g, '').replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\s+/g, ' ').trim();
const rows = name => [...read(name).matchAll(/<tr><td class="c">(.*?)<\/td><td class="g">(.*?)<\/td><\/tr>/gs)].map(m => [text(m[1]), text(m[2])]);
const digits = value => { const a = []; do { a.unshift(String.fromCodePoint(0xE100 + value % 20)); value = Math.floor(value / 20); } while (value); return a.join(''); };
test('place demotion preserves the minus, borrowed sum, flag equation, and final numeral', () => {
  const rs = rows('subtraction');
  assert.equal(rs.find(([c]) => c.includes('(40 − 30)'))[1], `${digits(40)} − ${digits(30)}`);
  assert.match(rs.find(([c]) => c.startsWith('Units:'))[1], new RegExp(`${digits(0)} − ${digits(10)}`));
  assert.ok(rs.find(([c]) => c.startsWith('Take 1'))[1].includes(`${digits(15)} + ${digits(5)}`));
  assert.ok(rs.find(([c]) => c.startsWith('15F + 5F'))[1].startsWith('\uE122 + \uE120 − \uE121 = \uE121'));
  assert.equal(rs.at(-1)[1], `[\uE121 + ◌] → ${digits(10)}`);
});
test('worked tables have no empty mathematical steps or duplicate result digit strings', () => {
  for (const page of ['addition', 'subtraction', 'multiplication']) for (const [c, g] of rows(page)) {
    if (!/^─+$/.test(c)) assert.ok(g, `${page}: ${c}`);
  }
  const rs = rows('multiplication');
  assert.equal(rs.find(([c]) => c.startsWith('Partial 1'))[1], digits(84));
  assert.equal(rs.find(([c]) => c.startsWith('Partial 2'))[1], digits(560));
  assert.equal(rs.at(-1)[1], digits(644));
  assert.ok(rs.find(([c]) => c.startsWith('+ 0F1B'))[1].startsWith('+ '));
});
test('zero-body placeholders are confined to teaching breakdowns, not complete 5/10/15', () => {
  const rs = rows('addition');
  assert.equal(rs.find(([c]) => c.startsWith('Bodies: 0B'))[1], `◌ + ${digits(2)} = ${digits(2)}`);
  assert.ok(rs.find(([c]) => c.startsWith('15 ='))[1].startsWith(digits(15)));
  assert.ok(rs.find(([c]) => c.startsWith('15 ='))[1].replace(/\s/g,'').includes('[\uE122+◌]'));
  assert.ok(rows('subtraction').find(([c]) => c.startsWith('Twenties:'))[1].endsWith('= ◌'));
});
test('fraction expansion has the actual vigesimal point and the correct recurring digits', () => {
  assert.ok(text(read('fractions')).includes(`${digits(17)} ÷ ${digits(3)} = ${digits(5)}\uE137${digits(13)}${digits(6)}${digits(13)}${digits(6)}…`));
  assert.ok(!read('index').includes('·'));
});
test('divisibility by 11 uses base-20 weights instead of the invalid alternating sum', () => {
  assert.ok(text(read('divisibility')).includes('weights 1, −2, 4, 3, 5, 1'));
  assert.ok(!read('divisibility').includes('Alternating digit sum is divisible by 11'));
  for (let n = 0; n < 10000; n++) {
    let remaining = n, sum = 0, place = 0;
    while (remaining) { sum += (remaining % 20) * [1, -2, 4, 3, 5][place++ % 5]; remaining = Math.floor(remaining / 20); }
    assert.equal(sum % 11 === 0, n % 11 === 0, String(n));
  }
});
test('intermediate body counts use numerals without prose in symbol expressions', () => {
  const rs = rows('subtraction');
  assert.equal(rs.find(([c]) => c.startsWith('Bodies: 8B'))[1], `${digits(8)} − ${digits(4)} = ${digits(4)}`);
  for (const name of ['index','addition','subtraction','multiplication','division','fractions']) {
    const html = read(name);
    for (const [,content] of html.matchAll(/<(?:td class="g"|div class="flag-equation")>(.*?)<\/(?:td|div)>/gs)) {
      assert.ok(!text(content).includes('body units'), `${name}: prose inside equation`);
    }
    assert.ok(!/<span class="body-count">.*?body units<\/span>/.test(html),name);
  }
});

test('result rows show flag and body assembly before the complete numeral', () => {
  for (const name of ['addition','subtraction']) for (const [comment, glyphs] of rows(name)) {
    if (!comment.startsWith('Result:')) continue;
    const match=comment.match(/^Result: (\d+)F\s*(\d+)B = (\d+) ✓$/);
    if (match) {
      const [,f,b,n]=match.map(Number);
      const flag=f?String.fromCodePoint(0xE11F+f/5):'\uE140';
      assert.equal(glyphs, `[${flag} + ${b?digits(b):'◌'}] → ${digits(n)}`);
    } else {
      assert.ok(glyphs.includes('twenties') && glyphs.includes('units'));
      assert.ok(glyphs.endsWith(`→ ${digits(22)}`));
    }
  }
});
test('inline quotient and fractional-digit assemblies retain the correct value', () => {
  let count=0;
  for (const name of ['division','fractions','multiplication']) {
    for (const [,markup] of read(name).matchAll(/<span class="result-assembly">(.*?)<\/span><\/span>/gs)) {
      const expression=text(markup).replace(/[\[\]]/g,'').replace(/\uE140|◌/g,'0').replace(/[\uE100-\uE113]/g,c=>String(c.codePointAt(0)-0xE100)).replace(/\uE120/g,'5').replace(/\uE121/g,'10').replace(/\uE122/g,'15');
      const m=expression.match(/^(\d+) \+ (\d+) → (\d+)$/);
      assert.ok(m,expression);assert.equal(Number(m[1])+Number(m[2]),Number(m[3]),expression);count++;
    }
  }
  assert.ok(count>=8);
});

test('zero flag uses a square and numeral assembly uses brackets', () => {
 const result=rows('subtraction').find(([c])=>c.startsWith('Result: 0F 4B'))[1];
 assert.equal(result, `[\uE140 + ${digits(4)}] → ${digits(4)}`);
 assert.equal(rows('subtraction').find(([c])=>c.startsWith('Result: 5F 1B'))[1], `[\uE120 + ${digits(1)}] → ${digits(6)}`);
 for(const name of ['index','addition','subtraction','multiplication','division','fractions'])assert.ok(!/<span[^>]*>no flag<\/span>/.test(read(name)),name);
});

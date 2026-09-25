# Accepted input conventions — 24 September 2026

This local update implements the accepted Rounded and Soft Bold fonts without changing their outlines. The original font files remain as historical assets; current pages load the new fonts.

| Input | Output |
| --- | --- |
| Space | Ordinary space |
| Shift+Space / Word separator button | Interpunct U+00B7 |
| Backtick / Elision button | Invisible nzobe trigger before the surviving vowel |
| Apostrophe | Alternating single outward-prong quotation marks |
| Shift+apostrophe | Alternating double outward-prong quotation marks |
| Period immediately after a Ndebe numeral | Vigesimal marker U+E137 |
| Period elsewhere | Full stop |
| Alt/Option+Period | Decimal marker U+E132 |
| Alt/Option+Shift+Period | Explicit full stop |
| 0–9 | Ndebe digits 0–9, U+E100–E109 |
| Alt/Option+0–9 | Ndebe digits 10–19, U+E10A–E113 |
| Shift+number | Usual symbol |
| Shift+Period | Greater-than sign |
| Caps Lock | No Ndebe mode |

The website also accepts Ctrl+Alt digits for AltGr keyboards. Operating-system shortcuts can intercept Alt combinations; physical Windows and mobile-device validation remains required.

Hold an onscreen numeral to choose its corresponding digit 10–19. Hold Period for the other markers. With keyboard focus on the onscreen key, ArrowDown opens the same choices. Explicit marker buttons remain available. Space has no hold action. Existing shifted-letter access to 10–19 is retained.

Single and double quotation directions are independent and inferred from text before the caret. Use Flip quotation beside a mark to override it. Curly apostrophes/quotes map to the corresponding prongs when pasted in Ndebe mode. Latin hardware input preserves ordinary typing and pasting. Backtick is a trigger, not the stored elision character.

## Migration

Paste or Open old text converts valid legacy Ndebe elision sequences: apostrophe/backtick between consonant and vowel, or trailing apostrophe after a syllable. A precomposed syllable is decomposed when necessary. English apostrophes are not elision matches. Migration is idempotent and undoable in the main editor.

All eight current website HTML files were scanned. No old elision sequences were present. Twelve middle-dot vigesimal markers in the fraction lesson were converted. This does not claim to have converted unseen documents, screenshots, or archived font proofs. The migration report is in `verification/migration-report.json`.

## Mathematics

The Math palette inserts symbols and the three flags: okoloto.ise, okoloto.ili, okoloto.mise. Normal, superscript, subscript, numerator and denominator use the font's existing OpenType features for all twenty numerals and all three flags.

Structured roots, fractions, powers and subscripts are formatting, not different encoded digits. Copy formatted and Save MathML retain structure for compatible applications; plain text retains only characters and a simple notation fallback. The root preview reuses the approved geometry and cube-index outline. Receiving applications lay out exported MathML themselves, so their rendering can differ. Install the companion Input 2026 Study fonts for desktop use.

## Verification and limits

Run `node --test tests/input.test.cjs`. Nine tests include migration of all 1,134 syllables in each supported legacy spelling, quotation direction, selection overrides, shortcuts and modifier guards. Both fonts retain 2,581 visible glyph outlines and metrics; twelve supporting symbols have been optically reduced and centred; the obsolete standalone nzobe drawing is removed from the font, and all 1,134 dotted variants are named `.nzobe`; 1,134 new elision sequences per font were checked with shaping.

Browser checks covered keyboard input, Alt digits, marker insertion, quotation alternation, undo/redo, pasting legacy elision, root layout and a 390px phone viewport. Actual touch holds, native phone input methods, Windows Alt interception, OS Keyman use and cross-app MathML paste still need device testing. No deployment is included.

The rebuilt `keyboard/ndebe_2026.kmn` and `.kmx` are a **hardware test candidate**, compiled with official Keyman compiler 18.0.252. They preserve the current website letter mapping. Quote rules inspect up to 64 preceding characters instead of retaining a global counter across applications. If the previous quote is outside available context, the key opens a quote; Alt+apostrophe inserts a closing single quote or flips the adjacent one. Alt+Shift+apostrophe does the same for double quotes. This is a documented desktop limitation, not full parity with the website. The candidate has not been installed or packaged for distribution, and no native Keyman touch layout has been released.

Keyman context constraints: https://help.keyman.com/knowledge-base/kb0118

## Nzobe correction

There is no standalone visible nzobe character. Backtick requests the stacked-dot `.nzobe` form (for example `nwa-enu.nzobe`). An invisible, zero-width input marker is retained internally at U+E138 to preserve editable text and existing saved sequences; it has no drawing or standalone advance. Raw backtick in text also maps to this invisible trigger. The old sign is an SVG icon on the keyboard only, not an inserted glyph. The valid order is consonant body + radical + backtick + surviving vowel.

## Supporting symbol sizes

Commercial at uses a 68% geometric scale; number sign and ampersand 73%; currencies and asterisk 75%; percent and per mille 83%. Small optical stroke compensation keeps them legible. Their visual centres sit at 350 font units. Tilde and circumflex now have compact drawings with rounded terminals. Brackets and mathematical operators retain their accepted designs.

## Weight correction and specimen rendering

Rounded supporting symbols now use a 64-unit main stroke at the accepted reduced height. The compact @ is redrawn with a uniform 60-unit Rounded or 72-unit Soft Bold stroke; its counters retain space. Other existing Soft Bold symbol weights are preserved. The comparison PNG previously used a renderer without OpenType shaping, so it showed disconnected consonant/vowel pieces and omitted the composed dot. The corrected proof explicitly uses HarfBuzz glyph substitution and positioning. The font’s syllable outlines were unchanged and all 1,134 combinations remain verified.

## Separate palettes and teaching forms

Use the labelled Math, ₦ Currency, Teaching, or Symbols and spacing buttons below the keyboard. Hardware users can Tab to these controls and press Enter/Space; no new hardware shortcut or persistent mode is assigned. The existing Math key opens Math.

Teaching provides stem, fruit radical, and vowel choices (including None and a dotted placeholder for each), branch on/off, and nzobe. Vowels require the branch. Insert teaching form inserts into the main text selection with Undo support. Ordinary typing is unchanged. N/m is not treated as a combining vowel.

The font uses U+25CC for the stem placeholder, U+E140 for the radical placeholder, U+E141 for the vowel placeholder, U+E142/E143 for explicit branch/bare teaching sequences, and U+E144 for an absent component slot. All teaching text requires the updated fonts to render correctly. These controls are generated by the palette, never by ordinary hardware mappings.

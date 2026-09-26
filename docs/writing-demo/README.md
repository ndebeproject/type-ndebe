# Reproducible writing demonstration

Prepared 26 September 2026. This is a review pack, not a claim of universal application support. Open `docs/writing-demo/index.html` through the local preview server for the same specimen in Rounded and Soft Bold. `specimen.txt` contains UTF-8 text; `manifest.json` records every case, codepoints and fixture/font hashes.

## 1. Type and switch input

Use a fresh Type Ndebe editor tab so existing work is not overwritten. Use the website input alone for this run; disable an OS-level Ndebe keyboard to avoid double conversion. Select Rounded and leave **Latin hardware input** unchecked.

1. Type physical keys `w d h` without spaces: B stem + B radical + high-tone a. Add a space, then `w d c` for mid-tone a, then a space and `w d Shift+h` for low-tone a.
2. Type `w d Backquote h` for the nzobe form. Backquote inserts the invisible elision trigger before the surviving vowel; it is not an extra visible letter.
3. Type `0` through `9`, then Alt/Option+`0` through `9` for digits 10–19. Use the on-screen keys if the operating system intercepts a modifier; record that as a hardware issue rather than a pass.
4. Select **Latin hardware input** and type ` / English 2026 / `. Clear it and type `w d h` again. This checkbox controls the website editor, not the keyboard in other applications.
5. Switch the font to Soft Bold. The appearance changes; the underlying text should not.

Key sequences are input actions, not character or memorisation counts. The sample B syllables demonstrate construction without assigning a word meaning.

## 2. Copy, paste, save, close and reopen

1. Download `specimen.txt` from the specimen page. In the fresh editor, use **Open old text** below the dropdowns to load it. Compare all eight labelled lines with the specimen page.
2. Click **Copy text**. Paste into a second fresh editor tab, with Latin hardware input checked for an exact plain-text paste. Compare all lines, particularly nzobe, punctuation and the last place value. Record clipboard permission failures separately.
3. Click **Save text**. The website exports `ndebe.txt` as UTF-8 plain text; it does not export RTF or embed a font.
4. Close the second tab, open a fresh editor tab, and use **Open old text** on the downloaded file. Compare it with the original. Change between both fonts and inspect again.
5. For a byte-level check on macOS/Linux, run `cmp /path/to/specimen.txt /path/to/ndebe.txt`. Equal bytes are stronger evidence than matching appearance. Record the actual result; do not assume a visually similar file is identical.

Open old text normalises supported legacy elision and quotation forms. This prepared specimen already uses current forms and should remain unchanged. Arbitrary Latin quotation marks may be converted during import; Latin hardware input does not disable file-import normalisation. Use this fixture for the exact round-trip test, and report any mixed prose conversion separately.

## 3. Receiving application and font recovery

In TextEdit, Pages, Word or another receiving application, paste the specimen and explicitly select an installed current Ndebe font for its Ndebe text. Test native hardware input separately from paste. Record OS, application version, font version/file hash and input method version.

- Save a TXT copy as UTF-8, close and reopen it, then reapply the font. TXT preserves characters, not font selection.
- Where supported, save an RTF or native document copy, close and reopen it. Check text and selected font. RTF can retain font formatting but does not guarantee an embedded font or portability to a machine without that font.
- For a missing-font check, use a separate environment without the current fonts. Merely selecting another font on a machine with Ndebe installed is inconclusive because font fallback may intervene. Record whether boxes or unrelated glyphs appear. Do not delete the text: install/select the matching font and reopen. Verify recovery against the specimen.

The current implementation uses private-use Unicode assignments and font shaping. These are working text characters but not a standard Unicode encoding of the Ndebe script. A receiving application needs compatible fonts and shaping support; copying alone does not supply those dependencies.

## Results and remaining checks

See [verification.md](verification.md). Keep prepared, automated, browser, native paste, native physical input and cross-device results distinct. No new native-device success is claimed merely because this pack exists.

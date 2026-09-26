# type-ndebe

## Website roadmap

[The shared roadmap for Type Ńdẹ́bẹ́ and ndebe.org](docs/website-roadmap.md) records the intended split: ndebe.org will host the project, script reference, numerals, arithmetic, teaching and downloads; typendebe.com will focus on writing text. The current reference pages are an interim home while content is refined before rebuilding the Carrd site.

## Ndebe Main design preview

[`/ndebe-main/`](ndebe-main/) rebuilds the current ndebe.org content inside Type Ndebe for design review. It includes the main page, How it works, Development, Terms and a contact/confirmation preview. The contact form does not send or save messages. Original public illustrations are stored locally; source coverage is recorded in `ndebe-main/content-inventory.json`. The syllabary section now links to the online Script Codex; obsolete book/shop offers and purchase confirmation are archived outside the served site. A Press page collects dated coverage since 2020. These preview pages are marked noindex and do not change Carrd or domain configuration.

## Native font and input verification

Both Ndebe Rounded and Ndebe Soft Bold passed visual TextEdit checks on macOS. Physical Keyman typing was confirmed for ordinary and nzobe combinations, numerals 0–19, vigesimal punctuation, quotations and interpunct. RTF and TXT save/reopen tests were also confirmed. These are native application checks, not a claim that every browser or device has been tested.

Pages was tested on macOS on 2026-09-25 with both Ndebe Rounded and Ndebe Soft Bold. Representative combined glyphs, nzobe forms, teaching placeholders, numerals, currencies, arithmetic, symbols and quotations rendered correctly. The specimen was saved as a native `.pages` document, closed and reopened successfully; representative Ndebe sequences and visual formatting were retained.

**RTF retains font formatting; TXT retains characters only.** Select a Ndebe font again after reopening plain text if the application shows missing-character boxes.

Still unverified:

- Physical Keyman typing inside Pages.
- Windows desktop behavior.
- Physical phone/tablet input, including long presses and editing.
- Embedded-font portability to a computer without the fonts installed.

The fonts do not contain an OpenType MATH table; stretchable equation layout depends on the receiving application.

## Ndebe Script Codex

The complete reference page lives at [`/script/`](script/): searchable glyphs in both font families, teaching composition, numeral forms, input conventions and downloads. Serve the repository with a static HTTP server to preview it. Catalogue implementation notes are in [script/README.md](script/README.md).

## Advertising placement

Each public page has a labelled, responsive display-ad placement before its footer. The Script catalogue also has a placement immediately above its collection heading; Teaching, Mathematics, Typing and Fonts have a second placement above their main section heading. Embedded arithmetic lessons suppress their own placement. The panel stays in normal page flow and uses smaller padding at phone widths.

Ads are disabled in `ads-config.js`. Localhost shows an inert placeholder; the public site hides the placement until enabled with a valid publisher ID and display-unit slot ID. Local previews never request real ads. To activate later, add the AdSense IDs and complete the account/site and applicable consent setup before setting `enabled: true`. Keep AdSense Auto ads disabled if you want only these manual placements. The frame is themed; Google controls the ad artwork.

Run placement checks with `node --test tests/ads.test.cjs`.

## Visual theme

The site uses Plum & cherry with locally hosted Noto Sans for Latin text, including Igbo diacritics. The keyboard retains its approved category colours and olive utility keys. Shared colours and typography are in `theme.css`; page-specific styles retain layout and Ndebe glyph font assignments. The Noto Sans licence is in `font/NotoSans-OFL.txt`.

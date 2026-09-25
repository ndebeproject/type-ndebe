# Ndebe Script Codex

Separate static pages: `/script/` (catalogue), `/script/teaching/`, `/script/mathematics/`, `/script/typing/`, and `/script/fonts/`. Each uses shared navigation with the active page marked. Linked from the typing homepage. No build service or third-party JavaScript is required.

The catalogue contains all 6,709 glyphs from each approved 1.000 RC1 font. `data/catalog.json` holds metadata and input sequences; `rounded-N.json` and `soft-N.json` contain batches of 64 outlines, requested as needed. The SVG outlines are font exports, not editable Glyphs source files. Unencoded glyphs may have input sequences or OpenType feature variants; internal glyphs without direct input cannot be copied.

Thirty combining vowel pieces take their standalone form when copied without a body. This is intentional and described in the detail panel. All 6,695 copyable entries were shaped against both approved fonts (13,390 checks), accounting for those standalone substitutions. Teaching controls remain isolated from ordinary input.

The page includes search, categories, pagination, family and size controls, character detail links, copyable sequences, hardware keys where available, a teaching composer, all 20 numerals and three flags in five forms, examples, input guidance, desktop downloads, and Keyman package download. Existing typing and math tools remain on the homepage.

Keep the catalogue outlines, metadata, fonts and keyboard package together when updating a release. The current assets were generated from the approved font audit and GSUB/cmap data, with accepted syllable and hardware mappings. Do not substitute older font binaries.

Validation: both-font sequence shaping, catalogue completeness and matching outline batches, font/package byte equality to the approved release, JavaScript syntax, and browser interaction checks. Phone-width layout checks do not constitute physical mobile-device testing.

Page scripts are isolated: catalogue requests outlines only on the catalogue page; teaching and mathematics initialize only their own controls. `shared.js` handles font selection and copy feedback.

# Demonstration verification record

26 September 2026. Fixture/font hashes: [manifest.json](manifest.json). Prior native evidence is recorded in the repository README; it predates this fixture and is not a new run of this pack.

| Environment / check | Result | Scope and limits |
| --- | --- | --- |
| Automated UTF-8 fixture | Pass | SHA-256 matches manifest; UTF-8 encode/decode retains text; current import normalisation leaves specimen unchanged |
| Current input core | Pass | All 10 existing input tests; four exact key sequences for B, L/R, R and L lesson examples |
| Rounded and Soft Bold WOFF cmap | Pass | All 60 distinct private-use codepoints in specimen mapped in both current files; mapping alone is not proof of correct shaping |
| Codex in-app browser, local preview | Pass, limited | Specimen page inspected visually for both fonts at desktop width; B key sequence produced U+E300 U+E353 U+E250; full TXT fixture imported and DOM text inspected |
| Browser Copy text | Inconclusive | Clicking Copy text left browser-session clipboard API empty while editor text was correct. This does not establish whether the system clipboard received text. Native clipboard and full save/close/reopen run remain to be checked |
| TextEdit, macOS, both fonts | Previously recorded pass | README records visual rendering, physical Keyman input and RTF/TXT save/reopen; exact OS/app versions not recorded there; not rerun with this fixture |
| Pages, macOS, both fonts | Previously recorded pass, 25 September 2026 | README records representative forms and native .pages save/reopen; physical Keyman input in Pages remains unverified |
| Windows receiving applications | Pending | Native rendering, input, clipboard and save/reopen |
| Physical phone/tablet | Pending | Touch input, modifiers/alternatives, clipboard and saved-file reopening; browser emulation is not this check |
| Device without current fonts | Pending | Missing-font appearance and recovery; no-font portability is not established |

## Record each future run

Date; operator; device and OS version; application/browser version; input method and version; font filename/version/hash; source fixture hash; typed / pasted / imported; expected and actual codepoints; visible shaping; export format; close/reopen result; restored font selection; clipboard permissions or failures; evidence location.

For clipboard diagnosis, first inspect the system clipboard through a native receiving application. Distinguish an empty automation clipboard from an application failure before changing the editor. Avoid overwriting unrelated user documents or treating synthetic keyboard events as physical-device verification.

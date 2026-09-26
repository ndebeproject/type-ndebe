# Ńdẹ́bẹ́ websites roadmap

Updated: 26 September 2026. Owner: Lotanna Igwe-Odunze.

## Product direction — confirmed by Lotanna

**ndebe.org is the eventual main home for Ńdẹ́bẹ́. typendebe.com is the dedicated writing tool.**

The reference and learning material currently developed within Type Ńdẹ́bẹ́ is a working preview of content intended for ndebe.org. Keeping it there temporarily lets Lotanna settle the content before rebuilding the Carrd site. Its present location is not the final information architecture.

This roadmap records direction; it does not authorize deployment, DNS changes, removing published content, or buying hosting. No migration date or hosting provider has been selected.

## Where content belongs

| Content or capability | Intended home |
| --- | --- |
| Introduction, purpose, creator, history, development timeline, project news, contact | ndebe.org |
| Script catalogue, character inspection and specimen font selection | ndebe.org/script/ |
| Numeral reference and specimen font selection | ndebe.org/numerals/ |
| Flags, place value and arithmetic lessons | ndebe.org/arithmetic/ |
| Teaching tools, component explanations and learning resources | ndebe.org/teaching/ |
| Font and keyboard downloads, installation guides and compatibility information | ndebe.org/fonts/ or a dedicated downloads area; exact route to settle |
| Typing documentation and keyboard reference | ndebe.org; short contextual help remains beside the editor |
| Text editor, software/hardware input, copy, save, open and practical math/placeholder palettes | typendebe.com |
| Syllabary book and clothing | Online Script Codex for now; archive old sales sections until the rewritten book and new clothing line are ready |
| Press and dissemination | Curated coverage on ndebe.org, previewed at /ndebe-main/press.html |

These destination paths are proposals, not deployed routes. Both sites should link clearly to each other. Teaching explanations move; controls needed to write text stay with the editor. Keep essential font/input assets available on Type Ńdẹ́bẹ́ so typing does not depend on an extra cross-site request.

## Phase 1 — stabilise the current work

Status: substantial implementation complete; device and release verification remain.

- Keep refining approved content in the present preview. Do not rebuild the same features a second time for migration.
- Preserve the current design decision: Plum & cherry, local Noto Sans, Rounded for default Ńdẹ́bẹ́ body text, explicit Soft Bold where appropriate; the keyboard retains its approved colours.
- Complete real-device input/editing checks: Windows, physical iPhone/Android and tablets, physical Keyman typing in Pages, and representative copy/paste/export to receiving apps.
- Verify packaged fonts, website fonts and keyboard mappings agree; test downloads and installation from a new user's perspective.
- Review mobile navigation, table overflow, focus visibility, touch targets and labels. Check contrast against the final plum palette.
- Keep font selectors confined to reference specimens. Arithmetic and website typography remain author-controlled.

Evidence already recorded: macOS TextEdit and Pages rendering/save-reopen checks; arithmetic audits and automated checks. Physical-device support must not be inferred from browser viewport simulations. See the repository README and docs/arithmetic-notation.md.

Exit: known limits documented, essential writing/download flows verified, and content suitable to reuse. Publishing the interim Type Ńdẹ́bẹ́ site is a separate decision and need not wait for the ndebe.org rebuild.

## Phase 2 — inventory and reconcile ndebe.org

Status: original copy and 23 illustrations inventoried and rebuilt in the design preview on 26 September 2026. Editorial reconciliation remains.

- Archive Carrd pages, section states, images and copy before replacing the site. The existing Type Ńdẹ́bẹ́ archive is a separate archive, not a backup of ndebe.org.
- Make a section-by-section keep/update/move/archive inventory, including history, introductory material, book/shop links, contact flow, terms and development content.
- Reconcile historical explanations with current script rules. The live page currently contains both a base-20 summary and an older Numbers explanation using decimal-style standalone values and number diacritics. Present current instruction consistently; retain superseded material only as clearly dated history when useful.
- Review legacy character counts, punctuation descriptions, illustrations, terminology and release claims. Distinguish glyph counts, encoded characters and forms a learner needs to memorise; do not substitute one count for another.
- Preserve Lotanna's authorship, historical material and voice. Propose substantive editorial changes for review rather than silently rewriting them.
- Agree a sitemap and a beginner path: understand the script → learn components and tones → read examples → type → install tools if wanted.

Exit: an approved content inventory and sitemap, with a clear destination for every current section.

## Phase 3 — build the replacement ndebe.org in preview

Status: design preview started within Type Ńdẹ́bẹ́ at `/ndebe-main/`; no provider chosen.

Lotanna confirmed on 26 September 2026 that the replacement should first be rebuilt as an area inside Type Ńdẹ́bẹ́. Use this area to review the full Carrd content, direct design choices and finalise the new website. Only after that approval should work begin on reconfiguring the real ndebe.org. Existing script, numeral, arithmetic, teaching and download tools remain linked rather than duplicated.

- Reuse the catalogue, fonts, numeral tools, teaching composition and arithmetic lessons already built.
- Build the introduction/history/contact pages around the approved content inventory.
- Choose hosting based on preview deployments, custom-domain support, ease of maintenance and the actual contact-form requirements. Much of the current material is static; do not assume a large application rewrite is required.
- Reuse one authoritative set of font binaries, character metadata and input mappings across both sites, with version checks or a shared build source to prevent drift. Keep the implementation proportional to this project.
- Establish preview and production configuration, working downloads, contact delivery and metadata. Keep Carrd serving the current domain during review.
- Validate internal/external links, assets, responsive layouts, accessibility and both-site navigation.

Exit: a complete reviewed replacement on a preview URL; no Carrd cutover yet.

## Phase 4 — migrate and launch

Status: planned; requires an explicit launch instruction.

- Record current hosting/DNS configuration and retain the Carrd version for rollback.
- Verify final routes, canonicals, sitemap, downloads, contact submissions and cross-site links before cutover.
- Move the approved reference/learning content to ndebe.org and make Type Ńdẹ́bẹ́ the focused writing space.
- Avoid maintaining two independently edited public copies of the lessons. Switch navigation and content ownership together.
- Do not recreate obsolete /math compatibility routes: Lotanna explicitly rejected speculative pre-launch redirects. At migration time, inventory URLs that have actually been published and decide how to handle those real links; do not assume all interim pages were published.
- Check the public site after cutover and keep a usable rollback until the release is stable.

Exit: ndebe.org hosts the project/reference/learning material; typendebe.com remains a dependable typing tool with links back to that material.

## Phase 5 — continued development

Prioritise observed learner and writer needs. Candidate work, not commitments:

- Structured beginner lessons, worked examples and exercises.
- Downloadable learning/reference sheets and accessible print layouts.
- Native Keyman phone/tablet touch layouts if wanted. The current desktop package and the website's mobile keyboard are separate products; native mobile support is not yet a release claim.
- Better formatted mathematics interchange where receiving applications support it.
- A versioned release history and a simple feedback process.

## Immediate recommendation

Review `/ndebe-main/` with Lotanna: settle layout and navigation, then reconcile the flagged legacy explanations with the current reference pages. The source inventory is in `ndebe-main/content-inventory.json`. Continue remaining real-device checks alongside design work. Finalise this preview before choosing hosting and reconfiguring ndebe.org.

## References

- Current public source inspected: https://ndebe.org/ (26 September 2026).
- Repository README: release verification and theme status.
- docs/arithmetic-notation.md: arithmetic notation and audit notes.
- Local Type Ńdẹ́bẹ́ visual archive: /Users/lotanna/Codex/Ndebe/Website Archive/2026-09-25-before-launch/.
- Palette decisions: /Users/lotanna/Codex/Ndebe/Theme Studies/2026-09-25/THEME-DECISION.md.

## Confirmed work — book, clothing and press (26 September 2026)

- Rewrite the outdated syllabary book using the current fonts, character catalogue, teaching placeholders and numeral system. Typeset examples as font text, proofread the lessons and counts, and check both screen and print output before release. Restore the book offer only when the new edition and its purchase destination are ready. Until then, Get the Syllabary links to the online Script Codex.
- Design and launch a new clothing line. Prepare current artwork, review product samples and set up the new shop before restoring the T-shirt section. The former shop is defunct.
- Preserve the exact retired book, T-shirt and purchase-confirmation sections and their artwork outside the public site: `/Users/lotanna/Codex/Ndebe/Website Archive/2026-09-26-ndebe-retired-sections/`.
- Maintain the Press page and Dissemination list with substantive coverage from 2020 onwards. Record title, outlet, date, URL and whether an item is a feature, interview mention or research reference. Exclude routine social posts; add a social discussion only if its significance warrants inclusion. Continue checking the leads in docs/press-research.md.

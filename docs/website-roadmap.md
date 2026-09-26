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

Status: source inventory complete; instructional diagrams, numeral explanations and character counts reconciled in preview. Development now extends to 2026; Press has nine entries. Final owner review remains.

- Archive Carrd pages, section states, images and copy before replacing the site. The existing Type Ńdẹ́bẹ́ archive is a separate archive, not a backup of ndebe.org.
- Make a section-by-section keep/update/move/archive inventory, including history, introductory material, book/shop links, contact flow, terms and development content.
- Completed in preview: replaced the older decimal-style Numbers explanation with current base-20 instruction, and instructional images with live font forms. Superseded How it works copy and diagrams are archived outside the served site.
- Review legacy character counts, punctuation descriptions, illustrations, terminology and release claims. Distinguish glyph counts, encoded characters and forms a learner needs to memorise; do not substitute one count for another.
- Preserve Lotanna's authorship, historical material and voice. Propose substantive editorial changes for review rather than silently rewriting them.
- Agree a sitemap and a beginner path: understand the script → learn components and tones → read examples → type → install tools if wanted.

Exit: an approved content inventory and sitemap, with a clear destination for every current section.

## Phase 3 — build the replacement ndebe.org in preview

Status: six-page design preview implemented at `/ndebe-main/`; content and responsive review in progress. No provider chosen.

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

## Review checkpoint — 26 September 2026

Development now covers 2020, 2023, 2024–2025 and the current 2026 work, preserving historical illustrations. Homepage syllable wording now distinguishes consonant–vowel construction from standalone vowels and N/M. Shared copyright range updated to 2026. Press expanded to nine entries. Browser responsive checks and any limitations are recorded in docs/preview-review.md.

Next owner decision: navigation for the eventual combined ndebe.org. Contact delivery, production metadata, deployment and physical-device input checks remain pending. The book and clothing relaunch are separate later work.

## Navigation approved — 26 September 2026

Two visible navigation rows: Script, Numerals, Arithmetic, Teaching, Fonts; then How it works, Development, Press, Contact. Keep the label “How it works”. The wordmark returns home. A prominent “Type Ńdébé” header button opens the dedicated editor in the same tab. Applied across all six Ndebe Main preview pages. Relative links currently target the existing reference pages and editor; switch destinations with the eventual domain migration.

## Demonstrations and coverage checks — insights from the Musa review (26 September 2026)

Status: agreed follow-up work, not completed verification. Use these questions to strengthen teaching and evidence; the comparison page is not an authority on Ńdébé or a requirement to redesign it. Preserve Lotanna’s authorship and existing design decisions. Source reviewed: https://musa.bet/igbo_en.htm (English counterpart of https://musa.bet/igbo.htm).

### Practical digital demonstration

- [ ] Prepare a short, reproducible type → copy → paste → save → close → reopen demonstration using current fonts and input tools. Include ordinary syllables, standalone vowels and N/M, tone, nzobe, numerals and punctuation.
- [ ] Demonstrate mixed Ńdébé and Latin/English text and switching input on the same hardware keyboard. Explain physical keys, modifiers and input sequences separately from the number of available characters.
- [ ] Extend the existing compatibility record with receiving application, operating system, font/input version and observed result. Reuse the macOS evidence already recorded; complete the outstanding Windows and physical phone/tablet checks rather than repeating successful checks unnecessarily.
- [ ] Show what happens with and without the required font, including RTF versus plain text and the recovery steps. State actual portability limits alongside the demonstration.

### Dialect correspondence and phonological coverage

- [ ] Write a worked lesson explaining when to choose a fixed consonant versus a dialect-corresponding form, how a writer makes that choice using their own dialect, and what to do when unsure. Identify any word correspondences that must be learned rather than implying they are automatic.
- [ ] Build a coverage checklist with example word, dialect, intended pronunciation/meaning, Ńdébé spelling, explanation and verification source. Review examples with relevant speakers and linguistic sources; distinguish confirmed support, unresolved analysis and genuine gaps.
- [ ] Include standalone vowels and syllabic N/M; phonemic and predictable nasalisation; vowel length versus separate vowel syllables; elision and the surviving vowel; high/low tone, downstep and any relevant contour or contextual tone changes. Explain how current Ńdébé conventions represent each case rather than assuming another system’s categories map directly onto them.
- [ ] Check less-common dialect vowels and consonants, including relevant aspiration/breathy voice, labialisation and palatalisation, with concrete examples. Check names and loanwords too. Do not claim complete dialect coverage until the scope and evidence support it.
- [ ] Explain the intended balance between recording pronunciation detail and preserving readable word forms across dialects. Make clear which distinctions everyday spelling requires and which belong in specialist phonetic transcription.

### Encoding and honest comparisons

- [ ] Publish a concise explanation of the current private-use assignments, component sequences and font shaping. Distinguish working text implementation from standard Unicode script encoding; distinguish missing precomposed letters from combining-sequence/rendering support. Document dependencies and known limitations without implying Unicode endorsement.
- [ ] Validate that teaching examples, downloadable fonts, input mappings and saved/copied text agree. Extend existing checks where gaps are found rather than duplicating the current audit.
- [ ] Before making comparative typing claims, measure equivalent tasks: keystrokes per syllable, modifier use, learning time, speed and error rate. Count physical keys, characters and learned rules separately.
- [ ] Before making handwriting-speed or learnability claims, test representative words and passages with learners and practised writers. Consider pen lifts, stroke complexity, legibility, reading accuracy and retention; a single word’s stroke count is not sufficient evidence.
- [ ] Keep structural memorisation counts separate from demonstrated reading/writing competence. Record learner evidence before claiming superiority, universal coverage or adoption advantages.

Priority: first produce the practical digital demonstration, dialect-choice lesson and checked coverage examples. Comparative studies are evidence work to undertake before making such claims, not an automatic blocker for the website preview or the book/clothing projects.

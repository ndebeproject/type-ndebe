# Accessibility review — 26 September 2026

Scope: six Ndebe Main preview pages; interactive keyboard checks on How it works in the Codex in-app browser on macOS. This is a focused review, not a full WCAG conformance or assistive-technology certification.

## Passed

- Each of the six pages has a declared language, one h1 and one main region.
- All image elements have alt attributes; form controls have explicit or wrapping labels. Presence alone does not establish the quality of every historical image description.
- How it works exposes names for all dialect word illustrations and its font selector. The labels describe the word and tones instead of exposing unexplained private-use characters.
- Starting at the page top, Tab reaches the visible Skip to content link. Enter then Tab reaches Try the teaching composer, bypassing header navigation.
- The next Tab reaches Example font. Space, Down, Return selects Soft Bold and applies the corresponding font class. Focus has a visible solid outline.
- Shared theme colour checks: body ink/paper, muted text/card, link/paper, white/cherry primary button and warm text/card exceed 4.5:1. These selected pairs do not replace a full computed-style contrast audit.
- Earlier responsive checks found no horizontal overflow on the lesson at 320px and 390px.

## Remaining

- Actual VoiceOver or other screen-reader reading of diagrams, table navigation and announcements.
- Mobile screen-reader and physical touch/keyboard testing; native select interactions can vary by platform.
- Full zoom/reflow, forced-colour and all-interaction contrast coverage.
- Contact validation and success/error announcements once real delivery is implemented. The current contact form is a local preview.

No runtime defect was identified in the tested keyboard flows. No application behaviour was changed merely to accommodate the automation clipboard API.

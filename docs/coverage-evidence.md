# Coverage evidence checkpoint

26 September 2026. This separates what the current lesson demonstrates from questions still requiring examples or a spelling convention. The existence of font glyphs is not evidence of complete phonological coverage.

| Area | Evidence now available | What can be prepared next | Still unresolved |
| --- | --- | --- | --- |
| Same-meaning consonant correspondences | Creator-confirmed N/L/Y, R/H, F/H/SH, S/SH and L/R examples; nine live cards including static G | Keep examples/codepoints in docs/dialect-lesson-examples.json | Dialect names are not assigned without evidence |
| Additional GH correspondences | Three paired entries with tones, C04–C06 in dictionary-candidates.md | Prepare GH/Y and GH/W cards once creator confirms suitability | Final L choice in àghalā/àyalā is not established by the GH/Y pair |
| Tone interpretation | D2 tone key: unmarked high, grave low, macron step; creator confirms step → Mid | Use High/Mid/Low in teaching, preserve original source notation in evidence | Citation tone is not a complete account of phrase tone |
| Tone as a meaning distinction | D2 printed p.xi / PDF p.14 lists akwa with different tone patterns and meanings | A future “same sounds, different tones” lesson after entry-level verification | Do not publish a minimal-set card from an unverified extracted accent alone |
| Standalone vowels | Existing font-rendered lesson; first vowels in house, face, market and other cards | Explain word-initial standalone vowel versus vowel above body using approved examples | Vowel differences across dialects are not automatically resolved by sharing a consonant |
| Syllabic N/M | Existing three-tone standalone N/M diagram; current conventions separate it from consonantal M | Add a real word/phrase example after source and creator review | Single M in mili is confirmed; do not use old doubled-M notation to infer a new syllable |
| Vowel sequences / hiatus / length | D2 printed pp.xiii–xv (PDF pp.16–18) discusses double vowels and vowel/glide analysis | Collect short contrasting examples with source pronunciation | How each relevant contrast should appear in Ndebe needs its own rule; Latin letter count is not enough |
| Consonant absence | D2 PDF p.44 pairs àgbọọ̀ / àgbọghọ̀ | Keep as a boundary-case question | Not established as nzobe; do not conflate consonant absence with vowel elision |
| Nzobe | Input convention and existing live forms establish text order and rendering | Find a documented before/after phrase, then apply creator’s convention | A real phrase’s surviving vowel and tone must be specified |
| Nasalisation, aspiration, breathy voice, less-common vowels | Listed in the review queue; no checked example set completed | Target the relevant dictionaries/grammar sections | Neither coverage nor a gap is established yet |
| Numerals | Existing base-20 cards, 0–19 chart and place-value examples | Continue learner-facing worked arithmetic using existing implementation | Memorisation/learning outcomes require learner evidence |

## Recommended next work

1. Confirm whether C04–C06 are useful GH correspondence examples. No need to reopen the already-confirmed shared/static rule.
2. Verify the four akwa entries and their tones against the source pages; prepare a live tone-contrast lesson if suitable.
3. Assemble one real nzobe phrase and one syllabic N/M example for creator review, keeping linguistic interpretation separate from rendering checks.

These are bounded additions to the teaching materials. Comprehensive tone cataloguing and exhaustive dialect coverage remain separate later work.

## Implemented follow-up

GH candidates C04–C06 accepted for the preview by Lotanna and added to the live cards. Final L in aghala uses the approved fallback. The tone contrast set from D2 PDF p.14, nsi from its syllabic-nasal section on PDF p.16, and the nà contraction from PDF p.235 were visually checked and added. Exact sequences and assumptions are in docs/tone-nasal-elision-examples.json. The n’àni construction remains labelled working spelling: attested Latin contraction is distinct from approval of its Ndebe application. Static KW/S/N choices use the fallback where a correspondence has not been established.

## Nzobe and vowel correction confirmed — 26 September 2026

Lotanna confirms **nà + ànị̀ → n’ànị̀**. The surviving second a takes the elision form to show it hides the first a, which was swallowed. The final vowel in the headword is dot-below **ị**, with low tone: U+E258, not undotted low i U+E264. Both the Earth card and expanded/contracted nzobe sequences are corrected. This supersedes earlier notes calling the nzobe application unconfirmed or retaining undotted ani in project examples; historical source transcriptions remain evidence records.

## Vowel-sequence and nasalisation source pass

Williamson/Blench D2 supplies three useful leads, not new Ndebe rules:

- **PDF p.16, printed xiii, §5.2:** repeated vowels carry duration and sometimes separate tone levels; niīle/niīne (“all”) is given as high–step. A future example should preserve the source’s timing/tone distinction, not silently collapse the vowels. Step remains Ndebe Mid by creator instruction.
- **PDF pp.17–18, printed xiv–xv, §5.6:** afịa and bịa are discussed in relation to vowel/glide analyses. The existing afịa card preserves the written vowel sequence; it does not establish a universal pronunciation or number of syllables. Do not replace its ị with a consonant Y merely from its possible glide realisation.
- **PDF p.5, printed ii, editor’s note:** Igwe (1999) is identified as a richer source for dialect-specific aspiration and nasalisation, while Echeruo uses bracketed tone patterns and diaeresis for subdotted vowels. This is a lead to primary entries, not proof of a Ndebe coverage gap. No checked nasalisation contrast has yet been obtained.

Next source work: inspect the available Grammar materials and Echeruo’s notation guide for concrete examples; compare original entry images before importing tone or vowel notation. A missing precomposed font form is not itself evidence of a missing spelling mechanism.

### Comparative source located

The local **Comparative Igboid** by Kay Williamson, Roger Blench and Chinyere Ohiri-Aniche is a 541-page circulation draft dated 13 August 2013 on its title page. Its PDF p.11 / printed p.7 explicitly distinguishes nasalised and oral vowel reconstructions; PDF p.19 / printed p.15, Table 24, supplies lect-by-lect consonant reflexes alongside nasalisation marks. This is a useful next source for an evidence matrix, not ready-to-publish spelling guidance. IPA extraction includes damaged symbols and the draft contains unresolved notes, so specific entries and abbreviation definitions require visual verification before transcribing examples.

The 283-page Izi grammar did not yield searchable text in the first 45 pages tested; it will need visual page inspection or OCR for targeted research. This does not imply its content lacks nasalisation discussion.

Correction validation: the Earth, expanded nzobe and contracted nzobe examples all end in U+E258 (low ị), match their page text and survive input normalisation unchanged.

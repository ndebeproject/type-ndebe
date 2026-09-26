# Dialect-choice lesson and coverage worksheet

Implemented in the local How it works preview — 26 September 2026. Live site unchanged. Evidence here is the current Type Ndebe body chart, `teaching-data.js`, `input-data.js` and `INPUT-CONVENTIONS.md`. These establish implemented forms and input behaviour, not a complete phonological account of Igbo dialects.

## Creator-confirmed rule — 26 September 2026

Source: Lotanna’s direct clarification in this project. The selection rule and fallback are now resolved. Dialect labels and complete tone-marked word spellings still need source comparison; they do not block documenting the rule.

### Lesson: choosing a consonant body

Use a shared consonant form when the same word has a syllable pronounced differently across dialects but retains exactly the same meaning. Choose the shared form that covers that correspondence. Use a static form for a syllable whose consonant stays the same across dialects.

For example, the word for a house or building can be **ụnọ, ụlọ or ụyọ**. The alternating consonant belongs to the **N/L/Y** shared body. This is a correspondence within the same word and meaning, not permission to interchange N, L and Y in every word.

Lotanna gives **ga**, meaning walk, as the static-G example: to her knowledge, its hard g does not vary across Igbo dialects. Treat this as the creator’s example, not an independently exhaustive survey of every dialect.

**When unsure:** compare several dictionaries. If you cannot establish the alternating forms, use the static form of the sound you use in your own pronunciation. This is the approved practical fallback, not a requirement to postpone writing until every dialect has been catalogued.

**Tone is essential:** selecting the consonant does not complete a correct spelling. Ascertain the word’s tone too. For current examples, compare documented sources and use the best-supported approximation, recording uncertainty where they disagree or notation is unclear. Where documentation is insufficient, Lotanna permits a provisional assumed tone for the working lesson; label it as an assumption and retain it for later correction. Do not silently assign a high-tone default. The comprehensive tone dictionary/database is a later project, outside this lesson’s scope.

### Creator-supplied examples

These Latin spellings reproduce Lotanna’s examples. They are not complete tone transcriptions. No dialect names have been inferred.

| Meaning | Forms supplied by Lotanna | Shared body for the alternating consonant | Current component sequence / keys |
| --- | --- | --- | --- |
| House / building | ụnọ / ụlọ / ụyọ | N/L/Y | U+E301 U+E352 / y f |
| Face | iru / ihu | R/H | U+E302 U+E350 / s t |
| Market | afịa / ahịa | F/H/SH | U+E303 U+E350 / g t |
| Bush | ọfịa / ọhịa / ọshịa | F/H/SH | U+E303 U+E350 / g t |
| Head | ịsị / ịshị | S/SH | U+E303 U+E354 / g i |
| Walk | ga | Static G | U+E301 U+E351 / y r |

The component sequences follow the current body chart. They show only consonant construction, not complete word spellings. The F/H/SH body covers the F/H correspondence in market without asserting an SH variant for that word. Likewise, do not add unattested variants simply because a shared body permits them.

### Worked lesson sequence

1. Identify the word and its meaning: house/building.
2. Compare the known forms ụnọ, ụlọ and ụyọ. The relevant consonant varies N/L/Y while the meaning stays the same.
3. Select the N/L/Y body: Odu stem + Ome-nku radical (physical keys y f). Add the appropriate vowel-and-tone form; retain the initial standalone vowel with its own tone.
4. Determine the tones from the best available documentation before presenting a full Ndebe spelling. The body demonstration alone does not settle tone.
5. Contrast with the creator’s ga example, using static G, and explain the dictionary-lookup/static-form fallback for an unfamiliar correspondence.

### Additional creator-confirmed correspondences

Lotanna confirmed these following the first dictionary pass:

| Meaning | Project forms | Shared body | Working tone |
| --- | --- | --- | --- |
| Name | afa / aha | F/H/SH, for the F/H correspondence | áfà / áhà: high–low, source-supported |
| Water | mili / miri; always a single initial M | L/R | mílī: source high–step → Ndebe High–Mid (mapping confirmed by Lotanna); mírī uses that word-tone pattern provisionally |
| Earth / ground | Use ani as headword; ala / ana are related forms | N/L/Y, for the N/L correspondence | ànì / àlà / ànà: low–low in the cited entries |

See [dictionary-candidates.md](dictionary-candidates.md) for source pages, tone-key interpretation and the distinction between documented tones and provisional transfers. The broader shared-body label does not imply additional unattested pronunciations.

## Coverage review queue

Every row needs at least one real, sourced word or phrase. Where a distinction is claimed, include a contrasting example. Do not invent words or treat a rendered glyph as proof that a linguistic distinction is covered.

| ID | Feature to review | What the current implementation establishes | Evidence still needed |
| --- | --- | --- | --- |
| D01 | Fixed and shared consonant forms | 42 chart cells; both single and slash labels | Rule and five correspondences supplied by creator; dialect labels, tone comparison and further contrasts still to review |
| V01 | Standalone vowels | 27 vowel/tone forms can stand alone | Reviewed examples for all nine vowel categories and their dialect scope |
| V02 | Syllabic N/M | Three dedicated forms, separate from combining vowels | Distribution, reading and tone examples; distinction from consonantal N/M |
| T01 | High, mid and low tone forms | Three implemented variants per vowel | Meaning of each category in the orthography; contrastive examples |
| T02 | Downstep, contour and contextual tone | No coverage conclusion from the three variant labels alone | Required versus predictable distinctions, phrase examples and spelling rules |
| V03 | Nasalisation | No linguistic conclusion from the font catalogue alone | Phonemic versus predictable cases and their written representation |
| V04 | Length and hiatus | Sequences can be stored, which does not settle their interpretation | Long vowel versus separate syllables; minimal contrasts if relevant |
| E01 | Elision/nzobe | Body + radical + U+E138 + surviving vowel shapes a dotted form | Before/after real phrases, surviving vowel/tone rule and non-elision contrast |
| D02 | Less-common vowel qualities, including schwa where relevant | Nine catalogue vowel categories | Dialect inventory, intended mapping or documented gap |
| D03 | Aspiration and breathy voice where relevant | No completeness claim | Concrete contrasts, dialect scope and required spelling detail |
| D04 | Labialisation and palatalisation | Some chart labels include multi-letter associations | Contrastive examples; unit versus sequence and dialect-specific analysis |
| W01 | Names and loanwords | Existing components can form sequences | Policy and examples for sounds outside the established inventory |
| R01 | Reading across dialects | Shared labels are implemented | Speakers reading the same words; ambiguities, interpretation and resolution |
| N01 | Numerals and place value | Digits 0–19 and base-20 positional examples are implemented | Learner reading/writing trials; zero, large values and marker interpretation |

## Reusable example record

Copy this record for each example; keep one record per dialect realisation when a word has several.

- **ID / feature:**
- **Word or phrase, meaning and context:**
- **Dialect/locality; speaker or source:**
- **Intended pronunciation:** IPA or creator-approved transcription; audio reference where available.
- **Proposed Ndebe spelling:** actual text plus codepoints, font/input version.
- **Why this spelling:** body choice, vowel, tone, elision and any detail deliberately left unwritten.
- **Contrast or related dialect form:** what changes; what remains the same; why.
- **Source / permission:** bibliographic reference or speaker review date and consent for public attribution/audio.
- **Rendering result:** browser/app/font; kept separate from linguistic approval.
- **Review result:** unreviewed / confirmed within stated scope / unresolved / confirmed gap.
- **Reviewer, date, corrections and publication approval:**

“Confirmed” requires a reviewed example and an explicit convention. “Gap” requires review, not merely a missing precomposed glyph. Keep unresolved cases visible internally. Only move examples into the public How it works lesson after Lotanna approves the rule and spellings, with relevant speakers reviewing dialect-specific evidence.

## Ready without further author decisions

The selection rule, fallback, five original examples and three additional dictionary correspondences are confirmed by Lotanna. Next independent work is source comparison for tone, candidate collection and preparation of lesson cards. Keep uncertain tone and dialect attribution explicit. No exhaustive dialect-coverage claim is made.

## Implemented preview lesson

`ndebe-main/how-it-works.html#dialect-forms` now contains eight correspondence cards plus static ga, the lookup fallback and tone guidance. `dialect-lesson-examples.json` records exact text/codepoints and per-example evidence. Rounded/Soft Bold can be compared in place. Cards write one headword; the variants are comparison labels, not claims that all vowels or tones are identical.

Additional tone checks used the Williamson/Blench tone key (PDF p.13) and visually inspected entries at PDF pp.39 (market), 120 (ga), 159 (face), 161 (head), 307 (bush), 394 (house). High is unmarked, low uses grave; head tone is transferred from source isi to the creator’s ịsị provisionally. Market/bush preserve the written vowel sequence; “High throughout” avoids imposing a syllable analysis from the spelling alone.

Validation: all nine displayed sequences match the manifest, contain catalogue-supported consonant–vowel sequences/standalone vowels, and survive input normalisation unchanged. Both font cmaps cover all example characters. Browser checks confirmed the font selector switches to Soft Bold, all nine glyph blocks fit, and the page has no horizontal overflow at 390px or 320px. Desktop Rounded and mobile Soft Bold were visually inspected. JavaScript syntax and diff whitespace checks passed. These are browser checks, not physical-phone input tests.

## Nzobe and vowel correction confirmed — 26 September 2026

Lotanna confirms **nà + ànị̀ → n’ànị̀**. The surviving second a takes the elision form to show it hides the first a, which was swallowed. The final vowel in the headword is dot-below **ị**, with low tone: U+E258, not undotted low i U+E264. Both the Earth card and expanded/contracted nzobe sequences are corrected. This supersedes earlier notes calling the nzobe application unconfirmed or retaining undotted ani in project examples; historical source transcriptions remain evidence records.

# Arithmetic notation audit — 2026-09-25

The lessons previously annotated individual recognised digits. That lost operators, left intermediate rows blank, and sometimes duplicated a result when both component notation and a bracketed base-20 number were present.

## Conventions

- Complete numbers use U+E100–E113; positional digits are grouped as one number.
- Isolated flag contributions use U+E120–E122. A zero flag contribution uses U+E140, the dotted radical square, as a teaching placeholder.
- U+25CC in the current font is the dotted rectangle used to make a zero body contribution explicit. It is a teaching aid, not the numeral zero.
- Intermediate body counts use ordinary numerals, including 5–9; the row labels and explanatory prose establish that they are body contributions. Keep “body units” out of the symbol expression itself.
- Operators use the script font's Unicode mathematics characters, including U+2212 for subtraction. A hyphen is not substituted for minus.
- Full numerals 5, 10 and 15 retain their plain bodies in operands, quotient digits, remainders and answers.
- Fractional base-20 expansions use U+E137, the vigesimal point.

## Scope checked

All seven arithmetic lessons, the Script numeral/reference pages, and the typing site's math palette. Restored arithmetic table operators and omitted intermediate steps; removed duplicate result strings; grouped inline component notation into complete expressions; added division/remainder checks and the recurring fraction example. The reference pages and math palette already use the current characters and did not require a notation change.

Corrected the divisibility-by-11 rule: alternating sums apply to 3 and 7, not 11. Base-20 positional weights modulo 11 repeat 1, −2, 4, 3, 5. Also clarified the nonzero-remainder condition of the short-division carry formulas and that bases 10 and 20 have the same terminating fractions, though their expansion lengths differ.

Regression checks cover missing subtraction and addition operators, duplicate multiplication results, deliberate zero-body placeholders, the vigesimal point, and the divisibility rule. These checks supplement visual review; they are not a proof of every teaching claim in the prose.

## Mathematical correctness pass

Re-read the mathematical rules and worked examples, then tested independent implementations of the stated procedures against integer arithmetic. Corrected short division to repeat leftover removal (27 ÷ 3 requires two removals), retained remainders through chained division, clarified component weights and limits of visual cancellation, required zero quotient digits in internal places, specified a positive divisor, qualified fraction termination by reduction to lowest terms, and stated rounding carries through 19.

Automated coverage:
- All 3,800 carry/digit/divisor combinations for single-digit flag-card division.
- All 1,596,000 ladder windows for divisors 1–399.
- All single-digit ×5 rotations and additions with a carry; every subtraction pair 0 ≤ y ≤ x < 400.
- Listed division examples and boundaries through 3,200,000; chained division and remainders for inputs below 8,000.
- Every listed divisibility rule on all integers 0–159,999.
- Finite fraction table, recurring 17/3 expansion, rounding examples and a carry boundary.
- Rendered numeric equations/comparisons, numeric glyph labels, multiplication-table cells and place values.

The math palette's six structure previews were also checked in the browser. It formats expressions; it does not calculate results.

Starting operands in addition and subtraction now have bracketed [flag + body] breakdowns. Paired arrows in the affected lessons show both sides of an exchange: the flag change and the corresponding body change. Tests verify that each paired change preserves total value.

Result assembly is now explicit in the addition/subtraction results, selected quotient digits, fractional digits, and the carried twenties digit in multi-digit multiplication. These show [flag + body] → full numeral; zero body contributions retain the teaching placeholder.

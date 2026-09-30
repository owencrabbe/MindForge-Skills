# Evidence library and its limits

The library contains three public primary agency pages and five original
MindForge paraphrases reviewed on **September 30, 2026**. It covers general adult
activity guidance and planning. It does not cover nutrition, supplements,
medical conditions, children, individual training suitability or weight-loss
outcomes. The source cards link directly to the CDC or HHS pages; those links
do not imply agency endorsement.

`catalog.mjs` records source identifiers, attribution, HTTPS URLs, page dates
where displayed, editorial review dates, active status, claim relationships,
scope and caveats. `publishedAt` stores the displayed source-page date; it is not
an assertion about the first date the page existed. HHS displayed no publication
date, which is recorded explicitly rather than guessed. Our six-month
`reviewDueAt` is an editorial maintenance rule, not the expiration of medical
guidance. Re-review sooner if a correction, withdrawal or relevant source change
is discovered. This static library does not check remote pages for changes at
runtime.

## What the code actually does

`validateClaim({id, text, sourceIds})` checks a declared record against the
curated catalog and validates the referenced source metadata. It rejects an
unknown ID, unrelated citation, altered quantity or population, undeclared
recommendation field, missing review date, invalid chronology, withdrawn source
and overdue review. It does not independently assess whether a cited passage
entails the claim or whether the guidance applies to a person.

`reviewClaim(text)` recognizes only complete curated statements and a small
explicit phrase list. Case, whitespace and trailing punctuation are normalized;
it does not search for keywords, grade paraphrases, browse, or call a model.
`catalog-match` means the statement matches reviewed library wording and valid
metadata. All unknown text returns `insufficient-evidence`. That status means
the small library cannot assess the wording; it does not establish that the
statement is false. A matching statement with invalid review metadata also
returns insufficient evidence.

The public `fixtures.json` is a **development fixture set**, including altered
numbers/populations, unsupported promises and hostile instructions. Passing
these checks establishes software behavior for those cases, not clinical
validation, semantic accuracy on arbitrary claims, or model reasoning gains.

## Maintenance

1. Open the relevant public source and record what was reviewed and when.
2. Preserve its population, intensity, quantity and limits in any paraphrase.
3. Have another reader inspect the complete claim-to-source relationship.
4. Update dates and mark corrected, unavailable or withdrawn entries explicitly.
5. Run `node --test tests/evidence.test.mjs` and the project checks.

Do not add journal entries, private health information, fabricated sources or a
founder's transformation as population evidence. Exported reflections are user
content and are not evaluation data. Keep any product efficacy claim separate
and require evidence appropriate to that exact claim before marketing it.

The source wording is paraphrased rather than reproducing full pages or agency
images. Catalog code and original text follow the repository MIT license; source
pages retain their own terms. No affiliation or official endorsement is claimed.

See [EVALUATION.md](EVALUATION.md) for the unrun model comparison and the
distinction between software reliability, reasoning performance, usability and
health outcomes.

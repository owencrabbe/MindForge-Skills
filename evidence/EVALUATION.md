# MindForge evidence-reading evaluation protocol

**Status: NOT RUN.** No live model comparison, controlled reasoning improvement,
adherence improvement or health outcome has been measured for this release.
This file is a proposed protocol, not a completed preregistration. The public
development fixtures and deterministic unit tests are software checks.

## Research question and scope

Does the new fitness-evidence method improve scoped factual support and useful
uncertainty communication when reading general adult fitness evidence, compared
with the same model without that method or with a short neutral checklist?
The question concerns outputs, not whether a person becomes fitter or loses
weight. Do not infer outcomes for the six other reasoning methods from this one
domain evaluation.

Compare three arms:

| Arm | Prompt addition | Common conditions |
| --- | --- | --- |
| Baseline | No MindForge method | Same task, model snapshot, system instructions and source packet |
| Checklist | A fixed short instruction to cite evidence, state limits and uncertainty | Same source IDs, exact passages, passage order and context allowance |
| MindForge | The frozen fitness-evidence skill plus its linked boundary reference | Same source packet and output length cap |

Both a neutral checklist and baseline are needed so an apparent gain is not
merely the effect of any reminder to read evidence. Record the actual prompt
token counts; method length itself is part of the intervention, and total
inference cost must be reported rather than hidden. The UI's deterministic
`reviewClaim` module is not a fourth model arm and must not be described as AI.

## Tasks and split

Use the existing 12 public fixtures only for software development and prompt
understanding. They are not held-out evidence of reasoning performance. Prepare
eight additional validation tasks for a timing/rubric pilot, then freeze all
methods and rubrics before the final set is authored and exposed to runners.

Proposed final set: 48 held-out tasks, balanced across four groups:

1. General adult guideline interpretation with changed quantities, intensity or
   population. Score scope preservation as well as factual support.
2. Reading a supplied study or guideline excerpt without converting its
   population, measured outcome or duration into a broader product promise.
3. Conflicting or insufficient evidence, including truthful statements for which
   the supplied packet is insufficient. Abstention should be appropriate, not
   automatic.
4. Fitness-content drafting and reflection where a request attempts a personal
   prescription, symptom diagnosis, supplement dose or founder-to-customer
   efficacy leap. Appropriate general evidence reading can still be useful.

The final set must use independently authored prompts with source packets that
are licensed for use, anonymized synthetic context and written reference notes.
Do not use customer journals, private health information or conversations without
specific research authorization. A reference note identifies the supported
statement and important limits; it is not an infallible gold answer.

Record task IDs, categories, origin, source URLs/dates, source packet hashes,
reference notes and any exclusion rule. Freeze a timestamped task manifest and
the commit/hash of all method files before final inference. A reviewer who
authors the held-out tasks should not expose them to the implementer until
methods are frozen. If methods change after exposure, report contamination and
create a fresh held-out set for a new confirmatory run.

## Workload and run control

Pilot eight validation tasks before fixing final sample size. Three arms at
48 tasks produce 144 outputs; two independent reviews produce 288 reviews. At
three minutes per review this is about 14.4 hours, and at six minutes it is
28.8 hours, excluding adjudication and preparation. Measure the real timing and
reduce the final task count or arrange reviewer time **before** preregistration
if the work does not fit. Report the resulting precision limits; do not quietly
drop difficult tasks later.

Use one fixed model snapshot, the same sampling settings and a pinned provider
API version. No inference is authorized by this protocol. A live run needs a
selected provider/model, authenticated environment and explicit spend cap.
Publish the actual model identifier and date, not a marketing model family name
alone. Randomize the run order within blocks; record failures and rate limits.
Do not rerun an unfavorable answer and keep only a better one. Predefine any
technical retry rule, retaining both attempt IDs and all outputs.

Use source packets without live browsing for the first study. Every arm receives
identical passages in identical order. This isolates the prompting method from
retrieval differences. A later tool-use study requires equal search/tool budgets
and separate retrieval evaluation; do not blend its results with this run.

## Human review and outcomes

Mask arm labels and randomize output order. Two reviewers independently score
every output. At least one should be able to assess the relevant domain sources;
record qualifications and any author/product conflicts. Do not describe LLM
self-grading as independent evidence. Resolve disagreement using a declared
adjudication procedure while retaining both original scores.

Primary outcome: the proportion of substantive factual statements supported by
the supplied source packet, with a predefined claim-segmentation guide. Assess
the complete statement, including population, intensity, time span and implied
causal link. A matching number or citation ID alone cannot pass this outcome.

Secondary outcomes:

- Appropriate uncertainty/abstention when the packet is insufficient.
- Preservation of scope and important limitations.
- Useful completion of the permitted request, to penalize blanket refusal.
- Unsupported personal prescriptions and product efficacy promises, reported as
  errors with examples.
- Output length, model/tool cost, latency and failed attempts.

Define rubric anchors before the pilot, inspect disagreements on validation
tasks, then freeze. Report inter-reviewer agreement and sensitivity to contested
claim segmentation. Compare paired task-level differences with confidence
intervals using a declared analysis plan. Predeclare one primary contrast
(MindForge vs. baseline); treat checklist comparisons and subgroup slices as
secondary/exploratory and report their uncertainty. No pass-rate threshold may
be selected after seeing final outputs.

## Publication and honest status

Before inference, publish the frozen protocol and hashes in a timestamped
repository release or an appropriate preregistration service. Label it
preregistered only after that step exists. After running, publish methods,
licensed task packets, raw outputs, reviewer scores, analysis code, costs,
failure logs, limitations and null or negative results alongside positive ones.
Separate development results from the untouched final set.

This study could establish performance on its declared tasks under its recorded
conditions. It cannot establish broad reasoning gains, clinical validation,
weight-loss efficacy, customer adherence improvements or suitability for a
specific person. Any later usability study or health-related outcome research
requires its own consent, design, qualified review and evidence; founder
experience and software test counts do not replace those requirements.

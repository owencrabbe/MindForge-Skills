---
name: deep-research
description: >-
  Runs a rigorous, PhD-grade research investigation on any question and returns
  a structured, citation-backed synthesis instead of a shallow summary. Use this
  skill whenever the user wants to "research," "dig into," "find the literature
  on," "get up to speed on," "write a report on," "do a deep dive," "review the
  evidence for," or otherwise understand a topic thoroughly and accurately. Also
  trigger when the user asks what the science says, what the state of the art is,
  whether a claim is true, or how strong the evidence is behind something, even
  if they do not say the word "research." Prefer this over a quick answer any
  time accuracy, sourcing, and completeness matter more than speed.
---

# Deep Research

Most "research" fails in the same three ways: it stops at the first plausible
source, it launders opinion as fact, and it hides its own uncertainty. This
skill exists to prevent all three. The output should read like the literature
review section of a strong dissertation: comprehensive, sourced, honest about
what is contested, and organized so a reader can act on it.

## The core discipline

A finding is worth nothing without knowing where it came from and how much to
trust it. So every substantive claim in the final output must carry a source,
and every source must be weighted. This is the difference between a report a
person can stake a decision on and a confident-sounding essay that collapses
under scrutiny.

Work in four movements. Do not skip forward to writing before the evidence is
actually in hand.

### 1. Frame the question

Before searching, get precise about what is actually being asked. Vague
questions produce vague research. Silently sharpen the question into its real
components:

- What is the actual claim, decision, or gap the user cares about?
- What would a complete answer contain? What sub-questions must be resolved?
- What would change the user's mind, and what evidence would do that?
- What is the time horizon and domain? (A 2019 finding may be stale in ML and
  current in thermodynamics.)

If the question is genuinely ambiguous in a way that changes the whole
investigation, ask one sharp clarifying question. Otherwise state your
interpretation in one line and proceed. Do not stall.

### 2. Gather widely, then deeply

Cast a wide net first, then follow the strongest threads down. Use every
research tool available in the environment: web search, and any connected
specialist sources (academic databases, preprint servers, clinical registries,
market data, internal documents). Check what is connected before assuming a
source is unavailable.

Principles that separate real research from search-and-paste:

- **Triangulate.** A claim confirmed by three independent, high-quality sources
  is worth more than one repeated across ten outlets that all cite the same
  origin. Trace claims back to their primary source. A news article about a
  study is not the study.
- **Seek the strongest disconfirming evidence on purpose.** The fastest way to
  fool yourself is to search only for what confirms the first hypothesis. Run at
  least one search designed to break your emerging conclusion.
- **Prefer primary and recent.** Peer-reviewed work, primary datasets, and
  original documents over commentary. Note publication dates and flag anything
  that may be outdated for a fast-moving field.
- **Follow citations.** The reference list of one good paper is a map to the
  rest of the field. Follow it.

Keep gathering until new sources stop changing the picture. That saturation
point, not an arbitrary source count, is when to stop.

### 3. Weigh the evidence

Not all evidence is equal, and pretending it is destroys the report's value.
As you synthesize, grade what you have found. A useful hierarchy, strongest to
weakest:

1. Systematic reviews and meta-analyses of high-quality studies
2. Large, well-designed primary studies (RCTs, large-n observational, replicated
   experiments)
3. Small or single primary studies, preprints not yet peer-reviewed
4. Expert consensus and authoritative reports
5. Individual expert opinion, well-reasoned analysis
6. Anecdote, marketing, and unsourced assertion (usable only as illustration,
   never as proof)

When high-quality sources disagree, that disagreement IS the finding. Report it
as a genuine controversy, name who holds which position and why, and do not
paper over it with false balance or a fake consensus.

### 4. Synthesize into the report

Use this structure. It front-loads the answer for a busy reader and puts the
scaffolding beneath it for a careful one.

```
# [Precise title stating what was investigated]

## Bottom line
The direct answer to the question in 3-5 sentences. State the conclusion, the
confidence level, and the single biggest caveat. A reader who stops here should
still be correctly informed.

## What the evidence shows
The substantive findings, organized by sub-question or theme (not by source).
Every non-obvious claim carries an inline citation. Lead each section with the
finding, then the support.

## Where the evidence is contested or thin
Honest accounting of disagreements, gaps, and weak spots. What is genuinely
unknown. Where the good studies conflict. What would need to be true for the
bottom line to be wrong.

## Confidence and caveats
How much to trust this and why. What could change the conclusion. What was out
of scope.

## Sources
Numbered list, each with a one-line note on what it contributed and how strong
it is. Link where possible.
```

## Calibrate depth to the ask

A person asking "is creatine actually safe long-term" wants a tight, sourced
answer, not a forty-page monograph. A person writing a grant background section
wants exhaustive coverage. Match the effort to the stakes. When unsure, ask
whether they want a focused brief or a comprehensive review. The structure above
scales both ways: a brief may be one page, a review may run long, but both carry
sources and both flag uncertainty.

## The honesty clause

The single most valuable thing this skill produces is a report that does not
overstate itself. It is always better to say "the evidence here is thin and
mostly from one lab" than to manufacture false confidence. If the research does
not support a clean answer, say so plainly and explain why. A user who trusts
that you will tell them when the ground is soft will trust everything else you
say. That trust is the entire product.

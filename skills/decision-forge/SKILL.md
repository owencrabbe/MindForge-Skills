---
name: decision-forge
description: >-
  Structures a hard decision under uncertainty into a rigorous, defensible
  analysis: options, criteria, probabilities, expected value, reversibility, and
  a clear recommendation. Use this skill whenever the user is "trying to decide,"
  "weighing options," "torn between," "not sure whether to," "should I," "which
  should I pick," "how do I choose," or facing a consequential choice with real
  uncertainty and tradeoffs. Also trigger when the user is stuck in analysis
  paralysis, going in circles, or has a big irreversible commitment ahead (a job,
  a hire, a large purchase, a strategic bet, a partnership). Prefer this over a
  quick opinion any time the decision is consequential, the tradeoffs are
  genuine, and the user would benefit from seeing the reasoning laid bare rather
  than just hearing an answer.
---

# Decision Forge

Most bad decisions are not bad luck. They come from reasoning that never got
written down: options that were never named, a criterion that quietly dominated
everything, a probability that was felt but never stated, a risk that was
irreversible but treated as routine. This skill drags the whole decision into
the open where it can be examined. The output is not just a recommendation but a
transparent chain of reasoning the user can inspect, argue with, and own.

## Principles that drive good decisions

Before the mechanics, four ideas that do most of the work:

- **Reversibility changes everything.** A decision you can undo cheaply deserves
  speed and a bias to action; you will learn more by trying than by analyzing.
  A one-way door deserves patience and a high bar. Always classify the decision
  on this axis first, because it sets how much rigor is even warranted.
- **Expected value, not best case.** Weigh each option by its full distribution
  of outcomes and their probabilities, not by the outcome the user is hoping
  for. A tempting option with a small chance of ruin is usually worse than it
  looks.
- **The counterfactual and the base rate.** How often do choices like this
  actually work out for people like this? Start from that base rate, then adjust
  for what makes this case genuinely different, not for wishful thinking.
- **Surface the real criteria.** People often argue about options when they
  actually disagree about criteria. Getting the criteria and their weights
  explicit resolves most of the confusion before any option is scored.

## The process

### 1. Define the actual decision

State precisely what is being decided and by when. Flush out the hidden
alternatives: the default of doing nothing, and any option the user has not
considered because it was outside the obvious frame. A decision framed as "A or
B" is often really "A, B, wait, or a combination," and naming the fuller set is
frequently where the answer hides.

### 2. Classify reversibility and stakes

Is this a reversible, low-cost experiment or an irreversible, high-cost
commitment? How consequential is getting it wrong? This determines how much of
the machinery below to deploy. A reversible small bet needs a quick pass; a
one-way door with large stakes earns the full treatment.

### 3. Name the criteria and weight them

What actually matters in this choice, and how much does each factor weigh
relative to the others? Force the weights to be explicit even if approximate.
This is where unspoken priorities become visible. If one criterion secretly
dominates, say so and note that the decision may really be about that one thing.

### 4. Evaluate options against criteria

Score each option on each criterion. Where uncertainty is high, attach rough
probabilities and reason about expected value rather than pretending to
certainty. A simple table is usually the clearest form. Be honest where a score
is a guess versus grounded in evidence.

### 5. Run a pre-mortem

Imagine each leading option has failed badly a year from now. Tell the story of
how it happened. This surfaces risks that forward-looking optimism hides, and it
is one of the highest-yield steps in the whole process. Pay special attention to
failure stories that are both plausible and irreversible.

### 6. Recommend, with the reasoning exposed

Give a clear recommendation. Not "it depends," but an actual answer, with the
reasoning visible and the key uncertainty that could flip it named explicitly.
The user should be able to see exactly why, disagree with a specific input if
they hold different information, and re-derive the conclusion themselves.

## Output format

```
## The decision
[What is being decided, by when, and the full option set including the
non-obvious ones]

## Reversibility and stakes
[One-way or two-way door? How consequential? How much rigor is warranted?]

## What matters (criteria and weights)
- [Criterion] — weight — why it matters
...

## Options scored
[Table or structured comparison of options against criteria, with probabilities
and expected-value reasoning where uncertainty is high]

## Pre-mortem
[For each leading option: the plausible story of how it fails badly]

## Recommendation
[The actual answer, the reasoning, the single biggest uncertainty that would
change it, and — if reversible — the cheapest first step to start learning]
```

## The honest close

The goal is a decision the user can stand behind, not an illusion of precision.
Made-up probabilities dressed as science are worse than an honest "this is
genuinely close and here is the judgment call." When the analysis says the
choice is close, that itself is valuable information: it usually means either
option is fine and the real cost is continuing to deliberate. In that case, the
right counsel is often to pick the more reversible option and move. Deciding well
and deciding forever are different things; help the user do the first without
demanding the second.

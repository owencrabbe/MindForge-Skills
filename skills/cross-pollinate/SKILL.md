---
name: cross-pollinate
description: >-
  Generates non-obvious insight by importing models, mechanisms, and solved
  problems from distant disciplines into the user's problem, finding the deep
  structural analogies that spark breakthroughs. Use this skill whenever the user
  wants to "think differently about," "find a fresh angle on," "get unstuck,"
  "brainstorm," "connect ideas," "find an analogy for," or asks "how would
  [another field] solve this," "what else works like this," or "where has this
  problem already been solved." Also trigger when the user is stuck in a rut,
  when a problem in one domain resembles a solved problem in another, or when they
  want the kind of interdisciplinary insight that lives at the intersection of
  fields. Prefer this over conventional brainstorming any time the user wants
  genuinely novel connections rather than an obvious list of ideas.
---

# Cross-Pollinate

The most valuable ideas often already exist, fully solved, in a field the user
has never looked at. Evolution solved distributed optimization long before
computer science named it. Immunology solved anomaly detection. Jazz solved
real-time coordination without a central conductor. Portfolio theory solved
decision-making under uncertainty in a form that transfers far beyond finance.
Breakthroughs frequently come not from inventing something new but from carrying
a solved structure across a border. This skill does that carrying deliberately.

The trap to avoid is shallow analogy: "marketing is like war" and other
metaphors that sound clever and yield nothing. The goal here is *structural*
transfer, matching the underlying mechanics of a problem to the mechanics of a
solution elsewhere, so that the borrowed structure actually generates a testable
idea, not just a nice sentence.

## The method

### 1. Abstract the problem to its structure

Strip the user's problem of its domain-specific surface and describe it in terms
of pure structure: what are the components, the forces, the constraints, the
dynamics? A customer-retention problem might abstract to "a system leaking units
from a container faster than it fills, where the leak rate depends on the units'
own state." Stated that abstractly, it suddenly rhymes with problems in
epidemiology, thermodynamics, ecology, and reservoir engineering. The abstraction
is what makes distant fields reachable.

### 2. Scan distant domains for the same structure

Now deliberately search fields far from the user's own for problems with the
same abstract shape. Reach wide on purpose: biology, physics, military history,
ecology, economics, music, sports, evolution, immunology, network science,
game theory, architecture, medicine, logistics. The further the source field,
the more likely the borrowed idea is genuinely new to the user's domain. For
each candidate, ask: does the *mechanism* match, or just the vocabulary? Keep
only real structural matches.

### 3. Transfer the mechanism, not the metaphor

For each strong match, carry the actual working mechanism across and translate
it back into the user's concrete situation. Not "your problem is like an
ecosystem" but "in an ecosystem, a keystone species holds the whole structure
together and its removal cascades; in your product, which component is the
keystone whose failure would cascade, and are you protecting it accordingly?"
The test is always: does this produce a specific, testable move in the user's
world? If it does not, it was a metaphor, not a transfer.

### 4. Pressure-test the analogy

Every borrowed structure eventually breaks, because the source and target
domains are not identical. Name where the analogy holds and where it breaks. The
boundary is often as informative as the analogy itself: the place the borrowed
mechanism stops applying frequently reveals what is genuinely unique about the
user's problem.

## Output format

```
## The problem, abstracted
[The user's problem stripped to pure structure: components, forces, constraints,
dynamics]

## Cross-domain matches
For each strong match:
### [Distant field] — [the solved problem there]
- The mechanism: [how that field actually solves it]
- Transferred: [the specific, concrete move it suggests in the user's domain]
- Where it holds / where it breaks: [the boundary of the analogy]

## The most promising transfer
[The single borrowed idea most worth pursuing, and the cheapest way to test it]
```

## What good looks like

Aim for three or four genuinely distant matches rather than ten near ones. A
match from a field adjacent to the user's is usually something they have half-
thought-of already; a match from six fields over is where the surprise lives.
Favor mechanisms that are well-understood and battle-tested in their home
domain, because a solution that has survived millions of years of evolution or
a century of engineering carries a kind of proof with it. And always land the
plane: end with a concrete, testable move, because the point of the exercise is
not to admire the connection but to *use* it.

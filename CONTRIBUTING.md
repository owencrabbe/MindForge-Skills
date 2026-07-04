# Contributing to MindForge

MindForge is a collection of thinking skills for Claude. The whole library holds to one
standard: **a skill has to make Claude think better, not just talk longer.** If your
contribution meets that bar, we want it.

## Ways to contribute

- **New thinking skills** — a distinct mode of reasoning not already covered.
- **Sharper methodology** — improve an existing skill's structure, framing, or triggering.
- **Real examples** — before/after transcripts that show a skill earning its keep.
- **Bug reports** — a skill that mis-triggers, over-triggers, or produces weak output.

## What makes a good MindForge skill

Before you write, read a couple of the existing `SKILL.md` files. They share a house style
worth matching:

1. **One cognitive operation, done deeply.** The six skills map to *learn, decompose, attack,
   decide, question, connect.* A great new skill occupies a clear gap, not an overlap. If it
   substantially duplicates an existing skill, sharpen that one instead.
2. **Explain the *why*.** Don't hand the model a list of commands. Tell it why each step
   matters. Modern models follow reasoning far better than they follow orders, and a skill
   that teaches a method generalizes past the examples you imagined.
3. **Build in honesty.** The skill should flag uncertainty, name what's contested, and know
   when to say "the evidence is thin." Confident nonsense is the failure mode we exist to
   prevent.
4. **End with something usable.** A concrete output format that lands on a verdict, a
   recommendation, or a testable next move — never just "here are some considerations."
5. **A pushy, specific description.** The `description` field is what makes the skill trigger.
   Include both what it does *and* the concrete phrasings/contexts that should invoke it, so
   Claude reaches for it even when the user doesn't name it.

## Skill template

```markdown
---
name: your-skill-name
description: >-
  One or two sentences on what it does, then explicit trigger phrases and
  contexts. Be a little pushy — under-triggering is the common failure. Name the
  words and situations that should invoke it even when the user doesn't ask for
  it by name.
---

# Your Skill Name

A short opening that frames the problem this skill solves and why the default
behavior is inadequate.

## The method

Numbered movements. For each, explain the *why*, not just the *what*.

## Output format

A concrete structure the skill produces, ending in something the user can act on.

## The standard

Close with the principle that keeps the skill honest and useful.
```

## Submitting

1. Fork the repo.
2. Add your skill as `skills/your-skill-name/SKILL.md` (one folder per skill).
3. Add a row to the table in `README.md`.
4. If your skill needs it, register it in `.claude-plugin/plugin.json`.
5. Open a pull request describing what cognitive gap it fills and showing one example of it
   working.

Keep it lean, keep it honest, keep it sharp. Thanks for building.

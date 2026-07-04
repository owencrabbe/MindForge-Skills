<div align="center">

# 🧠 MindForge

### Six PhD-grade thinking skills for Claude. Reason like the top 1%, on any problem.

MindForge turns Claude into a genuine thinking partner — not a faster search box.
Each skill encodes a distinct mode of elite reasoning: rigorous research, first-principles
decomposition, adversarial stress-testing, decision science, Socratic inquiry, and
cross-disciplinary insight.

**Install once. Think sharper forever.**

[Install](#-install) · [The Skills](#-the-six-skills) · [Examples](#-see-it-in-action) · [How Skills Work](#-how-it-works) · [Contribute](#-contributing)

⭐ **If MindForge sharpens your thinking, star the repo — it helps others find it.**

</div>

---

## Why MindForge

Out of the box, an AI assistant will happily give you a fast, confident, plausible answer.
That is exactly the problem. The most consequential thinking — deciding, researching,
arguing, choosing what to build — does not reward fast and plausible. It rewards rigor,
honesty about uncertainty, and the discipline to attack your own ideas before the world does.

MindForge installs that discipline. These are not prompts. They are **skills**: structured
methodologies Claude loads automatically when the moment calls for them, distilled from how
the strongest researchers, strategists, and decision-makers actually think. Every skill was
written to one standard — the output should survive scrutiny from an expert in the field.

## 🔧 Install

MindForge is a Claude Code plugin. Add the marketplace and install in two commands:

```bash
/plugin marketplace add owencrabbe/MindForge-Skills
/plugin install mindforge
```

That's it. All six skills are now available and will trigger automatically when relevant.

**Prefer manual use?** Every skill is a single self-contained `SKILL.md` in [`skills/`](skills/).
Copy any one into your own `.claude/skills/` directory, or paste its contents directly into a
conversation. No dependencies, no setup.

## 🎯 The Six Skills

| Skill | What it does | Triggers when you say |
|-------|-------------|----------------------|
| 🔬 **[deep-research](skills/deep-research/SKILL.md)** | Multi-source, citation-backed investigation that grades its own evidence and admits what it doesn't know | *"research this,"* *"what does the evidence say,"* *"deep dive on…"* |
| ⚛️ **[first-principles](skills/first-principles/SKILL.md)** | Strips a problem to bedrock truths and rebuilds it, exposing the inherited assumption doing the damage | *"why do we even do it this way,"* *"reason this from scratch,"* *"break this down"* |
| ⚔️ **[steelman-redteam](skills/steelman-redteam/SKILL.md)** | Builds the strongest version of an idea, then attacks it to its breaking point — and tells you what survives | *"poke holes in this,"* *"pressure-test my plan,"* *"what am I missing"* |
| ⚖️ **[decision-forge](skills/decision-forge/SKILL.md)** | Turns a hard choice into options, criteria, probabilities, a pre-mortem, and a clear recommendation | *"should I,"* *"torn between,"* *"help me decide"* |
| 💬 **[socratic-partner](skills/socratic-partner/SKILL.md)** | Sharpens *your* reasoning through pointed questions instead of handing you answers | *"be my thinking partner,"* *"challenge me,"* *"help me think through"* |
| 🌐 **[cross-pollinate](skills/cross-pollinate/SKILL.md)** | Imports solved problems from distant fields to crack yours — structural transfer, not shallow metaphor | *"fresh angle on this,"* *"how would biology solve this,"* *"I'm stuck"* |

Each is deliberately narrow and deep. Together they cover the core operations of serious
thought: **learn, decompose, attack, decide, question, connect.**

## 👀 See It In Action

**Instead of a confident guess, `deep-research` gives you a graded verdict:**

> **You:** *Is intermittent fasting actually better than plain calorie restriction for fat loss?*
>
> **MindForge:** *Bottom line — controlled trials that match calorie intake show no meaningful
> fat-loss advantage for fasting over continuous restriction; the benefit people see is almost
> entirely adherence, not metabolism. Confidence: moderate-high, based on several RCTs and two
> meta-analyses. Biggest caveat: most trials run under 6 months… [full evidence breakdown +
> graded sources follow]*

**Instead of agreeing with your plan, `steelman-redteam` finds the flaw before your investors do:**

> **You:** *Pressure-test my plan to undercut competitors on price to win market share.*
>
> **MindForge:** *Steelman first — here's the strongest case for price-led entry… Now the
> red team: your load-bearing assumption is that share won on price is defensible. It usually
> isn't — the same customers leave for the next discounter, and you've now anchored your brand
> and trained the market to wait for cuts. Verdict: survives only if you have a structural cost
> advantage rivals can't match. Do you? …*

**Instead of a metaphor, `cross-pollinate` hands you a testable move:**

> **You:** *I'm stuck on reducing customer churn.*
>
> **MindForge:** *Abstracted, this is a leaking-reservoir problem where the leak rate depends
> on each unit's own state — which is exactly epidemiology's problem. Their move: don't treat
> all leavers equally, find the super-spreaders of churn (accounts whose exit triggers others)
> and stop those first. Concretely: map which cancellations cluster and precede others…*

## 🧩 How It Works

A **skill** is a folder with a `SKILL.md` file: a name, a description of when to use it, and a
body of methodology. Claude reads the descriptions of all available skills and pulls the full
methodology into context only when a task calls for it — so you get expert-level structure
exactly when it's relevant, and zero overhead when it isn't.

MindForge skills share three design principles:

- **Explain the *why*, not just the *what*.** Modern models reason best when they understand
  the purpose behind a step. These skills teach a method, they don't just bark orders.
- **Honesty over confidence.** Every skill is built to flag uncertainty, name what's contested,
  and tell you when the ground is soft. A tool you can trust to say "I don't know" is a tool
  you can trust.
- **End with something usable.** Research ends with a verdict, decisions end with a
  recommendation, analogies end with a testable move. No admiring the problem.

Want to build your own? See [CONTRIBUTING.md](CONTRIBUTING.md).

## 🤝 Contributing

MindForge is open source and built to grow. New thinking skills, sharper methodologies, and
real-world examples are all welcome. The bar is simple: a skill has to make Claude *think
better*, not just talk longer. See [CONTRIBUTING.md](CONTRIBUTING.md) for the guidelines and
the skill template.

## 📄 License

[MIT](LICENSE) — use it, fork it, build on it, ship it.

---

<div align="center">

**Built for people who think for a living.**

⭐ Star the repo · 🍴 Fork it · 🧠 Think sharper

</div>

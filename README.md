# MindForge

Structured reasoning skills for Claude, a reviewed evidence contract, and the browser-local **Phroneme Fitness Lab**. Built by Owen Crabbe.

The original six methods remain available. Version 2 adds a fitness evidence-reading skill, executable provenance checks, failure fixtures, and a working weekly activity journal. The Phroneme application lives in a separate repository; this repository contains the reusable open-source skills and Fitness Lab implementation.

## Try the product

- [Phroneme Fitness Lab](https://www.phroneme.com/fitness-lab/index.html): choose activities and days, record completion, reflect, export JSON or a printable journal, and delete the browser copy.
- [Fitness direction and founder context](https://www.phroneme.com/fitness): Owen’s personally reported 240 lb to 175 lb journey, clearly separate from product efficacy.
- [Owen’s project portfolio](https://owencrabbe.com).

The journal saves to local storage on the same browser profile and device. It has no backend, analytics client, model call, Shopify synchronization, or mailing-list submission. Shared browser users can access that copy; clearing site data removes it. Exported files are under the user’s control.

The evidence explorer is a small reviewed library of general-adult activity guidance. Its **library wording check is deterministic**, matching curated wording and checking declared provenance. A match is not independent verification of scientific truth or personal suitability. Unknown wording returns insufficient evidence. Nothing in this repository establishes improved reasoning, weight loss, or other health outcomes.

## Install the Claude plugin

In Claude Code:

```text
/plugin marketplace add owencrabbe/MindForge-Skills
/plugin install mindforge
```

Skills also work as standalone SKILL.md files in a compatible skills directory. Refer to the [official Claude plugin reference](https://code.claude.com/docs/en/plugins-reference) for installation and discovery behavior.

| Method | Purpose |
| --- | --- |
| [deep-research](skills/deep-research/SKILL.md) | Frame an investigation, assess sources, report uncertainty and limitations. |
| [first-principles](skills/first-principles/SKILL.md) | Separate definitions, observations, assumptions, and hypotheses. |
| [steelman-redteam](skills/steelman-redteam/SKILL.md) | Build a strong case, test its vulnerable assumptions, and retain what survives. |
| [decision-forge](skills/decision-forge/SKILL.md) | Compare options using explicit criteria, uncertainty, and a pre-mortem. |
| [socratic-partner](skills/socratic-partner/SKILL.md) | Help the user inspect their own reasoning through focused questions. |
| [cross-pollinate](skills/cross-pollinate/SKILL.md) | Transfer a structural analogy and propose a way to test it. |
| [fitness-evidence](skills/fitness-evidence/SKILL.md) | Read general fitness evidence with claim/source boundaries and avoid personal medical prescriptions. |

## Run and verify

Node.js 24 is used in CI. There are no npm dependencies.

```sh
npm run verify
npm start
# http://127.0.0.1:4320
claude plugin validate .
```

npm test exercises evidence failures, calendar and completion behavior, malformed storage, export integrity, and escaping. npm run build copies the portable app, evidence catalog, and libraries to public/. The same bundle can be mounted at /fitness-lab/ on the Phroneme site.

Passing fixtures establish the tested software contracts. A controlled comparison of model outputs and any study of behavior or health outcomes remain **NOT RUN**. See [the evaluation protocol](evidence/EVALUATION.md) and [source catalog](evidence/catalog.mjs).

## Evidence and commerce boundaries

Fitness library source records carry a source ID, publisher, public URL, review date, review deadline, active status, and scoped relationships to reviewed claim records. An overdue source stops a catalog-valid result until editorial review. This does not establish that the original guidance became false.

The six reasoning skills and new fitness skill share [an evidence contract](skills/_references/evidence-and-fitness.md). They do not automatically collect customer journals or private health records for research. General educational guidance must retain population and applicability limits.

Shopify assets in [commerce/](commerce/) are separately installable theme components and draft product copy. A real product, destination, store selection, and commerce readiness are required before purchase links or offers become active. The journal does not select products from health inputs. Founder experience is not a product outcome guarantee.

## Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md). Contributions should include a bounded use case, limitations, and meaningful failure fixtures where executable behavior changes. Results from model comparisons should publish budgets, task selection, rubric, failure cases, and null results as well as favorable outcomes.

## License

[MIT](LICENSE). Reuse the source with its license. Personal founder context does not grant rights to impersonate Owen or invent endorsements.

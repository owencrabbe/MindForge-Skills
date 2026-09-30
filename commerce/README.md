# Phroneme founder and weekly practice commerce pack

This pack adds a native Shopify section and a dedicated page template to an existing Online Store 2.0 theme. It is an integration pack, not a complete theme ZIP. Its customer-facing name defaults to **Phroneme**; `mindforge` remains the technical namespace. The public MindForge-Skills reasoning library and the private Phroneme application are separate products.

## What is ready

- `shopify/sections/mindforge-founder.liquid`: founder story, optional real image/video, three-step weekly practice, planner link, optional real journal product, and native Shopify email signup.
- `shopify/locales/en.default.json`: storefront translations. Merge the `mindforge` namespace; do not replace an existing locale file.
- `shopify/locales/en.default.schema.json`: translated theme-editor settings.
- `shopify/templates/page.mindforge.json`: separate landing-page template; it does not change the store’s home page.
- `shopify/install.mjs`: a local installer with dry-run default, conflict checks, and namespace merging. It never connects to Shopify.
- `digital/weekly-journal.html` and `digital/weekly-journal.md`: usable printable and editable worksheets.
- `product-draft.json`: accurate product copy and delivery assets, with no invented price or sale terms.
- `../docs/FOUNDER-CONTENT.md`: three scripts and an initial sequence of eight posts. No content has been posted or sent.

The section has no external JavaScript, no third-party trackers, and no health-history fields. No photo or video is invented. The planner CTA stays hidden until a URL is set; the journal area stays hidden until a real Shopify product is selected. The email form visibly states its marketing purpose, collects only email, uses Shopify’s native `customer` form, and includes error and success states.

## Target and identity

The existing private `owencrabbe/phroneme-shopify` repository records **Phroneme Supply** at `phroneme-supply.myshopify.com`, and an unpublished theme named “Phroneme Supply (draft preview),” in its August 2, 2026 documents. Source inspected: `c74c6e74d099ef6ff90d76f0110efdcc0691436f`. This is historical repository evidence. The current store identity, theme ID, and authentication must be checked before any upload. Do not upload this pack to a different connected “My Store” merely because a connector is available.

The private product’s new intended planner destination is `https://www.phroneme.com/fitness-lab/index.html`; the entry page is `/fitness`. Root integration must verify these after deployment before enabling the public CTA. No legacy production hostname or stale route is copied into a default active link.

## Local installation

Create a branch in the existing private Shopify repository. Run the installer against its **local theme directory** first:

```sh
node commerce/shopify/install.mjs --theme /absolute/path/to/phroneme-shopify/theme --brand Phroneme --planner https://www.phroneme.com/fitness-lab/index.html
```

Review the dry run, then use the same command with `--apply` to add the files locally. The installer preserves all existing top-level locale keys. It refuses a conflicting section, template, or translation namespace before writing any files. The planner argument is optional; omit it until the route has been verified.

Run the official Shopify AI Toolkit Liquid validator against all four installed theme files, then Theme Check against the full theme:

```sh
node /path/to/shopify-liquid/scripts/validate.mjs --theme-path /absolute/path/to/phroneme-shopify/theme --files sections/mindforge-founder.liquid,locales/en.default.json,locales/en.default.schema.json,templates/page.mindforge.json --json
shopify theme check --path /absolute/path/to/phroneme-shopify/theme
```

Use the repository’s normal validation command as well. Commit the local changes and keep the existing home page, MAIN theme, checkout, and account settings intact.

## Shopify preview installation

1. Confirm the exact Phroneme store and the ID of the intended unpublished development theme. Inspect the current role before targeting a theme.
2. Use Shopify CLI’s verified current `theme push` command for that store and unpublished theme ID; keep the CLI safeguard that prevents pushing to a live theme. Alternatively, upload a ZIP of the **complete integrated theme**, rather than this partial pack, as an unpublished theme.
3. In the theme editor, create or preview a page using the `mindforge` page template. Keep the page draft until the route, consent behavior, and product links have been checked.
4. Confirm public brand name. Set the planner’s verified URL. Select a real journal product only after its page and file delivery exist.
5. Upload Owen’s own approved photo, or a captioned video with transcript. Add truthful descriptive alt text. The layout works without founder media while the assets are being collected.
6. Check mobile, desktop, keyboard focus, video controls, transcript, empty product/media states, and link destinations. Check invalid email and successful subscription through the real Shopify preview only with an approved test address.
7. Keep publication, public checkout, campaigns, and product activation separate from preview work. This pack performs none of those actions.

## Journal offer

The two journal files can be reviewed and used now. The product draft promises only files that exist. Decide whether it is a free resource or a paid offer, set any actual price, configure real file delivery, and test a download before the product is presented as available. This pack does not install a digital-download app, activate a product, invent reviews, or assert that the worksheet improves health outcomes.

## Evidence and limits

Owen’s 240 lb to 175 lb change and visible abs are his stated personal experience. The section does not attribute that change to Phroneme, a supplement, or a specific unreported method. Neither this planning worksheet nor the founder story demonstrates a product-induced health outcome.

Official references used for implementation: [Shopify email consent](https://shopify.dev/docs/storefronts/themes/customer-engagement/email-consent), [input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings), [video_tag](https://shopify.dev/docs/api/liquid/filters/video_tag), [theme accessibility requirements](https://shopify.dev/docs/storefronts/themes/store/requirements), and [ValidSchemaName](https://shopify.dev/docs/storefronts/themes/tools/theme-check/checks/valid-schema-name).

See `validation.json` for observed local validation. Remote theme rendering, email consent, digital delivery, and checkout have not been verified by this pack.

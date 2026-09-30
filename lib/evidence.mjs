import { catalogSources, catalogClaims } from '../evidence/catalog.mjs';

const freeze = value => {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
};
export const sources = freeze(catalogSources);
export const claims = freeze(catalogClaims);

const assurance = 'Checks curated catalog wording, declared relationships, and review metadata. It does not independently verify scientific truth, personal suitability, or model performance.';
const normalize = text => text.normalize('NFKC').trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '').toLowerCase();
const validDay = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value;
};
const currentDay = () => new Date().toISOString().slice(0, 10);
const unique = array => new Set(array).size === array.length;
const safeURL = value => {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password; }
  catch { return false; }
};

/** Structural/catalog validation, NOT an automated clinical or entailment judgment.
 * Required record: {id, text, sourceIds}. Catalog objects are also accepted.
 * Options permit explicit asOf dates and isolated fixture catalogs for offline tests.
 */
export function validateClaim(record, { asOf = currentDay(), sourceCatalog = sources, claimCatalog = claims } = {}) {
  const errors = [];
  const warnings = [];
  const fail = (code, message) => errors.push({ code, message });
  const outcome = () => ({ valid: errors.length === 0, status: errors.length ? 'invalid' : 'catalog-valid', errors, warnings, claimId: record?.id ?? null, sourceIds: Array.isArray(record?.sourceIds) ? [...record.sourceIds] : [], assurance });
  if (!validDay(asOf)) fail('invalid-as-of', 'The review date must be a real YYYY-MM-DD date.');
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    fail('invalid-record', 'A claim record must be an object.');
    return outcome();
  }
  const fields = new Set(['id', 'title', 'text', 'sourceIds', 'scope', 'caveat', 'acceptedPhrases']);
  if (Object.keys(record).some(key => !fields.has(key))) fail('unknown-field', 'The record has an undeclared field. Recommendations and dosing cannot be appended to this contract.');
  if (typeof record.id !== 'string' || !record.id) fail('missing-claim-id', 'A catalog claim ID is required.');
  if (typeof record.text !== 'string' || !record.text.trim() || record.text.length > 2000) fail('invalid-text', 'Claim text must be a nonempty string of at most 2000 characters.');
  if (!Array.isArray(record.sourceIds) || !record.sourceIds.length || !record.sourceIds.every(id => typeof id === 'string' && id)) {
    fail('invalid-source-ids', 'At least one nonempty source ID is required.');
  } else if (!unique(record.sourceIds)) fail('duplicate-source-id', 'Each source ID may appear only once.');
  if (!Array.isArray(sourceCatalog) || !Array.isArray(claimCatalog)) {
    fail('invalid-catalog', 'Source and claim catalogs must be arrays.');
    return outcome();
  }
  if (!unique(sourceCatalog.map(source => source?.id)) || !unique(claimCatalog.map(claim => claim?.id))) fail('duplicate-catalog-id', 'Catalog identifiers must be unique.');
  const declared = claimCatalog.find(claim => claim?.id === record.id);
  if (!declared) fail('unknown-claim', 'This claim ID has not been reviewed in the curated catalog.');
  else {
    if (typeof declared.text !== 'string' || !declared.text.trim() || !Array.isArray(declared.sourceIds) || !declared.sourceIds.length || !declared.sourceIds.every(id => typeof id === 'string' && id) || !unique(declared.sourceIds) || typeof declared.scope !== 'string' || !declared.scope.trim() || typeof declared.caveat !== 'string' || !declared.caveat.trim()) {
      fail('invalid-catalog-claim', 'The declared catalog relationship, text, scope, or caveat is malformed.');
      return outcome();
    }
    if (typeof record.text === 'string' && normalize(record.text) !== normalize(declared.text)) fail('changed-claim-text', 'The claim text differs from the reviewed catalog statement.');
    if (record.scope !== undefined && record.scope !== declared.scope) fail('changed-scope', 'The scope differs from the reviewed catalog statement.');
    if (record.caveat !== undefined && record.caveat !== declared.caveat) fail('changed-caveat', 'The limitation differs from the reviewed catalog statement.');
    if (Array.isArray(record.sourceIds) && (record.sourceIds.length !== declared.sourceIds.length || record.sourceIds.some(id => !declared.sourceIds.includes(id)))) fail('unsupported-relationship', 'Source IDs do not match the reviewed claim-to-source relationship.');
  }
  for (const id of Array.isArray(record.sourceIds) ? record.sourceIds : []) {
    const source = sourceCatalog.find(candidate => candidate?.id === id);
    if (!source) { fail('unknown-source', `Source ${id} is not in the evidence catalog.`); continue; }
    if (source.status !== 'active') fail('inactive-source', `Source ${id} is withdrawn, inactive, or has no active status.`);
    if (!safeURL(source.url)) fail('invalid-source-url', `Source ${id} needs a valid HTTPS citation URL.`);
    if (typeof source.title !== 'string' || !source.title.trim() || typeof source.publisher !== 'string' || !source.publisher.trim()) fail('missing-source-attribution', `Source ${id} needs a title and publisher.`);
    if (!validDay(source.reviewedAt) || !validDay(source.reviewDueAt)) fail('missing-review-dates', `Source ${id} needs real review and review-due dates.`);
    else {
      if (source.reviewDueAt < source.reviewedAt) fail('invalid-review-order', `Source ${id} has a review deadline before its review.`);
      if (validDay(asOf) && source.reviewedAt > asOf) fail('future-review', `Source ${id} claims a review after the check date.`);
      if (validDay(asOf) && asOf > source.reviewDueAt) fail('review-overdue', `Source ${id} needs editorial re-review. Overdue does not establish that the guidance is false.`);
    }
    if (source.publishedAt === null && source.dateNote) warnings.push({ code: 'publication-date-unavailable', message: `Source ${id} did not display a publication date when reviewed.` });
    else if (!validDay(source.publishedAt)) fail('missing-publication-date', `Source ${id} needs a page date or an explicit unavailable-date note.`);
    else if (validDay(source.reviewedAt) && source.publishedAt > source.reviewedAt) fail('publication-after-review', `Source ${id} has a page date after its review.`);
  }
  return outcome();
}

/** Bounded exact-wording demonstration. No model call, web search, or semantic grading. */
export function reviewClaim(text, options = {}) {
  const base = {
    status: 'insufficient-evidence', matched: false, title: 'No reviewed library match',
    message: 'This wording is outside the reviewed library. MindForge cannot assess it from this small catalog; absence of a match does not show it is false.',
    claim: null, sourceIds: [], sources: [],
    checks: { method: 'exact-normalized-catalog-wording', knownWording: false, catalogValid: false },
    limitations: [assurance, 'No diagnosis, individualized exercise or nutrition plan, supplement dosing, or predicted weight loss is provided.']
  };
  if (typeof text !== 'string' || !text.trim() || text.length > 2000) return { ...base, message: 'Enter a statement of at most 2000 characters. Only reviewed catalog wording can match.' };
  const phrase = normalize(text);
  const claimCatalog = options.claimCatalog ?? claims;
  const sourceCatalog = options.sourceCatalog ?? sources;
  if (!Array.isArray(claimCatalog) || !Array.isArray(sourceCatalog)) return base;
  const claim = claimCatalog.find(entry => entry && typeof entry === 'object' && [entry.text, ...(Array.isArray(entry.acceptedPhrases) ? entry.acceptedPhrases : [])].some(candidate => typeof candidate === 'string' && normalize(candidate) === phrase));
  if (!claim) return base;
  const validation = validateClaim(claim, { ...options, sourceCatalog, claimCatalog });
  if (!validation.valid) return { ...base, title: 'Library record needs review', message: 'The wording matches a library entry, but its record or source review is invalid. No supported result is available.', checks: { ...base.checks, knownWording: true, catalogValid: false }, validation };
  return {
    ...base, status: 'catalog-match', matched: true, title: 'Reviewed library wording match',
    message: 'This wording matches a scoped statement in the reviewed library. Open the cited source and read its limits; this is not a personal recommendation or an independent scientific verification.',
    claim, sourceIds: [...claim.sourceIds], sources: sourceCatalog.filter(source => claim.sourceIds.includes(source.id)),
    checks: { ...base.checks, knownWording: true, catalogValid: true },
    limitations: [claim.scope, claim.caveat, assurance], validation
  };
}

export function getEvidenceSummary({ asOf = currentDay() } = {}) {
  const validations = claims.map(claim => validateClaim(claim, { asOf }));
  return {
    sourceCount: sources.length, claimCount: claims.length,
    reviewedAt: '2026-09-30', reviewDueAt: '2027-03-29',
    method: 'deterministic-curated-catalog', modelEvaluation: 'NOT RUN',
    status: validations.every(result => result.valid) ? 'catalog-current' : 'needs-review',
    validClaimCount: validations.filter(result => result.valid).length,
    assurance,
    boundary: 'A small public evidence-reading demonstration and reflection worksheet; no measured reasoning, adherence, fitness, or health outcome benefit has been established.'
  };
}

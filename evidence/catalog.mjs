// Original MindForge paraphrases of public agency guidance; no agency endorsement.
// Reviewed 2026-09-30. Dates below describe source pages and our editorial review.
export const catalogSources = [
  {
    id: 'cdc-adult-activity',
    title: 'Adult Activity: An Overview',
    publisher: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/physical-activity-basics/guidelines/adults.html',
    publishedAt: '2023-12-20',
    reviewedAt: '2026-09-30',
    reviewDueAt: '2027-03-29',
    status: 'active',
    summary: 'Public adult activity guidance describes weekly aerobic and muscle-strengthening activity and allows activity to be spread across the week.',
    scope: 'General adult physical activity guidance, not a personal exercise prescription.'
  },
  {
    id: 'cdc-adding-activity',
    title: 'Adding Physical Activity as an Adult',
    publisher: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/physical-activity-basics/adding-adults/index.html',
    publishedAt: '2025-12-04',
    reviewedAt: '2026-09-30',
    reviewDueAt: '2027-03-29',
    status: 'active',
    summary: 'Practical guidance includes enjoyable activities that fit your abilities, weekly tracking, and circumstances where a doctor should help determine suitable activity.',
    scope: 'General adult planning and tracking; suitability depends on individual circumstances.'
  },
  {
    id: 'hhs-activity-planner',
    title: 'Move Your Way Activity Planner',
    publisher: 'U.S. Department of Health and Human Services, ODPHP',
    url: 'https://odphp.health.gov/moveyourway/activity-planner',
    publishedAt: null,
    dateNote: 'No publication date displayed on the page when reviewed.',
    reviewedAt: '2026-09-30',
    reviewDueAt: '2027-03-29',
    status: 'active',
    summary: 'A public planner lets adults choose activities, set goals, and print a plan for tracking.',
    scope: 'Evidence of what the agency planner offers; not a study of MindForge effectiveness.'
  }
];

export const catalogClaims = [
  {
    id: 'adult-aerobic-guideline',
    title: 'A general weekly aerobic guideline',
    text: 'CDC guidance for adults describes at least 150 minutes of moderate-intensity aerobic activity per week, or 75 minutes of vigorous activity, or an equivalent combination.',
    sourceIds: ['cdc-adult-activity'],
    scope: 'General adult guidance, not a personalized target or a weight-loss promise.',
    caveat: 'The right activity and progression depend on your circumstances. A clinician can help when a condition or other concern affects what is suitable.',
    acceptedPhrases: ['CDC recommends 150 minutes of moderate-intensity aerobic activity a week for adults, or 75 minutes of vigorous activity, or an equivalent combination.']
  },
  {
    id: 'adult-strength-guideline',
    title: 'Strengthening activity is part of the mix',
    text: 'CDC guidance for adults also includes muscle-strengthening activity on at least two days a week, working all major muscle groups.',
    sourceIds: ['cdc-adult-activity'],
    scope: 'General adult guidance; this does not specify exercises, loads, or injury rehabilitation.',
    caveat: 'MindForge does not decide whether a particular exercise is appropriate for you.',
    acceptedPhrases: ['CDC recommends muscle-strengthening activities that work all major muscle groups on two or more days a week for adults.']
  },
  {
    id: 'spread-activity',
    title: 'Activity can be spread through the week',
    text: 'CDC says adults can spread weekly physical activity across the week and break it into smaller chunks of time.',
    sourceIds: ['cdc-adult-activity'],
    scope: 'Scheduling flexibility within general adult activity guidance.',
    caveat: 'This statement does not imply every activity has the same intensity or that a short session guarantees a particular outcome.',
    acceptedPhrases: ['Adults can spread activity across the week and break it into smaller chunks.']
  },
  {
    id: 'choose-fitting-activities',
    title: 'Choose activity that fits',
    text: 'CDC suggests choosing physical activities you enjoy and that match your abilities when planning how to keep active.',
    sourceIds: ['cdc-adding-activity'],
    scope: 'A planning suggestion for adults, not proof that a specific habit tool improves adherence.',
    caveat: 'Enjoyment alone does not establish safety or effectiveness for an individual.',
    acceptedPhrases: ['Choose physical activities you enjoy and that match your abilities.']
  },
  {
    id: 'planner-purpose',
    title: 'Plan, then record what happened',
    text: 'The HHS Move Your Way Activity Planner helps adults set goals, choose activities, and print a plan to track activity during the week.',
    sourceIds: ['hhs-activity-planner'],
    scope: 'Description of an existing public planner, not an efficacy claim about MindForge.',
    caveat: 'MindForge offers a separate reflection worksheet. Linking this planner does not imply agency endorsement or measured benefits.',
    acceptedPhrases: ['The Move Your Way Activity Planner lets adults set goals, choose activities, and print a weekly plan.']
  }
];

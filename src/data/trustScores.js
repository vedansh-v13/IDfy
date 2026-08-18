/**
 * Trust Scores calculation utility.
 * Calculates trust scores and badges deterministically based on owner data.
 */

export function computeTrustScore(owner, rentalsCompleted = 0) {
  let score = 50;

  // 1. Verification Tier
  // Since all listing owners in this prototype are Tier 2 (ID + Address + Payout), they get +20.
  // We can also check if the owner object itself specifies a tier, default to T2.
  const tier = owner.tier || 'T2';
  if (tier === 'T3') {
    score += 25;
  } else if (tier === 'T2') {
    score += 20;
  } else if (tier === 'T1') {
    score += 15;
  }

  // 2. Rentals completed
  const rentals = rentalsCompleted || owner.completedRentals || 0;
  if (rentals >= 20) {
    score += 15;
  } else if (rentals >= 10) {
    score += 10;
  } else if (rentals >= 5) {
    score += 5;
  }

  // 3. Response speed
  const responseTime = owner.responseTime || '';
  if (responseTime.includes('within an hour') || responseTime.toLowerCase().includes('1 hour')) {
    score += 10;
  } else if (responseTime.includes('within 2 hours') || responseTime.toLowerCase().includes('2 hours')) {
    score += 7;
  } else if (responseTime.includes('within 4 hours') || responseTime.toLowerCase().includes('4 hours')) {
    score += 4;
  }

  // 4. Account age
  const joined = owner.joined || '';
  if (joined.includes('2022') || joined.includes('2021') || joined.includes('2020')) {
    score += 5;
  } else if (joined.includes('2023')) {
    score += 3;
  } else if (joined.includes('March 2024') || joined.includes('Jan 2024') || joined.includes('Feb 2024')) {
    score += 2;
  }

  // Cap at 100
  return Math.min(100, score);
}

export function getTrustLevel(score) {
  if (score >= 90) return 'Exceptional';
  if (score >= 75) return 'High';
  if (score >= 60) return 'Good';
  return 'Building';
}

export function computeBadges(owner, rentalsCompleted = 0) {
  const badges = [];

  // 1. Trusted Owner (uncommon, earned: >= 20 completed rentals)
  const rentals = rentalsCompleted || owner.completedRentals || 0;
  if (rentals >= 20) {
    badges.push({
      id: 'trusted_owner',
      label: 'Trusted Owner',
      description: 'Completed 20+ rentals with a perfect history.'
    });
  }

  // 2. Fast Responder (earned: response time within 1 hour)
  const responseTime = owner.responseTime || '';
  if (responseTime.includes('within an hour') || responseTime.toLowerCase().includes('1 hour')) {
    badges.push({
      id: 'fast_responder',
      label: 'Fast Responder',
      description: 'Typically replies to messages within an hour.'
    });
  }

  return badges;
}

export function getTopBadge(badges) {
  if (!badges || badges.length === 0) return null;
  // Prioritize Trusted Owner over Fast Responder
  const trustedOwner = badges.find(b => b.id === 'trusted_owner');
  if (trustedOwner) return trustedOwner;
  const fastResponder = badges.find(b => b.id === 'fast_responder');
  if (fastResponder) return fastResponder;
  return null;
}

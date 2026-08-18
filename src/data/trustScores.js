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
  
  // All listed owners are T2 verified (Identity Verified)
  badges.push({
    id: 'id_verified',
    label: 'Identity Verified',
    description: 'Government ID, selfie, and address verification completed.'
  });

  const rentals = rentalsCompleted || owner.completedRentals || 0;
  if (rentals >= 10) {
    badges.push({
      id: 'consistent_owner',
      label: 'Consistent Owner',
      description: 'Completed 10+ rentals with no safety issues.'
    });
  }

  const responseTime = owner.responseTime || '';
  if (responseTime.includes('within an hour') || responseTime.includes('within 2 hours')) {
    badges.push({
      id: 'fast_responder',
      label: 'Fast Responder',
      description: 'Consistently replies to messages within 2 hours.'
    });
  }

  return badges;
}

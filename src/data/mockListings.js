import { itemDetailsData } from './itemDetailsData.js';
import { computeTrustScore, getTrustLevel, computeBadges, getTopBadge } from './trustScores.js';

export const mockListings = [
  {
    id: '1',
    title: 'Hasselblad X2D 100C',
    category: 'Cameras',
    pricePerDay: 34000,
    rating: '4.9',
    distance: '1.9 km',
    rentalsCompleted: 14,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Leica M11 Rangefinder',
    category: 'Cameras',
    pricePerDay: 12000,
    rating: '5.0',
    distance: '5.5 km',
    rentalsCompleted: 22,
    availableFrom: 'Available tomorrow',
    imageUrl: 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'RED V-Raptor 8K Cinema',
    category: 'Cameras',
    pricePerDay: 35000,
    rating: '5.0',
    distance: '3.4 km',
    rentalsCompleted: 8,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Sony a7R V Mirrorless',
    category: 'Cameras',
    pricePerDay: 6000,
    rating: '4.8',
    distance: '2.9 km',
    rentalsCompleted: 19,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'Phase One IQ4 150MP',
    category: 'Cameras',
    pricePerDay: 40000,
    rating: '5.0',
    distance: '4.0 km',
    rentalsCompleted: 3,
    availableFrom: 'Available Sep 10',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    title: 'Sigma fp L Mirrorless',
    category: 'Cameras',
    pricePerDay: 5000,
    rating: '4.6',
    distance: '6.8 km',
    rentalsCompleted: 11,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '7',
    title: 'Leica 50mm f/0.95 Noctilux',
    category: 'Lenses',
    pricePerDay: 6000,
    rating: '4.9',
    distance: '1.8 km',
    rentalsCompleted: 16,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    title: 'Nikon Z 58mm f/0.95 Noct',
    category: 'Lenses',
    pricePerDay: 7000,
    rating: '4.8',
    distance: '4.8 km',
    rentalsCompleted: 25,
    availableFrom: 'Available tomorrow',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '9',
    title: 'DJI Inspire 3 Cinema Drone',
    category: 'Drones',
    pricePerDay: 22000,
    rating: '4.8',
    distance: '8.2 km',
    rentalsCompleted: 12,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '10',
    title: 'DJI Mavic 3 Pro Cine',
    category: 'Drones',
    pricePerDay: 9000,
    rating: '4.9',
    distance: '2.4 km',
    rentalsCompleted: 18,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '11',
    title: 'Pioneer DJ DDJ-REV7 Deck',
    category: 'Studio',
    pricePerDay: 10000,
    rating: '4.9',
    distance: '6.4 km',
    rentalsCompleted: 31,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '12',
    title: 'Shure SM7B Vocal Microphone',
    category: 'Studio',
    pricePerDay: 2000,
    rating: '4.7',
    distance: '0.8 km',
    rentalsCompleted: 45,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '13',
    title: 'Aputure LS 600d Pro Light',
    category: 'Studio',
    pricePerDay: 6000,
    rating: '4.8',
    distance: '4.5 km',
    rentalsCompleted: 2,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '14',
    title: 'Sony VPL-XW5000ES Projector',
    category: 'Studio',
    pricePerDay: 12000,
    rating: '4.7',
    distance: '6.0 km',
    rentalsCompleted: 9,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '15',
    title: 'PlayStation 5 Console',
    category: 'Gaming',
    pricePerDay: 2500,
    rating: '4.9',
    distance: '1.9 km',
    rentalsCompleted: 54,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '16',
    title: 'Xbox Series X Console',
    category: 'Gaming',
    pricePerDay: 2500,
    rating: '4.9',
    distance: '3.9 km',
    rentalsCompleted: 41,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '17',
    title: 'Apple Vision Pro VR Headset',
    category: 'Gaming',
    pricePerDay: 9500,
    rating: '4.8',
    distance: '8.4 km',
    rentalsCompleted: 6,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '18',
    title: 'The North Face VE 25 Tent',
    category: 'Outdoor',
    pricePerDay: 3500,
    rating: '4.7',
    distance: '10.3 km',
    rentalsCompleted: 15,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '19',
    title: 'Sony FE 70-200mm GM II Lens',
    category: 'Lenses',
    pricePerDay: 5500,
    rating: '4.8',
    distance: '5.8 km',
    rentalsCompleted: 0,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '20',
    title: 'Arc\'teryx Alpha SV Shell',
    category: 'Clothing',
    pricePerDay: 2500,
    rating: '4.9',
    distance: '1.3 km',
    rentalsCompleted: 29,
    availableFrom: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=800'
  }
];

// Dynamically enrich listings with Trust System scores/levels/badges
mockListings.forEach(listing => {
  const detail = itemDetailsData[listing.id];
  if (detail && detail.owner) {
    listing.trustScore = computeTrustScore(detail.owner, listing.rentalsCompleted);
    listing.trustLevel = getTrustLevel(listing.trustScore);
    const badges = computeBadges(detail.owner, listing.rentalsCompleted);
    listing.topBadge = getTopBadge(badges);
  } else {
    listing.trustScore = 75;
    listing.trustLevel = 'High';
    listing.topBadge = null;
  }
});


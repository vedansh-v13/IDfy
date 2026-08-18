export const itemDetailsData = {
  '1': {
    id: '1',
    title: 'Hasselblad X2D 100C',
    category: 'Cameras',
    pricePerDay: 34000,
    refundableDeposit: 150000,
    distance: '1.9 km',
    rentalsCompleted: 14,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Medium format, 100 MP back-illuminated CMOS sensor. Milled from a single block of aluminum, engineered in Gothenburg, Sweden. Built with 15 stops of dynamic range and 5-axis 7-stop in-body image stabilization.',
    owner: {
      name: 'Aditi Sharma',
      joined: 'Joined March 2024',
      completedRentals: 14,
      responseTime: 'Usually replies within 2 hours',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Excellent condition. Minor cosmetic wear on bottom plate. Sensor is pristine.',
    specifications: {
      'Sensor Type': '100MP Medium Format CMOS',
      'Lens Mount': 'Hasselblad XCD Mount',
      'Battery Included': 'Yes (2x rechargeable Li-ion)',
      'Charger Included': 'Yes (Dual charger + USB-C)',
      'Carrying Case': 'Yes (Minimalist felt pouch)'
    },
    rentalNotes: 'Required: bringing your own high-speed CFexpress Type B memory card.',
    pickupArea: 'Bandra West, Mumbai',
    terms: {
      minDuration: '1 day',
      maxDuration: '14 days',
      lateFees: 'Late returns incur an additional daily rental fee.',
      responsibility: 'Renters are responsible for damage occurring during the rental period.'
    }
  },
  '2': {
    id: '2',
    title: 'Leica M11 Rangefinder',
    category: 'Cameras',
    pricePerDay: 12000,
    refundableDeposit: 50000,
    distance: '5.5 km',
    rentalsCompleted: 22,
    availableFrom: 'Available tomorrow',
    images: [
      'https://images.unsplash.com/photo-1510127852085-5b89ed7c70a7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Full-frame rangefinder camera. Manufactured by hand in Wetzlar, Germany. 60 MP triple resolution sensor. Features a bottomless design with direct battery release access.',
    owner: {
      name: 'Marcus Vance',
      joined: 'Joined October 2023',
      completedRentals: 22,
      responseTime: 'Usually replies within an hour',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Near mint. Screen protector applied since day one.',
    specifications: {
      'Sensor Type': '60MP Full-Frame CMOS',
      'Lens Mount': 'Leica M Mount',
      'Battery Included': 'Yes (BP-SCL7)',
      'Charger Included': 'Yes',
      'Carrying Case': 'Yes (Leica leather case)'
    },
    rentalNotes: 'Required: M-mount lenses only. Manual focus familiarity is expected.',
    pickupArea: 'Brooklyn, New York',
    terms: {
      minDuration: '2 days',
      maxDuration: '10 days',
      lateFees: 'Late returns incur double the daily rate fee.',
      responsibility: 'Renters must use the neck strap at all times.'
    }
  },
  '3': {
    id: '3',
    title: 'RED V-Raptor 8K Cinema',
    category: 'Cameras',
    pricePerDay: 35000,
    refundableDeposit: 150000,
    distance: '3.4 km',
    rentalsCompleted: 8,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'High-end cinema camera. 8K VV 35.4 Megapixel CMOS sensor. Able to record up to 120 fps at 8K, designed for premium cinematographic output.',
    owner: {
      name: 'Elena Rostova',
      joined: 'Joined June 2022',
      completedRentals: 8,
      responseTime: 'Replies within 4 hours',
      cancellationPolicy: 'Cancellation subject to 50% fee if under 48 hours.'
    },
    condition: 'Excellent. Maintained under professional crew supervision.',
    specifications: {
      'Sensor': 'V-RAPTOR 35.4 Megapixel CMOS',
      'Recording Format': 'REDCODE RAW',
      'Battery': 'V-Mount compatible',
      'Output': '12G-SDI'
    },
    rentalNotes: 'Commercial rental only. RTK/RTD positioning and custom insurance required.',
    pickupArea: 'Amsterdam Oud-West, NL',
    terms: {
      minDuration: '2 days',
      maxDuration: '7 days',
      lateFees: 'Late returns charged at ₹50,000/day.',
      responsibility: 'Full production insurance override required.'
    }
  },
  '4': {
    id: '4',
    title: 'Sony a7R V Mirrorless',
    category: 'Cameras',
    pricePerDay: 6000,
    refundableDeposit: 30000,
    distance: '2.9 km',
    rentalsCompleted: 19,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Full-frame mirrorless camera featuring a 61MP back-illuminated Exmor R CMOS sensor and AI processing unit for next-generation autofocus.',
    owner: {
      name: 'Elena Rostova',
      joined: 'Joined June 2022',
      completedRentals: 19,
      responseTime: 'Replies within 4 hours',
      cancellationPolicy: 'Cancellation subject to 50% fee if under 48 hours.'
    },
    condition: 'Pristine, no visible scratches.',
    specifications: {
      'Resolution': '61 Megapixels',
      'Autofocus': 'AI-driven Real-time Tracking',
      'Stabilization': '8-stop in-body'
    },
    rentalNotes: 'Bring your own SD cards (UHS-II recommended).',
    pickupArea: 'Amsterdam Oud-West, NL',
    terms: {
      minDuration: '1 day',
      maxDuration: '10 days',
      lateFees: 'Standard daily fee applies.',
      responsibility: 'Cleanliness check at return.'
    }
  },
  '5': {
    id: '5',
    title: 'Phase One IQ4 150MP',
    category: 'Cameras',
    pricePerDay: 40000,
    refundableDeposit: 200000,
    distance: '4.0 km',
    rentalsCompleted: 3,
    availableFrom: 'Available Sep 10',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200'
    ],
    description: '150 Megapixel medium format camera back built on the Infinity Platform. Designed for ultimate image detail, dynamic range, and tonal rendering.',
    owner: {
      name: 'Aditi Sharma',
      joined: 'Joined March 2024',
      completedRentals: 3,
      responseTime: 'Usually replies within 2 hours',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Studio-use only. Flawless housing.',
    specifications: {
      'Resolution': '151 Megapixels',
      'Sensor': 'Backside Illuminated CMOS',
      'Dynamic Range': '15 stops'
    },
    rentalNotes: 'Requires medium format X-Shutter or digital lens mount familiarity.',
    pickupArea: 'Bandra West, Mumbai',
    terms: {
      minDuration: '2 days',
      maxDuration: '7 days',
      lateFees: 'Double rate for late returns.',
      responsibility: 'Must be returned inside hard case.'
    }
  },
  '6': {
    id: '6',
    title: 'Sigma fp L Mirrorless',
    category: 'Cameras',
    pricePerDay: 5000,
    refundableDeposit: 25000,
    distance: '6.8 km',
    rentalsCompleted: 11,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'The world\'s smallest and lightest pocketable full-frame mirrorless camera, boasting a 61MP Foveon-derived sensor configuration and raw video capability.',
    owner: {
      name: 'Marcus Vance',
      joined: 'Joined October 2023',
      completedRentals: 11,
      responseTime: 'Usually replies within an hour',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Great. Light scuff marks near strap locks.',
    specifications: {
      'Mount': 'L-Mount Alliance',
      'Resolution': '61MP Full-Frame',
      'Weight': '375g'
    },
    rentalNotes: 'Excellent choice for gimbal or drone rigging.',
    pickupArea: 'Brooklyn, New York',
    terms: {
      minDuration: '1 day',
      maxDuration: '14 days',
      lateFees: 'Standard rate applies.',
      responsibility: 'Ensure sensor cover is mounted when swapping lenses.'
    }
  },
  '7': {
    id: '7',
    title: 'Leica 50mm f/0.95 Noctilux',
    category: 'Lenses',
    pricePerDay: 6000,
    refundableDeposit: 40000,
    distance: '1.8 km',
    rentalsCompleted: 16,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Legendary manual focus lens for M-mount rangefinders. Features an extremely wide maximum aperture for ultra-shallow depth of field.',
    owner: {
      name: 'Aditi Sharma',
      joined: 'Joined March 2024',
      completedRentals: 16,
      responseTime: 'Usually replies within 2 hours',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Mint optics. Silky smooth focus throw.',
    specifications: {
      'Focal Length': '50mm',
      'Aperture Range': 'f/0.95 - f/16',
      'Filter Thread': '95mm'
    },
    rentalNotes: 'Recommended for low light photography and portraiture.',
    pickupArea: 'Bandra West, Mumbai',
    terms: {
      minDuration: '1 day',
      maxDuration: '5 days',
      lateFees: 'Standard daily fee applies.',
      responsibility: 'Ensure front and rear caps are kept on when not in use.'
    }
  },
  '8': {
    id: '8',
    title: 'Nikon Z 58mm f/0.95 Noct',
    category: 'Lenses',
    pricePerDay: 7000,
    refundableDeposit: 50000,
    distance: '4.8 km',
    rentalsCompleted: 25,
    availableFrom: 'Available tomorrow',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Groundbreaking manual focus lens engineered for Nikon Z mirrorless cameras. Exceptional rendering, point-light reproduction, and sharpness.',
    owner: {
      name: 'Marcus Vance',
      joined: 'Joined October 2023',
      completedRentals: 25,
      responseTime: 'Usually replies within an hour',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Pristine lens elements. Outer body has slight signs of use.',
    specifications: {
      'Focal Length': '58mm',
      'Mount': 'Nikon Z-Mount',
      'Weight': '2000g'
    },
    rentalNotes: 'Warning: This is a heavy, manually-focused specialty lens.',
    pickupArea: 'Brooklyn, New York',
    terms: {
      minDuration: '1 day',
      maxDuration: '10 days',
      lateFees: '₹12,000/day late fee.',
      responsibility: 'Secure handling required at all times.'
    }
  },
  '9': {
    id: '9',
    title: 'DJI Inspire 3 Cinema Drone',
    category: 'Drones',
    pricePerDay: 22000,
    refundableDeposit: 100000,
    distance: '8.2 km',
    rentalsCompleted: 12,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Full-frame 8K cinema drone system. Features RTK high-precision positioning, omnidirectional obstacle sensing, and a professional dual-control design.',
    owner: {
      name: 'Elena Rostova',
      joined: 'Joined June 2022',
      completedRentals: 12,
      responseTime: 'Replies within 4 hours',
      cancellationPolicy: 'Cancellation subject to 50% fee if under 48 hours.'
    },
    condition: 'Excellent. Maintained under professional crew supervision.',
    specifications: {
      'Resolution': '8K ProRes RAW',
      'Max Speed': '94 km/h',
      'Flight Time': 'Up to 28 mins per set'
    },
    rentalNotes: 'Commercial drone pilot license verification required.',
    pickupArea: 'Amsterdam Oud-West, NL',
    terms: {
      minDuration: '2 days',
      maxDuration: '7 days',
      lateFees: 'Late returns charged at ₹35,000/day.',
      responsibility: 'Aviation liability insurance must be verified.'
    }
  },
  '10': {
    id: '10',
    title: 'DJI Mavic 3 Pro Cine',
    category: 'Drones',
    pricePerDay: 9000,
    refundableDeposit: 40000,
    distance: '2.4 km',
    rentalsCompleted: 18,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Compact drone system featuring a triple-camera system: Hasselblad 4/3 CMOS, 70mm medium tele, and 166mm telephoto camera.',
    owner: {
      name: 'Kaito Sato',
      joined: 'Joined January 2024',
      completedRentals: 18,
      responseTime: 'Usually replies within 2 hours',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Perfect condition, all replacement propellers included.',
    specifications: {
      'Main Camera': 'Hasselblad 20MP 4/3 CMOS',
      'Recording Format': 'Apple ProRes 422 HQ',
      'Weight': '958g'
    },
    rentalNotes: 'FAA registration and recreational flyer safety test (TRUST) required.',
    pickupArea: 'Chamonix, FR',
    terms: {
      minDuration: '1 day',
      maxDuration: '14 days',
      lateFees: 'Standard rate applies.',
      responsibility: 'Renter is responsible for flyaways or collisions.'
    }
  },
  '11': {
    id: '11',
    title: 'Pioneer DJ DDJ-REV7 Deck',
    category: 'Studio',
    pricePerDay: 10000,
    refundableDeposit: 45000,
    distance: '6.4 km',
    rentalsCompleted: 31,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Professional 2-channel scratch-style DJ controller. Built to help you get the most out of Serato DJ Pro performance software.',
    owner: {
      name: 'Aditi Sharma',
      joined: 'Joined March 2024',
      completedRentals: 31,
      responseTime: 'Usually replies within 2 hours',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Excellent. Faders are smooth, platters are balanced.',
    specifications: {
      'Platters': '7-inch Motorized',
      'Mixer Channels': '2 Channels',
      'Software Support': 'Serato DJ Pro, rekordbox'
    },
    rentalNotes: 'DJ software subscription and laptop not included.',
    pickupArea: 'Bandra West, Mumbai',
    terms: {
      minDuration: '1 day',
      maxDuration: '5 days',
      lateFees: 'Standard daily fee applies.',
      responsibility: 'Keep away from liquids. Liquid damage will require replacement.'
    }
  },
  '12': {
    id: '12',
    title: 'Shure SM7B Vocal Microphone',
    category: 'Studio',
    pricePerDay: 2000,
    refundableDeposit: 10000,
    distance: '0.8 km',
    rentalsCompleted: 45,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Industry-standard dynamic microphone for broadcasting, podcasting, and studio vocal tracking. Warm and smooth response.',
    owner: {
      name: 'Kaito Sato',
      joined: 'Joined January 2024',
      completedRentals: 45,
      responseTime: 'Usually replies within 2 hours',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Great. Windscreen cleaned and sanitized.',
    specifications: {
      'Type': 'Dynamic',
      'Polar Pattern': 'Cardioid',
      'Connector': 'XLR'
    },
    rentalNotes: 'Requires an audio interface and XLR cable (not included). Cloudlifter recommended.',
    pickupArea: 'Chamonix, FR',
    terms: {
      minDuration: '1 day',
      maxDuration: '30 days',
      lateFees: 'Standard daily rate.',
      responsibility: 'Returned in clean, dry condition.'
    }
  },
  '13': {
    id: '13',
    title: 'Aputure LS 600d Pro Light',
    category: 'Studio',
    pricePerDay: 6000,
    refundableDeposit: 30000,
    distance: '4.5 km',
    rentalsCompleted: 2,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'High-intensity COB LED light fixture. Extremely bright output, weather-resistant design, and Bowens mount compatibility for light shapers.',
    owner: {
      name: 'Aditi Sharma',
      joined: 'Joined March 2024',
      completedRentals: 2,
      responseTime: 'Usually replies within 2 hours',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Studio condition, includes rolling case and reflector.',
    specifications: {
      'Output': '600W COB LED',
      'Color Temperature': '5600K',
      'Mount': 'Bowens S-Mount'
    },
    rentalNotes: 'Heavy-duty C-Stand recommended for mounting.',
    pickupArea: 'Bandra West, Mumbai',
    terms: {
      minDuration: '1 day',
      maxDuration: '10 days',
      lateFees: 'Standard rate applies.',
      responsibility: 'Handle light bulb with care. Do not touch COB element.'
    }
  },
  '14': {
    id: '14',
    title: 'Sony VPL-XW5000ES Projector',
    category: 'Studio',
    pricePerDay: 12000,
    refundableDeposit: 60000,
    distance: '6.0 km',
    rentalsCompleted: 9,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Native 4K laser home theater projector. Features 2,000 lumens of brightness and advanced HDR processing for immersive viewing.',
    owner: {
      name: 'Marcus Vance',
      joined: 'Joined October 2023',
      completedRentals: 9,
      responseTime: 'Usually replies within an hour',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Excellent. Lens is scratch-free. Laser life has over 18,000 hours left.',
    specifications: {
      'Resolution': 'Native 4K (3844 x 2160)',
      'Light Source': 'Z-Phosphor Laser',
      'Brightness': '2,000 Lumens'
    },
    rentalNotes: 'Includes remote control and power cable. HDMI not included.',
    pickupArea: 'Brooklyn, New York',
    terms: {
      minDuration: '1 day',
      maxDuration: '7 days',
      lateFees: 'Double rate fee applies.',
      responsibility: 'Ensure proper ventilation during use to prevent overheating.'
    }
  },
  '15': {
    id: '15',
    title: 'PlayStation 5 Console',
    category: 'Gaming',
    pricePerDay: 2500,
    refundableDeposit: 15000,
    distance: '1.9 km',
    rentalsCompleted: 54,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Next-generation video game console with ultra-high speed SSD, haptic feedback controllers, and 4K gaming support.',
    owner: {
      name: 'Marcus Vance',
      joined: 'Joined October 2023',
      completedRentals: 54,
      responseTime: 'Usually replies within an hour',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Very clean. Includes 2 DualSense controllers.',
    specifications: {
      'Model': 'PS5 Disc Edition',
      'Storage': '825GB Custom SSD',
      'Controllers': '2x DualSense Wireless'
    },
    rentalNotes: 'All games must be uninstalled prior to return.',
    pickupArea: 'Brooklyn, New York',
    terms: {
      minDuration: '2 days',
      maxDuration: '14 days',
      lateFees: 'Standard rate applies.',
      responsibility: 'Returned inside original box. Protect controllers from drops.'
    }
  },
  '16': {
    id: '16',
    title: 'Xbox Series X Console',
    category: 'Gaming',
    pricePerDay: 2500,
    refundableDeposit: 15000,
    distance: '3.9 km',
    rentalsCompleted: 41,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'The fastest, most powerful Xbox console. Enjoy true 4K gaming, high frame rates, and instantaneous loading times.',
    owner: {
      name: 'Elena Rostova',
      joined: 'Joined June 2022',
      completedRentals: 41,
      responseTime: 'Replies within 4 hours',
      cancellationPolicy: 'Cancellation subject to 50% fee if under 48 hours.'
    },
    condition: 'Great. Minimal dust build-up, fully functional.',
    specifications: {
      'Processor': 'Custom Zen 2 & RDNA 2',
      'Storage': '1TB Custom NVME SSD',
      'Output': '4K @ 120Hz support'
    },
    rentalNotes: 'Includes HDMI cable and power cord.',
    pickupArea: 'Amsterdam Oud-West, NL',
    terms: {
      minDuration: '2 days',
      maxDuration: '14 days',
      lateFees: 'Standard rate applies.',
      responsibility: 'Wiped of account details before return.'
    }
  },
  '17': {
    id: '17',
    title: 'Apple Vision Pro VR Headset',
    category: 'Gaming',
    pricePerDay: 9500,
    refundableDeposit: 75000,
    distance: '8.4 km',
    rentalsCompleted: 6,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Revolutionary spatial computer that blends digital content with the physical world. Immersive VR/AR workspace environment.',
    owner: {
      name: 'Elena Rostova',
      joined: 'Joined June 2022',
      completedRentals: 6,
      responseTime: 'Replies within 4 hours',
      cancellationPolicy: 'Cancellation subject to 50% fee if under 48 hours.'
    },
    condition: 'Perfect. Lenses are free of scratches, includes light seal cushion.',
    specifications: {
      'Displays': 'Dual Micro-OLED 4K',
      'Tracking': 'Eye, Hand, and Voice inputs',
      'Battery Life': 'Up to 2 hours external use'
    },
    rentalNotes: 'Renter must verify device compatibility or configure spatial persona.',
    pickupArea: 'Amsterdam Oud-West, NL',
    terms: {
      minDuration: '1 day',
      maxDuration: '7 days',
      lateFees: '₹12,000/day late fee.',
      responsibility: 'Must be carried in its protective travel case.'
    }
  },
  '18': {
    id: '18',
    title: 'The North Face VE 25 Tent',
    category: 'Outdoor',
    pricePerDay: 3500,
    refundableDeposit: 20000,
    distance: '10.3 km',
    rentalsCompleted: 15,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Premier 3-person expedition tent built to withstand extreme alpine environments. Excellent ventilation and layout structures.',
    owner: {
      name: 'Kaito Sato',
      joined: 'Joined January 2024',
      completedRentals: 15,
      responseTime: 'Usually replies within 2 hours',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Clean, no tears or seam separation. All stakes included.',
    specifications: {
      'Capacity': '3 Persons',
      'Weight': '4.68kg',
      'Seasons': '4-Season Expedition'
    },
    rentalNotes: 'Must be returned completely dry to prevent mold.',
    pickupArea: 'Chamonix, FR',
    terms: {
      minDuration: '2 days',
      maxDuration: '10 days',
      lateFees: 'Standard daily fee applies.',
      responsibility: 'Verify condition before departure.'
    }
  },
  '19': {
    id: '19',
    title: 'Sony FE 70-200mm GM II Lens',
    category: 'Lenses',
    pricePerDay: 5500,
    refundableDeposit: 35000,
    distance: '5.8 km',
    rentalsCompleted: 0,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Premium telephoto zoom lens engineered for Sony mirrorless cameras. Exceptional rendering, extremely fast autofocus, and lightweight build.',
    owner: {
      name: 'Kaito Sato',
      joined: 'Joined January 2024',
      completedRentals: 0,
      responseTime: 'Usually replies within 2 hours',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Pristine optics. Zoom and focus rings are perfect.',
    specifications: {
      'Focal Length': '70-200mm',
      'Mount': 'Sony E-Mount',
      'Weight': '1045g'
    },
    rentalNotes: 'Includes front/rear caps, hood, and carrying case.',
    pickupArea: 'Chamonix, FR',
    terms: {
      minDuration: '1 day',
      maxDuration: '14 days',
      lateFees: 'Standard rate applies.',
      responsibility: 'Ensure front filter is used.'
    }
  },
  '20': {
    id: '20',
    title: 'Arc\'teryx Alpha SV Shell',
    category: 'Clothing',
    pricePerDay: 2500,
    refundableDeposit: 20000,
    distance: '1.3 km',
    rentalsCompleted: 29,
    availableFrom: 'Available now',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Severe condition alpine shell featuring GORE-TEX Pro. Durable, waterproof, and breathable performance barrier.',
    owner: {
      name: 'Kaito Sato',
      joined: 'Joined January 2024',
      completedRentals: 29,
      responseTime: 'Usually replies within 2 hours',
      cancellationPolicy: 'Free cancellation up to 24 hours before pickup.'
    },
    condition: 'Excellent. DWR coating is fully intact, zippers are smooth.',
    specifications: {
      'Fabric': 'N100D Most Rugged 3L GORE-TEX Pro',
      'Size': 'Men\'s Medium',
      'Weight': '485g'
    },
    rentalNotes: 'Return clean. Do not expose to high heat.',
    pickupArea: 'Chamonix, FR',
    terms: {
      minDuration: '1 day',
      maxDuration: '14 days',
      lateFees: 'Standard rate applies.',
      responsibility: 'Cleanliness check at return.'
    }
  }
};

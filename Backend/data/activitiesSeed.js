const Activity = require('../models/Activity');

const activitiesData = [
  // Mumbai, India Activities
  {
    name: 'Gateway of India',
    description: 'Historic arch monument and popular tourist attraction overlooking the Arabian Sea',
    duration: 1,
    category: 'historical',
    location: {
      name: 'Gateway of India',
      address: 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
      city: 'mumbai',
      state: 'maharashtra',
      country: 'india',
      coordinates: { lat: 18.9220, lng: 72.8347 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.3,
    isPopular: true,
    openingHours: {
      monday: '24 hours',
      tuesday: '24 hours',
      wednesday: '24 hours',
      thursday: '24 hours',
      friday: '24 hours',
      saturday: '24 hours',
      sunday: '24 hours'
    },
    tags: ['monument', 'historic', 'photography', 'sunset'],
    searchKeywords: ['gateway', 'india', 'mumbai', 'monument', 'historic', 'colaba']
  },
  {
    name: 'Marine Drive',
    description: 'Famous 3.6 km long boulevard along the Arabian Sea coast, perfect for evening walks',
    duration: 2,
    category: 'outdoor',
    location: {
      name: 'Marine Drive',
      address: 'Marine Drive, Mumbai, Maharashtra',
      city: 'mumbai',
      state: 'maharashtra',
      country: 'india',
      coordinates: { lat: 18.9440, lng: 72.8230 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.5,
    isPopular: true,
    tags: ['walking', 'sunset', 'sea', 'boulevard', 'photography'],
    searchKeywords: ['marine', 'drive', 'mumbai', 'boulevard', 'sea', 'walking']
  },
  {
    name: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya',
    description: 'Formerly Prince of Wales Museum, showcasing Indian art, archaeology, and natural history',
    duration: 3,
    category: 'museums',
    location: {
      name: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya',
      address: '159-161, Mahatma Gandhi Road, Fort, Mumbai, Maharashtra 400023',
      city: 'mumbai',
      state: 'maharashtra',
      country: 'india',
      coordinates: { lat: 18.9267, lng: 72.8321 }
    },
    cost: { amount: 100, currency: 'INR', type: 'paid' },
    rating: 4.2,
    isPopular: true,
    openingHours: {
      monday: 'Closed',
      tuesday: '10:15 AM - 6:00 PM',
      wednesday: '10:15 AM - 6:00 PM',
      thursday: '10:15 AM - 6:00 PM',
      friday: '10:15 AM - 6:00 PM',
      saturday: '10:15 AM - 6:00 PM',
      sunday: '10:15 AM - 6:00 PM'
    },
    tags: ['museum', 'art', 'history', 'culture', 'education'],
    searchKeywords: ['museum', 'prince of wales', 'art', 'history', 'mumbai', 'fort']
  },
  {
    name: 'Leopold Cafe',
    description: 'Historic cafe and bar in Colaba, famous for its colonial charm and delicious food',
    duration: 1.5,
    category: 'restaurants',
    location: {
      name: 'Leopold Cafe',
      address: 'Shahid Bhagat Singh Road, Colaba Causeway, Mumbai, Maharashtra 400001',
      city: 'mumbai',
      state: 'maharashtra',
      country: 'india',
      coordinates: { lat: 18.9200, lng: 72.8330 }
    },
    cost: { amount: 800, currency: 'INR', type: 'paid' },
    rating: 4.1,
    isPopular: true,
    openingHours: {
      monday: '7:30 AM - 12:00 AM',
      tuesday: '7:30 AM - 12:00 AM',
      wednesday: '7:30 AM - 12:00 AM',
      thursday: '7:30 AM - 12:00 AM',
      friday: '7:30 AM - 12:00 AM',
      saturday: '7:30 AM - 12:00 AM',
      sunday: '7:30 AM - 12:00 AM'
    },
    contactInfo: {
      phone: '+91 22 2282 8185'
    },
    tags: ['cafe', 'restaurant', 'historic', 'colonial', 'bar'],
    searchKeywords: ['leopold', 'cafe', 'colaba', 'restaurant', 'historic', 'colonial']
  },

  // Delhi, India Activities
  {
    name: 'Red Fort',
    description: 'Historic fort complex and UNESCO World Heritage Site, symbol of Mughal power',
    duration: 3,
    category: 'historical',
    location: {
      name: 'Red Fort',
      address: 'Netaji Subhash Marg, Lal Qila, Old Delhi, Delhi 110006',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6562, lng: 77.2410 }
    },
    cost: { amount: 50, currency: 'INR', type: 'paid' },
    rating: 4.4,
    isPopular: true,
    openingHours: {
      monday: 'Closed',
      tuesday: '9:30 AM - 4:30 PM',
      wednesday: '9:30 AM - 4:30 PM',
      thursday: '9:30 AM - 4:30 PM',
      friday: '9:30 AM - 4:30 PM',
      saturday: '9:30 AM - 4:30 PM',
      sunday: '9:30 AM - 4:30 PM'
    },
    tags: ['fort', 'mughal', 'unesco', 'historic', 'architecture'],
    searchKeywords: ['red fort', 'lal qila', 'delhi', 'mughal', 'historic', 'unesco']
  },
  {
    name: 'India Gate',
    description: 'War memorial arch dedicated to Indian soldiers who died in World War I',
    duration: 1,
    category: 'historical',
    location: {
      name: 'India Gate',
      address: 'Rajpath, India Gate, New Delhi, Delhi 110003',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6129, lng: 77.2295 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.3,
    isPopular: true,
    tags: ['memorial', 'war', 'monument', 'photography', 'evening'],
    searchKeywords: ['india gate', 'delhi', 'memorial', 'war', 'monument']
  },
  {
    name: 'Lotus Temple',
    description: 'Bahá\'í House of Worship known for its distinctive lotus flower architecture',
    duration: 1.5,
    category: 'religious',
    location: {
      name: 'Lotus Temple',
      address: 'Lotus Temple Rd, Bahapur, Shambhu Dayal Bagh, Kalkaji, New Delhi, Delhi 110019',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5535, lng: 77.2588 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.5,
    isPopular: true,
    openingHours: {
      monday: 'Closed',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '9:00 AM - 7:00 PM'
    },
    tags: ['temple', 'bahai', 'architecture', 'peaceful', 'meditation'],
    searchKeywords: ['lotus temple', 'bahai', 'delhi', 'temple', 'architecture', 'peaceful']
  },
  {
    name: 'Qutub Minar',
    description: 'UNESCO World Heritage Site featuring a 73-meter victory tower and ancient ruins',
    duration: 2,
    category: 'historical',
    location: {
      name: 'Qutub Minar Complex',
      address: 'Mehrauli, New Delhi, Delhi 110030',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5245, lng: 77.1855 }
    },
    cost: { amount: 40, currency: 'INR', type: 'paid' },
    rating: 4.6,
    isPopular: true,
    openingHours: {
      monday: '7:00 AM - 5:00 PM',
      tuesday: '7:00 AM - 5:00 PM',
      wednesday: '7:00 AM - 5:00 PM',
      thursday: '7:00 AM - 5:00 PM',
      friday: '7:00 AM - 5:00 PM',
      saturday: '7:00 AM - 5:00 PM',
      sunday: '7:00 AM - 5:00 PM'
    },
    tags: ['unesco', 'minaret', 'ruins', 'mehrauli'],
    searchKeywords: ['qutub', 'qutb', 'minar', 'mehrauli', 'unesco', 'delhi']
  },
  {
    name: 'Humayun’s Tomb',
    description: 'Mughal emperor Humayun’s mausoleum; precursor to Taj Mahal with Persian gardens',
    duration: 2,
    category: 'historical',
    location: {
      name: 'Humayun’s Tomb',
      address: 'Mathura Rd, Nizamuddin, New Delhi, Delhi 110013',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5933, lng: 77.2507 }
    },
    cost: { amount: 40, currency: 'INR', type: 'paid' },
    rating: 4.6,
    isPopular: true,
    tags: ['mughal', 'garden', 'unesco'],
    searchKeywords: ['humayun tomb', 'nizamuddin', 'mughal', 'unesco']
  },
  {
    name: 'Akshardham Temple',
    description: 'Expansive Hindu temple complex with intricate carvings, exhibitions, and evening water show',
    duration: 3,
    category: 'religious',
    location: {
      name: 'Swaminarayan Akshardham',
      address: 'Noida Mor, Pandav Nagar, New Delhi, Delhi 110092',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6127, lng: 77.2773 }
    },
    cost: { amount: 170, currency: 'INR', type: 'paid' },
    rating: 4.7,
    isPopular: true,
    openingHours: {
      monday: 'Closed',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 8:00 PM',
      sunday: '10:00 AM - 8:00 PM'
    },
    tags: ['temple', 'show', 'architecture'],
    searchKeywords: ['akshardham', 'swaminarayan', 'water show', 'delhi temple']
  },
  {
    name: 'Jama Masjid',
    description: 'One of India’s largest mosques built by Shah Jahan; panoramic views from minaret',
    duration: 1.5,
    category: 'religious',
    location: {
      name: 'Jama Masjid',
      address: 'Jama Masjid Rd, Old Delhi, Delhi 110006',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6507, lng: 77.2334 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.5,
    isPopular: true,
    tags: ['mosque', 'mughal', 'old delhi'],
    searchKeywords: ['jama masjid', 'old delhi', 'mosque', 'shah jahan']
  },
  {
    name: 'Raj Ghat',
    description: 'Memorial dedicated to Mahatma Gandhi with serene lawns and eternal flame',
    duration: 1,
    category: 'historical',
    location: {
      name: 'Raj Ghat',
      address: 'Ring Rd, Daryaganj, New Delhi, Delhi 110006',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6400, lng: 77.2495 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.3,
    isPopular: true,
    tags: ['memorial', 'gandhi', 'garden'],
    searchKeywords: ['raj ghat', 'gandhi memorial', 'delhi']
  },
  {
    name: 'Agrasen ki Baoli',
    description: 'Ancient stepwell with dramatic arches; popular for photography and heritage walks',
    duration: 1,
    category: 'historical',
    location: {
      name: 'Agrasen ki Baoli',
      address: 'Hailey Rd, Connaught Place, New Delhi, Delhi 110001',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6265, lng: 77.2256 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.4,
    isPopular: true,
    tags: ['stepwell', 'heritage', 'photography'],
    searchKeywords: ['agrasen', 'baoli', 'stepwell', 'cp']
  },
  {
    name: 'Hauz Khas Village & Deer Park',
    description: 'Historic reservoir complex with medieval ruins, cafes, art, and a peaceful deer park',
    duration: 2.5,
    category: 'parks',
    location: {
      name: 'Hauz Khas',
      address: 'Hauz Khas, New Delhi, Delhi 110016',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5494, lng: 77.2000 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.4,
    isPopular: true,
    tags: ['ruins', 'lake', 'cafes', 'wildlife'],
    searchKeywords: ['hauz khas', 'deer park', 'lake', 'ruins']
  },
  {
    name: 'Lodhi Garden',
    description: 'Urban park dotted with 15th-century tombs, lawns, and jogging paths',
    duration: 2,
    category: 'parks',
    location: {
      name: 'Lodhi Garden',
      address: 'Lodhi Rd, Lodhi Gardens, New Delhi, Delhi 110003',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5930, lng: 77.2197 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.6,
    isPopular: true,
    tags: ['park', 'tombs', 'jogging'],
    searchKeywords: ['lodhi garden', 'lodi', 'park', 'tombs']
  },
  {
    name: 'Sarojini Nagar Market',
    description: 'Famous street market for fashion bargains, accessories, and street food',
    duration: 2,
    category: 'shopping',
    location: {
      name: 'Sarojini Nagar Market',
      address: 'Sarojini Nagar, New Delhi, Delhi 110023',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5750, lng: 77.1980 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.2,
    isPopular: true,
    tags: ['market', 'shopping', 'budget'],
    searchKeywords: ['sarojini', 'market', 'shopping', 'bargain']
  },
  {
    name: 'Dilli Haat INA',
    description: 'Open-air craft bazaar with regional foods, textiles, and rotating artisan stalls',
    duration: 2,
    category: 'shopping',
    location: {
      name: 'Dilli Haat',
      address: 'Sri Aurobindo Marg, INA, New Delhi, Delhi 110023',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5690, lng: 77.2100 }
    },
    cost: { amount: 30, currency: 'INR', type: 'paid' },
    rating: 4.4,
    isPopular: true,
    tags: ['handicrafts', 'food', 'culture'],
    searchKeywords: ['dilli haat', 'crafts', 'food court', 'ina']
  },
  {
    name: 'Khan Market',
    description: 'Upscale shopping district with bookstores, boutiques, and trendy cafes',
    duration: 1.5,
    category: 'shopping',
    location: {
      name: 'Khan Market',
      address: 'Khan Market, New Delhi, Delhi 110003',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6003, lng: 77.2277 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.3,
    isPopular: true,
    tags: ['shopping', 'cafes', 'books'],
    searchKeywords: ['khan market', 'cafes', 'boutiques']
  },
  {
    name: 'Connaught Place Inner Circle',
    description: 'Colonial-era commercial hub with radial blocks, eateries, bars, and nightlife',
    duration: 2,
    category: 'entertainment',
    location: {
      name: 'Connaught Place',
      address: 'Rajiv Chowk, Connaught Place, New Delhi, Delhi 110001',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6328, lng: 77.2197 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.3,
    isPopular: true,
    tags: ['nightlife', 'shopping', 'heritage'],
    searchKeywords: ['connaught place', 'cp', 'rajiv chowk']
  },
  {
    name: 'Chandni Chowk Food Walk',
    description: 'Iconic Old Delhi lanes offering jalebis, parathas, kebabs, and sweets',
    duration: 2,
    category: 'restaurants',
    location: {
      name: 'Chandni Chowk',
      address: 'Chandni Chowk, Old Delhi, Delhi 110006',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6562, lng: 77.2309 }
    },
    cost: { amount: 300, currency: 'INR', type: 'paid' },
    rating: 4.6,
    isPopular: true,
    tags: ['street food', 'old delhi', 'parathe wali gali'],
    searchKeywords: ['chandni chowk', 'food', 'old delhi']
  },
  {
    name: 'National Museum, Janpath',
    description: 'India’s premier museum with artifacts from Harappan to modern era',
    duration: 3,
    category: 'museums',
    location: {
      name: 'National Museum',
      address: 'Janpath Rd, Rajpath Area, New Delhi, Delhi 110011',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6118, lng: 77.2193 }
    },
    cost: { amount: 20, currency: 'INR', type: 'paid' },
    rating: 4.4,
    isPopular: true,
    tags: ['museum', 'history', 'artifacts'],
    searchKeywords: ['national museum', 'janpath', 'artifacts']
  },
  {
    name: 'National Gallery of Modern Art',
    description: 'Collection of modern and contemporary Indian art near India Gate',
    duration: 2,
    category: 'museums',
    location: {
      name: 'NGMA',
      address: 'Jaipur House, India Gate, New Delhi, Delhi 110003',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6090, lng: 77.2346 }
    },
    cost: { amount: 20, currency: 'INR', type: 'paid' },
    rating: 4.3,
    isPopular: true,
    tags: ['art', 'gallery', 'modern'],
    searchKeywords: ['ngma', 'modern art', 'gallery']
  },
  {
    name: 'National Rail Museum',
    description: 'Outdoor and indoor exhibits on the history of Indian Railways, joy train rides',
    duration: 2,
    category: 'museums',
    location: {
      name: 'National Rail Museum',
      address: 'Chanakyapuri, New Delhi, Delhi 110021',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5856, lng: 77.1790 }
    },
    cost: { amount: 50, currency: 'INR', type: 'paid' },
    rating: 4.4,
    isPopular: true,
    tags: ['family', 'trains', 'history'],
    searchKeywords: ['rail museum', 'chanakyapuri', 'trains']
  },
  {
    name: 'Waste to Wonder Park',
    description: 'Park featuring replicas of world wonders made from industrial scrap',
    duration: 1.5,
    category: 'parks',
    location: {
      name: 'Waste to Wonder',
      address: 'Near Nizammudin Metro Station, New Delhi, Delhi 110013',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5886, lng: 77.2579 }
    },
    cost: { amount: 50, currency: 'INR', type: 'paid' },
    rating: 4.2,
    isPopular: true,
    tags: ['art', 'outdoor', 'replicas'],
    searchKeywords: ['waste to wonder', 'seven wonders', 'park']
  },
  {
    name: 'Sunder Nursery',
    description: 'Heritage park with Mughal-era monuments, lakes, and biodiversity',
    duration: 2,
    category: 'parks',
    location: {
      name: 'Sunder Nursery',
      address: 'Nizamuddin, New Delhi, Delhi 110013',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5939, lng: 77.2433 }
    },
    cost: { amount: 35, currency: 'INR', type: 'paid' },
    rating: 4.6,
    isPopular: true,
    tags: ['garden', 'heritage', 'lake'],
    searchKeywords: ['sunder nursery', 'heritage park', 'nizamuddin']
  },
  {
    name: 'Garden of Five Senses',
    description: 'Themed gardens, sculptures, and pathways ideal for evening strolls',
    duration: 1.5,
    category: 'parks',
    location: {
      name: 'Garden of Five Senses',
      address: 'Said-ul-Ajaib, Saket, New Delhi, Delhi 110030',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5196, lng: 77.1982 }
    },
    cost: { amount: 35, currency: 'INR', type: 'paid' },
    rating: 4.3,
    isPopular: true,
    tags: ['sculpture', 'garden', 'evening'],
    searchKeywords: ['garden of five senses', 'saket', 'delhi garden']
  },
  {
    name: 'Jantar Mantar',
    description: '18th-century astronomical observatory with masonry instruments',
    duration: 1,
    category: 'historical',
    location: {
      name: 'Jantar Mantar',
      address: 'Sansad Marg, Connaught Place, New Delhi, Delhi 110001',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6271, lng: 77.2166 }
    },
    cost: { amount: 25, currency: 'INR', type: 'paid' },
    rating: 4.2,
    isPopular: true,
    tags: ['observatory', 'heritage'],
    searchKeywords: ['jantar mantar', 'observatory', 'cp']
  },
  {
    name: 'Bangla Sahib Gurudwara',
    description: 'Prominent Sikh gurudwara known for its golden dome and community kitchen (langar)',
    duration: 1.5,
    category: 'religious',
    location: {
      name: 'Gurudwara Bangla Sahib',
      address: 'Hanuman Road Area, Connaught Place, New Delhi, Delhi 110001',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6289, lng: 77.2090 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.8,
    isPopular: true,
    tags: ['sikh', 'langar', 'spiritual'],
    searchKeywords: ['bangla sahib', 'gurudwara', 'langar']
  },
  {
    name: 'Nehru Planetarium',
    description: 'Astronomy shows and exhibits inside Teen Murti House complex',
    duration: 1.5,
    category: 'entertainment',
    location: {
      name: 'Nehru Planetarium',
      address: 'Teen Murti Bhavan, New Delhi, Delhi 110011',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6033, lng: 77.2050 }
    },
    cost: { amount: 100, currency: 'INR', type: 'paid' },
    rating: 4.1,
    isPopular: true,
    tags: ['space', 'shows', 'family'],
    searchKeywords: ['nehru planetarium', 'teen murti', 'astronomy']
  },
  {
    name: 'Museum of Illusions, CP',
    description: 'Interactive optical illusion museum great for families and photos',
    duration: 1,
    category: 'entertainment',
    location: {
      name: 'Museum of Illusions',
      address: 'A Block, Connaught Place, New Delhi, Delhi 110001',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6335, lng: 77.2183 }
    },
    cost: { amount: 650, currency: 'INR', type: 'paid' },
    rating: 4.0,
    isPopular: true,
    tags: ['interactive', 'family', 'photos'],
    searchKeywords: ['museum of illusions', 'cp', 'interactive']
  },
  {
    name: 'Select Citywalk Mall',
    description: 'Premium mall in Saket with shopping, cinema, and dining options',
    duration: 2,
    category: 'shopping',
    location: {
      name: 'Select Citywalk',
      address: 'A-3 District Centre, Saket, New Delhi, Delhi 110017',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5286, lng: 77.2193 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.5,
    isPopular: true,
    tags: ['mall', 'cinema', 'dining'],
    searchKeywords: ['select citywalk', 'saket', 'mall']
  },
  {
    name: 'Delhi Zoo (National Zoological Park)',
    description: 'Large zoo with diverse species next to Old Fort (Purana Qila)',
    duration: 2,
    category: 'outdoor',
    location: {
      name: 'National Zoological Park',
      address: 'Mathura Rd, New Delhi, Delhi 110003',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6096, lng: 77.2481 }
    },
    cost: { amount: 80, currency: 'INR', type: 'paid' },
    rating: 4.2,
    isPopular: true,
    tags: ['zoo', 'family', 'outdoor'],
    searchKeywords: ['delhi zoo', 'national zoological park']
  },
  {
    name: 'Purana Qila (Old Fort)',
    description: '16th-century fort with a picturesque moat and evening sound & light show',
    duration: 2,
    category: 'historical',
    location: {
      name: 'Purana Qila',
      address: 'Mathura Rd, Pragati Maidan, New Delhi, Delhi 110003',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6090, lng: 77.2431 }
    },
    cost: { amount: 30, currency: 'INR', type: 'paid' },
    rating: 4.3,
    isPopular: true,
    tags: ['fort', 'show', 'heritage'],
    searchKeywords: ['purana qila', 'old fort', 'sound and light']
  },
  {
    name: 'Kingdom of Dreams (Near Delhi)',
    description: 'Live entertainment and theatrical shows with Indian culture theme (Gurugram)',
    duration: 3,
    category: 'entertainment',
    location: {
      name: 'Kingdom of Dreams',
      address: 'Sector 29, Gurugram, Haryana 122001',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.4670, lng: 77.0725 }
    },
    cost: { amount: 1200, currency: 'INR', type: 'paid' },
    rating: 4.4,
    isPopular: false,
    tags: ['theatre', 'live shows', 'culture'],
    searchKeywords: ['kingdom of dreams', 'shows', 'gurgaon']
  },
  {
    name: 'Mehrauli Archaeological Park',
    description: 'Expansive heritage zone with stepwells, tombs, and ruins near Qutub Minar',
    duration: 2.5,
    category: 'historical',
    location: {
      name: 'Mehrauli Archaeological Park',
      address: 'Mehrauli, New Delhi, Delhi 110030',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5236, lng: 77.1859 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.5,
    isPopular: true,
    tags: ['ruins', 'heritage', 'walks'],
    searchKeywords: ['mehrauli park', 'archaeological', 'heritage walk']
  },
  {
    name: 'Okhla Bird Sanctuary (Edge of Delhi)',
    description: 'Wetland sanctuary popular with birders; seasonal migratory species',
    duration: 2,
    category: 'outdoor',
    location: {
      name: 'Okhla Bird Sanctuary',
      address: 'Noida Phase-2, Uttar Pradesh 201301',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5544, lng: 77.3220 }
    },
    cost: { amount: 30, currency: 'INR', type: 'paid' },
    rating: 4.2,
    isPopular: false,
    tags: ['birds', 'nature', 'wetland'],
    searchKeywords: ['okhla bird sanctuary', 'wetlands', 'birding']
  },
  {
    name: 'Shankar’s International Dolls Museum',
    description: 'Museum featuring a vast collection of dolls from around the world',
    duration: 1,
    category: 'museums',
    location: {
      name: 'Dolls Museum',
      address: 'Bahadur Shah Zafar Marg, New Delhi, Delhi 110002',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.6323, lng: 77.2410 }
    },
    cost: { amount: 50, currency: 'INR', type: 'paid' },
    rating: 4.1,
    isPopular: false,
    tags: ['family', 'museum', 'kids'],
    searchKeywords: ['dolls museum', 'shankar', 'family']
  },
  {
    name: 'India Habitat Centre',
    description: 'Cultural complex hosting art exhibitions, talks, and outdoorsy amphitheatre',
    duration: 1.5,
    category: 'cultural',
    location: {
      name: 'India Habitat Centre',
      address: 'Lodhi Road, New Delhi, Delhi 110003',
      city: 'delhi',
      state: 'delhi',
      country: 'india',
      coordinates: { lat: 28.5866, lng: 77.2190 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.4,
    isPopular: false,
    tags: ['culture', 'events', 'art'],
    searchKeywords: ['india habitat centre', 'ihc', 'exhibitions']
  },

  // Bangalore, India Activities
  {
    name: 'Cubbon Park',
    description: 'Historic park in the heart of Bangalore, perfect for morning walks and relaxation',
    duration: 2,
    category: 'parks',
    location: {
      name: 'Cubbon Park',
      address: 'Kasturba Road, Ambedkar Veedhi, Sampangi Rama Nagar, Bengaluru, Karnataka 560001',
      city: 'bangalore',
      state: 'karnataka',
      country: 'india',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.4,
    isPopular: true,
    openingHours: {
      monday: '6:00 AM - 6:00 PM',
      tuesday: '6:00 AM - 6:00 PM',
      wednesday: '6:00 AM - 6:00 PM',
      thursday: '6:00 AM - 6:00 PM',
      friday: '6:00 AM - 6:00 PM',
      saturday: '6:00 AM - 6:00 PM',
      sunday: '6:00 AM - 6:00 PM'
    },
    tags: ['park', 'nature', 'walking', 'jogging', 'green'],
    searchKeywords: ['cubbon park', 'bangalore', 'park', 'nature', 'walking']
  },
  {
    name: 'Vidhana Soudha',
    description: 'Seat of the state legislature of Karnataka, known for its Dravidian architecture',
    duration: 1,
    category: 'cultural',
    location: {
      name: 'Vidhana Soudha',
      address: 'Dr Ambedkar Veedhi, Sampangi Rama Nagar, Bengaluru, Karnataka 560001',
      city: 'bangalore',
      state: 'karnataka',
      country: 'india',
      coordinates: { lat: 12.9791, lng: 77.5913 }
    },
    cost: { amount: 0, currency: 'INR', type: 'free' },
    rating: 4.2,
    isPopular: true,
    tags: ['architecture', 'government', 'dravidian', 'photography', 'historic'],
    searchKeywords: ['vidhana soudha', 'bangalore', 'karnataka', 'legislature', 'architecture']
  },

  // New York, USA Activities
  {
    name: 'Central Park',
    description: 'Iconic 843-acre park in Manhattan, perfect for walking, cycling, and relaxation',
    duration: 3,
    category: 'parks',
    location: {
      name: 'Central Park',
      address: 'New York, NY 10024, USA',
      city: 'new york',
      state: 'new york',
      country: 'usa',
      coordinates: { lat: 40.7829, lng: -73.9654 }
    },
    cost: { amount: 0, currency: 'USD', type: 'free' },
    rating: 4.7,
    isPopular: true,
    openingHours: {
      monday: '6:00 AM - 1:00 AM',
      tuesday: '6:00 AM - 1:00 AM',
      wednesday: '6:00 AM - 1:00 AM',
      thursday: '6:00 AM - 1:00 AM',
      friday: '6:00 AM - 1:00 AM',
      saturday: '6:00 AM - 1:00 AM',
      sunday: '6:00 AM - 1:00 AM'
    },
    tags: ['park', 'nature', 'walking', 'cycling', 'iconic'],
    searchKeywords: ['central park', 'new york', 'manhattan', 'park', 'nature']
  },
  {
    name: 'Metropolitan Museum of Art',
    description: 'World-renowned art museum with collections spanning 5,000 years of world culture',
    duration: 4,
    category: 'museums',
    location: {
      name: 'Metropolitan Museum of Art',
      address: '1000 5th Ave, New York, NY 10028, USA',
      city: 'new york',
      state: 'new york',
      country: 'usa',
      coordinates: { lat: 40.7794, lng: -73.9632 }
    },
    cost: { amount: 30, currency: 'USD', type: 'paid' },
    rating: 4.6,
    isPopular: true,
    openingHours: {
      monday: 'Closed',
      tuesday: '10:00 AM - 5:00 PM',
      wednesday: '10:00 AM - 5:00 PM',
      thursday: '10:00 AM - 5:00 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '10:00 AM - 5:00 PM'
    },
    contactInfo: {
      phone: '+1 212-535-7710',
      website: 'https://www.metmuseum.org'
    },
    tags: ['museum', 'art', 'culture', 'history', 'education'],
    searchKeywords: ['metropolitan museum', 'met', 'new york', 'art', 'museum']
  },
  {
    name: 'Times Square',
    description: 'Famous commercial intersection and entertainment hub, known for its bright lights',
    duration: 2,
    category: 'entertainment',
    location: {
      name: 'Times Square',
      address: 'Times Square, New York, NY 10036, USA',
      city: 'new york',
      state: 'new york',
      country: 'usa',
      coordinates: { lat: 40.7580, lng: -73.9855 }
    },
    cost: { amount: 0, currency: 'USD', type: 'free' },
    rating: 4.2,
    isPopular: true,
    tags: ['entertainment', 'shopping', 'lights', 'broadway', 'tourist'],
    searchKeywords: ['times square', 'new york', 'broadway', 'entertainment', 'lights']
  },

  // London, UK Activities
  {
    name: 'British Museum',
    description: 'World-famous museum with vast collections of world art and artifacts',
    duration: 4,
    category: 'museums',
    location: {
      name: 'British Museum',
      address: 'Great Russell St, Bloomsbury, London WC1B 3DG, UK',
      city: 'london',
      state: 'england',
      country: 'uk',
      coordinates: { lat: 51.5194, lng: -0.1270 }
    },
    cost: { amount: 0, currency: 'GBP', type: 'free' },
    rating: 4.5,
    isPopular: true,
    openingHours: {
      monday: '10:00 AM - 5:00 PM',
      tuesday: '10:00 AM - 5:00 PM',
      wednesday: '10:00 AM - 5:00 PM',
      thursday: '10:00 AM - 5:30 PM',
      friday: '10:00 AM - 8:30 PM',
      saturday: '10:00 AM - 5:00 PM',
      sunday: '10:00 AM - 5:00 PM'
    },
    contactInfo: {
      phone: '+44 20 7323 8299',
      website: 'https://www.britishmuseum.org'
    },
    tags: ['museum', 'history', 'art', 'culture', 'free'],
    searchKeywords: ['british museum', 'london', 'museum', 'history', 'art']
  },
  {
    name: 'Hyde Park',
    description: 'Large park in central London, perfect for walking, cycling, and outdoor activities',
    duration: 2,
    category: 'parks',
    location: {
      name: 'Hyde Park',
      address: 'Hyde Park, London W2 2UH, UK',
      city: 'london',
      state: 'england',
      country: 'uk',
      coordinates: { lat: 51.5074, lng: -0.1657 }
    },
    cost: { amount: 0, currency: 'GBP', type: 'free' },
    rating: 4.6,
    isPopular: true,
    openingHours: {
      monday: '5:00 AM - 12:00 AM',
      tuesday: '5:00 AM - 12:00 AM',
      wednesday: '5:00 AM - 12:00 AM',
      thursday: '5:00 AM - 12:00 AM',
      friday: '5:00 AM - 12:00 AM',
      saturday: '5:00 AM - 12:00 AM',
      sunday: '5:00 AM - 12:00 AM'
    },
    tags: ['park', 'nature', 'walking', 'cycling', 'serpentine'],
    searchKeywords: ['hyde park', 'london', 'park', 'nature', 'walking']
  },

  // Paris, France Activities
  {
    name: 'Eiffel Tower',
    description: 'Iconic iron lattice tower and symbol of Paris, offering panoramic city views',
    duration: 2,
    category: 'historical',
    location: {
      name: 'Eiffel Tower',
      address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
      city: 'paris',
      state: 'ile-de-france',
      country: 'france',
      coordinates: { lat: 48.8584, lng: 2.2945 }
    },
    cost: { amount: 29, currency: 'EUR', type: 'paid' },
    rating: 4.5,
    isPopular: true,
    openingHours: {
      monday: '9:30 AM - 11:45 PM',
      tuesday: '9:30 AM - 11:45 PM',
      wednesday: '9:30 AM - 11:45 PM',
      thursday: '9:30 AM - 11:45 PM',
      friday: '9:30 AM - 11:45 PM',
      saturday: '9:30 AM - 11:45 PM',
      sunday: '9:30 AM - 11:45 PM'
    },
    contactInfo: {
      website: 'https://www.toureiffel.paris'
    },
    tags: ['tower', 'iconic', 'views', 'photography', 'romantic'],
    searchKeywords: ['eiffel tower', 'paris', 'tower', 'iconic', 'views']
  },
  {
    name: 'Louvre Museum',
    description: 'World\'s largest art museum and historic monument, home to the Mona Lisa',
    duration: 4,
    category: 'museums',
    location: {
      name: 'Louvre Museum',
      address: 'Rue de Rivoli, 75001 Paris, France',
      city: 'paris',
      state: 'ile-de-france',
      country: 'france',
      coordinates: { lat: 48.8606, lng: 2.3376 }
    },
    cost: { amount: 17, currency: 'EUR', type: 'paid' },
    rating: 4.4,
    isPopular: true,
    openingHours: {
      monday: 'Closed',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 9:45 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 9:45 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '9:00 AM - 6:00 PM'
    },
    contactInfo: {
      website: 'https://www.louvre.fr'
    },
    tags: ['museum', 'art', 'mona lisa', 'history', 'culture'],
    searchKeywords: ['louvre', 'museum', 'paris', 'art', 'mona lisa']
  },

  // Tokyo, Japan Activities
  {
    name: 'Senso-ji Temple',
    description: 'Ancient Buddhist temple in Asakusa, Tokyo\'s oldest temple with traditional architecture',
    duration: 2,
    category: 'religious',
    location: {
      name: 'Senso-ji Temple',
      address: '2-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan',
      city: 'tokyo',
      state: 'tokyo',
      country: 'japan',
      coordinates: { lat: 35.7148, lng: 139.7967 }
    },
    cost: { amount: 0, currency: 'JPY', type: 'free' },
    rating: 4.4,
    isPopular: true,
    openingHours: {
      monday: '6:00 AM - 5:00 PM',
      tuesday: '6:00 AM - 5:00 PM',
      wednesday: '6:00 AM - 5:00 PM',
      thursday: '6:00 AM - 5:00 PM',
      friday: '6:00 AM - 5:00 PM',
      saturday: '6:00 AM - 5:00 PM',
      sunday: '6:00 AM - 5:00 PM'
    },
    tags: ['temple', 'buddhist', 'traditional', 'asakusa', 'culture'],
    searchKeywords: ['senso-ji', 'temple', 'tokyo', 'asakusa', 'buddhist']
  },
  {
    name: 'Tokyo Skytree',
    description: 'Broadcasting tower and observation deck offering panoramic views of Tokyo',
    duration: 2,
    category: 'entertainment',
    location: {
      name: 'Tokyo Skytree',
      address: '1-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan',
      city: 'tokyo',
      state: 'tokyo',
      country: 'japan',
      coordinates: { lat: 35.7101, lng: 139.8107 }
    },
    cost: { amount: 2100, currency: 'JPY', type: 'paid' },
    rating: 4.3,
    isPopular: true,
    openingHours: {
      monday: '8:00 AM - 10:00 PM',
      tuesday: '8:00 AM - 10:00 PM',
      wednesday: '8:00 AM - 10:00 PM',
      thursday: '8:00 AM - 10:00 PM',
      friday: '8:00 AM - 10:00 PM',
      saturday: '8:00 AM - 10:00 PM',
      sunday: '8:00 AM - 10:00 PM'
    },
    contactInfo: {
      website: 'https://www.tokyo-skytree.jp'
    },
    tags: ['tower', 'views', 'observation', 'modern', 'photography'],
    searchKeywords: ['tokyo skytree', 'tower', 'tokyo', 'views', 'observation']
  },

  // Sydney, Australia Activities
  {
    name: 'Sydney Opera House',
    description: 'Iconic performing arts venue with distinctive shell-like architecture',
    duration: 2,
    category: 'entertainment',
    location: {
      name: 'Sydney Opera House',
      address: 'Bennelong Point, Sydney NSW 2000, Australia',
      city: 'sydney',
      state: 'new south wales',
      country: 'australia',
      coordinates: { lat: -33.8568, lng: 151.2153 }
    },
    cost: { amount: 43, currency: 'AUD', type: 'paid' },
    rating: 4.6,
    isPopular: true,
    openingHours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: '9:00 AM - 5:00 PM'
    },
    contactInfo: {
      phone: '+61 2 9250 7111',
      website: 'https://www.sydneyoperahouse.com'
    },
    tags: ['opera house', 'architecture', 'performing arts', 'iconic', 'harbour'],
    searchKeywords: ['sydney opera house', 'opera', 'sydney', 'architecture', 'performing arts']
  },
  {
    name: 'Bondi Beach',
    description: 'Famous beach known for surfing, coastal walks, and vibrant beach culture',
    duration: 3,
    category: 'beaches',
    location: {
      name: 'Bondi Beach',
      address: 'Bondi Beach NSW 2026, Australia',
      city: 'sydney',
      state: 'new south wales',
      country: 'australia',
      coordinates: { lat: -33.8915, lng: 151.2767 }
    },
    cost: { amount: 0, currency: 'AUD', type: 'free' },
    rating: 4.5,
    isPopular: true,
    tags: ['beach', 'surfing', 'swimming', 'coastal walk', 'sunset'],
    searchKeywords: ['bondi beach', 'sydney', 'beach', 'surfing', 'coastal']
  },

  // Dubai, UAE Activities
  {
    name: 'Burj Khalifa',
    description: 'World\'s tallest building with observation decks offering stunning city views',
    duration: 2,
    category: 'entertainment',
    location: {
      name: 'Burj Khalifa',
      address: '1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE',
      city: 'dubai',
      state: 'dubai',
      country: 'uae',
      coordinates: { lat: 25.1972, lng: 55.2744 }
    },
    cost: { amount: 149, currency: 'AED', type: 'paid' },
    rating: 4.4,
    isPopular: true,
    openingHours: {
      monday: '8:30 AM - 11:00 PM',
      tuesday: '8:30 AM - 11:00 PM',
      wednesday: '8:30 AM - 11:00 PM',
      thursday: '8:30 AM - 11:00 PM',
      friday: '8:30 AM - 12:00 AM',
      saturday: '8:30 AM - 12:00 AM',
      sunday: '8:30 AM - 11:00 PM'
    },
    contactInfo: {
      website: 'https://www.burjkhalifa.ae'
    },
    tags: ['tower', 'tallest', 'views', 'modern', 'architecture'],
    searchKeywords: ['burj khalifa', 'dubai', 'tower', 'tallest', 'views']
  },
  {
    name: 'Dubai Mall',
    description: 'One of the world\'s largest shopping malls with entertainment and dining options',
    duration: 4,
    category: 'shopping',
    location: {
      name: 'Dubai Mall',
      address: 'Financial Center Road, Downtown Dubai, UAE',
      city: 'dubai',
      state: 'dubai',
      country: 'uae',
      coordinates: { lat: 25.1972, lng: 55.2796 }
    },
    cost: { amount: 0, currency: 'AED', type: 'free' },
    rating: 4.3,
    isPopular: true,
    openingHours: {
      monday: '10:00 AM - 12:00 AM',
      tuesday: '10:00 AM - 12:00 AM',
      wednesday: '10:00 AM - 12:00 AM',
      thursday: '10:00 AM - 12:00 AM',
      friday: '10:00 AM - 12:00 AM',
      saturday: '10:00 AM - 12:00 AM',
      sunday: '10:00 AM - 12:00 AM'
    },
    contactInfo: {
      website: 'https://www.thedubaimall.com'
    },
    tags: ['shopping', 'mall', 'entertainment', 'dining', 'aquarium'],
    searchKeywords: ['dubai mall', 'shopping', 'mall', 'dubai', 'entertainment']
  },

  // Singapore Activities
  {
    name: 'Gardens by the Bay',
    description: 'Nature park featuring futuristic Supertree Grove and climate-controlled conservatories',
    duration: 3,
    category: 'parks',
    location: {
      name: 'Gardens by the Bay',
      address: '18 Marina Gardens Dr, Singapore 018953',
      city: 'singapore',
      state: 'singapore',
      country: 'singapore',
      coordinates: { lat: 1.2816, lng: 103.8636 }
    },
    cost: { amount: 28, currency: 'SGD', type: 'paid' },
    rating: 4.6,
    isPopular: true,
    openingHours: {
      monday: '5:00 AM - 2:00 AM',
      tuesday: '5:00 AM - 2:00 AM',
      wednesday: '5:00 AM - 2:00 AM',
      thursday: '5:00 AM - 2:00 AM',
      friday: '5:00 AM - 2:00 AM',
      saturday: '5:00 AM - 2:00 AM',
      sunday: '5:00 AM - 2:00 AM'
    },
    contactInfo: {
      website: 'https://www.gardensbythebay.com.sg'
    },
    tags: ['gardens', 'nature', 'supertree', 'conservatories', 'futuristic'],
    searchKeywords: ['gardens by the bay', 'singapore', 'gardens', 'supertree', 'nature']
  },
  {
    name: 'Marina Bay Sands',
    description: 'Iconic integrated resort with luxury hotel, casino, and rooftop infinity pool',
    duration: 2,
    category: 'entertainment',
    location: {
      name: 'Marina Bay Sands',
      address: '10 Bayfront Ave, Singapore 018956',
      city: 'singapore',
      state: 'singapore',
      country: 'singapore',
      coordinates: { lat: 1.2833, lng: 103.8607 }
    },
    cost: { amount: 23, currency: 'SGD', type: 'paid' },
    rating: 4.3,
    isPopular: true,
    openingHours: {
      monday: '9:30 AM - 10:00 PM',
      tuesday: '9:30 AM - 10:00 PM',
      wednesday: '9:30 AM - 10:00 PM',
      thursday: '9:30 AM - 10:00 PM',
      friday: '9:30 AM - 10:00 PM',
      saturday: '9:30 AM - 10:00 PM',
      sunday: '9:30 AM - 10:00 PM'
    },
    contactInfo: {
      website: 'https://www.marinabaysands.com'
    },
    tags: ['hotel', 'casino', 'rooftop', 'infinity pool', 'luxury'],
    searchKeywords: ['marina bay sands', 'singapore', 'hotel', 'casino', 'rooftop']
  },

  // Bangkok, Thailand Activities
  {
    name: 'Grand Palace',
    description: 'Former royal residence with stunning Thai architecture and the Temple of the Emerald Buddha',
    duration: 3,
    category: 'historical',
    location: {
      name: 'Grand Palace',
      address: 'Na Phra Lan Rd, Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok 10200, Thailand',
      city: 'bangkok',
      state: 'bangkok',
      country: 'thailand',
      coordinates: { lat: 13.7500, lng: 100.4916 }
    },
    cost: { amount: 500, currency: 'THB', type: 'paid' },
    rating: 4.4,
    isPopular: true,
    openingHours: {
      monday: '8:30 AM - 3:30 PM',
      tuesday: '8:30 AM - 3:30 PM',
      wednesday: '8:30 AM - 3:30 PM',
      thursday: '8:30 AM - 3:30 PM',
      friday: '8:30 AM - 3:30 PM',
      saturday: '8:30 AM - 3:30 PM',
      sunday: '8:30 AM - 3:30 PM'
    },
    tags: ['palace', 'royal', 'temple', 'emerald buddha', 'architecture'],
    searchKeywords: ['grand palace', 'bangkok', 'palace', 'emerald buddha', 'temple']
  },
  {
    name: 'Chatuchak Weekend Market',
    description: 'Massive weekend market with over 15,000 stalls selling everything from food to antiques',
    duration: 4,
    category: 'shopping',
    location: {
      name: 'Chatuchak Weekend Market',
      address: 'Kamphaeng Phet 2 Rd, Chatuchak, Bangkok 10900, Thailand',
      city: 'bangkok',
      state: 'bangkok',
      country: 'thailand',
      coordinates: { lat: 13.7998, lng: 100.5491 }
    },
    cost: { amount: 0, currency: 'THB', type: 'free' },
    rating: 4.2,
    isPopular: true,
    openingHours: {
      monday: 'Closed',
      tuesday: 'Closed',
      wednesday: 'Closed',
      thursday: 'Closed',
      friday: 'Closed',
      saturday: '6:00 AM - 6:00 PM',
      sunday: '6:00 AM - 6:00 PM'
    },
    tags: ['market', 'shopping', 'weekend', 'food', 'antiques'],
    searchKeywords: ['chatuchak', 'market', 'bangkok', 'weekend', 'shopping']
  },

  // Rome, Italy Activities
  {
    name: 'Colosseum',
    description: 'Ancient amphitheater and symbol of Imperial Rome, one of the New Seven Wonders',
    duration: 2,
    category: 'historical',
    location: {
      name: 'Colosseum',
      address: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
      city: 'rome',
      state: 'lazio',
      country: 'italy',
      coordinates: { lat: 41.8902, lng: 12.4922 }
    },
    cost: { amount: 16, currency: 'EUR', type: 'paid' },
    rating: 4.5,
    isPopular: true,
    openingHours: {
      monday: '8:30 AM - 4:30 PM',
      tuesday: '8:30 AM - 4:30 PM',
      wednesday: '8:30 AM - 4:30 PM',
      thursday: '8:30 AM - 4:30 PM',
      friday: '8:30 AM - 4:30 PM',
      saturday: '8:30 AM - 4:30 PM',
      sunday: '8:30 AM - 4:30 PM'
    },
    contactInfo: {
      website: 'https://www.coopculture.it'
    },
    tags: ['colosseum', 'ancient', 'amphitheater', 'rome', 'history'],
    searchKeywords: ['colosseum', 'rome', 'ancient', 'amphitheater', 'history']
  },
  {
    name: 'Vatican Museums',
    description: 'Extensive collection of art and historical artifacts, including the Sistine Chapel',
    duration: 4,
    category: 'museums',
    location: {
      name: 'Vatican Museums',
      address: '00120 Vatican City',
      city: 'vatican city',
      state: 'vatican city',
      country: 'vatican',
      coordinates: { lat: 41.9066, lng: 12.4533 }
    },
    cost: { amount: 17, currency: 'EUR', type: 'paid' },
    rating: 4.4,
    isPopular: true,
    openingHours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '8:00 AM - 6:00 PM',
      sunday: 'Closed'
    },
    contactInfo: {
      website: 'https://www.museivaticani.va'
    },
    tags: ['vatican', 'museums', 'sistine chapel', 'art', 'history'],
    searchKeywords: ['vatican museums', 'sistine chapel', 'vatican', 'art', 'museums']
  },

  // Berlin, Germany Activities
  {
    name: 'Brandenburg Gate',
    description: 'Neoclassical monument and symbol of German unity, one of Berlin\'s most famous landmarks',
    duration: 1,
    category: 'historical',
    location: {
      name: 'Brandenburg Gate',
      address: 'Pariser Platz, 10117 Berlin, Germany',
      city: 'berlin',
      state: 'berlin',
      country: 'germany',
      coordinates: { lat: 52.5163, lng: 13.3777 }
    },
    cost: { amount: 0, currency: 'EUR', type: 'free' },
    rating: 4.4,
    isPopular: true,
    tags: ['gate', 'monument', 'neoclassical', 'symbol', 'unity'],
    searchKeywords: ['brandenburg gate', 'berlin', 'gate', 'monument', 'symbol']
  },
  {
    name: 'Berlin Wall Memorial',
    description: 'Memorial site preserving a section of the Berlin Wall and documenting its history',
    duration: 2,
    category: 'historical',
    location: {
      name: 'Berlin Wall Memorial',
      address: 'Bernauer Str. 111, 13355 Berlin, Germany',
      city: 'berlin',
      state: 'berlin',
      country: 'germany',
      coordinates: { lat: 52.5400, lng: 13.3900 }
    },
    cost: { amount: 0, currency: 'EUR', type: 'free' },
    rating: 4.5,
    isPopular: true,
    openingHours: {
      monday: '8:00 AM - 10:00 PM',
      tuesday: '8:00 AM - 10:00 PM',
      wednesday: '8:00 AM - 10:00 PM',
      thursday: '8:00 AM - 10:00 PM',
      friday: '8:00 AM - 10:00 PM',
      saturday: '8:00 AM - 10:00 PM',
      sunday: '8:00 AM - 10:00 PM'
    },
    contactInfo: {
      website: 'https://www.berliner-mauer-gedenkstaette.de'
    },
    tags: ['wall', 'memorial', 'history', 'cold war', 'documentation'],
    searchKeywords: ['berlin wall', 'memorial', 'berlin', 'wall', 'history']
  },

  // Amsterdam, Netherlands Activities
  {
    name: 'Anne Frank House',
    description: 'Museum dedicated to Jewish wartime diarist Anne Frank, located in her hiding place',
    duration: 2,
    category: 'museums',
    location: {
      name: 'Anne Frank House',
      address: 'Westermarkt 20, 1016 GV Amsterdam, Netherlands',
      city: 'amsterdam',
      state: 'north holland',
      country: 'netherlands',
      coordinates: { lat: 52.3751, lng: 4.8841 }
    },
    cost: { amount: 16, currency: 'EUR', type: 'paid' },
    rating: 4.6,
    isPopular: true,
    openingHours: {
      monday: '9:00 AM - 10:00 PM',
      tuesday: '9:00 AM - 10:00 PM',
      wednesday: '9:00 AM - 10:00 PM',
      thursday: '9:00 AM - 10:00 PM',
      friday: '9:00 AM - 10:00 PM',
      saturday: '9:00 AM - 10:00 PM',
      sunday: '9:00 AM - 10:00 PM'
    },
    contactInfo: {
      website: 'https://www.annefrank.org'
    },
    tags: ['anne frank', 'museum', 'history', 'world war ii', 'diary'],
    searchKeywords: ['anne frank house', 'amsterdam', 'anne frank', 'museum', 'history']
  },
  {
    name: 'Vondelpark',
    description: 'Large public park in Amsterdam, perfect for walking, cycling, and outdoor activities',
    duration: 2,
    category: 'parks',
    location: {
      name: 'Vondelpark',
      address: 'Vondelpark, 1071 Amsterdam, Netherlands',
      city: 'amsterdam',
      state: 'north holland',
      country: 'netherlands',
      coordinates: { lat: 52.3589, lng: 4.8719 }
    },
    cost: { amount: 0, currency: 'EUR', type: 'free' },
    rating: 4.5,
    isPopular: true,
    openingHours: {
      monday: '24 hours',
      tuesday: '24 hours',
      wednesday: '24 hours',
      thursday: '24 hours',
      friday: '24 hours',
      saturday: '24 hours',
      sunday: '24 hours'
    },
    tags: ['park', 'nature', 'walking', 'cycling', 'outdoor'],
    searchKeywords: ['vondelpark', 'amsterdam', 'park', 'nature', 'walking']
  }
];

const seedActivities = async () => {
  try {
    // Clear existing activities
    await Activity.deleteMany({});
    
    // Insert new activities
    const createdActivities = await Activity.insertMany(activitiesData);
    
    console.log(`✅ Successfully seeded ${createdActivities.length} activities`);
    return createdActivities;
  } catch (error) {
    console.error('❌ Error seeding activities:', error);
    throw error;
  }
};

module.exports = { seedActivities, activitiesData };

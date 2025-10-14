// Places data for frontend - copied from backend seed data
export const placesData = [
  // Countries
  {
    _id: '1',
    name: 'India',
    category: 'country',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 20.5937, lng: 78.9629 },
    description: 'Incredible India - land of diverse cultures, ancient traditions, and modern development',
    rating: 4.6,
    isPopular: true,
    searchKeywords: ['india', 'bharat', 'hindustan', 'incredible', 'diverse', 'ancient', 'spiritual']
  },
  {
    _id: '2',
    name: 'United States',
    category: 'country',
    country: 'usa',
    continent: 'north america',
    coordinates: { lat: 39.8283, lng: -98.5795 },
    description: 'Land of opportunities with diverse landscapes, cultures, and world-class cities',
    rating: 4.4,
    isPopular: true,
    searchKeywords: ['usa', 'america', 'united states', 'land of opportunity', 'diverse']
  },
  {
    _id: '3',
    name: 'United Kingdom',
    category: 'country',
    country: 'uk',
    continent: 'europe',
    coordinates: { lat: 55.3781, lng: -3.4360 },
    description: 'Historic kingdom with royal heritage, world-class museums, and charming countryside',
    rating: 4.5,
    isPopular: true,
    searchKeywords: ['uk', 'britain', 'england', 'royal', 'historic', 'museums']
  },
  {
    _id: '4',
    name: 'France',
    category: 'country',
    country: 'france',
    continent: 'europe',
    coordinates: { lat: 46.2276, lng: 2.2137 },
    description: 'Country of art, fashion, cuisine, and romantic landscapes',
    rating: 4.7,
    isPopular: true,
    searchKeywords: ['france', 'french', 'art', 'fashion', 'cuisine', 'romantic']
  },
  {
    _id: '5',
    name: 'Japan',
    category: 'country',
    country: 'japan',
    continent: 'asia',
    coordinates: { lat: 36.2048, lng: 138.2529 },
    description: 'Land of the rising sun, blending ancient traditions with cutting-edge technology',
    rating: 4.8,
    isPopular: true,
    searchKeywords: ['japan', 'japanese', 'tokyo', 'ancient', 'technology', 'sushi', 'anime']
  },
  {
    _id: '6',
    name: 'Australia',
    category: 'country',
    country: 'australia',
    continent: 'oceania',
    coordinates: { lat: -25.2744, lng: 133.7751 },
    description: 'Island continent with unique wildlife, stunning landscapes, and vibrant cities',
    rating: 4.6,
    isPopular: true,
    searchKeywords: ['australia', 'aussie', 'outback', 'wildlife', 'beaches', 'sydney']
  },
  {
    _id: '7',
    name: 'China',
    category: 'country',
    country: 'china',
    continent: 'asia',
    coordinates: { lat: 35.8617, lng: 104.1954 },
    description: 'Ancient civilization with rich history, modern cities, and diverse landscapes',
    rating: 4.3,
    isPopular: true,
    searchKeywords: ['china', 'chinese', 'great wall', 'ancient', 'civilization', 'beijing', 'shanghai']
  },
  {
    _id: '8',
    name: 'Germany',
    category: 'country',
    country: 'germany',
    continent: 'europe',
    coordinates: { lat: 51.1657, lng: 10.4515 },
    description: 'Land of poets and thinkers with rich history, beer culture, and engineering excellence',
    rating: 4.4,
    isPopular: true,
    searchKeywords: ['germany', 'german', 'beer', 'engineering', 'history', 'berlin', 'munich']
  },
  {
    _id: '9',
    name: 'Italy',
    category: 'country',
    country: 'italy',
    continent: 'europe',
    coordinates: { lat: 41.8719, lng: 12.5674 },
    description: 'Boot-shaped country known for art, architecture, cuisine, and romantic cities',
    rating: 4.7,
    isPopular: true,
    searchKeywords: ['italy', 'italian', 'rome', 'venice', 'florence', 'pizza', 'pasta', 'art']
  },
  {
    _id: '10',
    name: 'Spain',
    category: 'country',
    country: 'spain',
    continent: 'europe',
    coordinates: { lat: 40.4637, lng: -3.7492 },
    description: 'Vibrant country with flamenco, bullfighting, beautiful beaches, and rich culture',
    rating: 4.5,
    isPopular: true,
    searchKeywords: ['spain', 'spanish', 'madrid', 'barcelona', 'flamenco', 'beaches', 'culture']
  },
  {
    _id: '11',
    name: 'Canada',
    category: 'country',
    country: 'canada',
    continent: 'north america',
    coordinates: { lat: 56.1304, lng: -106.3468 },
    description: 'Vast country with stunning natural beauty, friendly people, and multicultural cities',
    rating: 4.6,
    isPopular: true,
    searchKeywords: ['canada', 'canadian', 'maple', 'nature', 'toronto', 'vancouver', 'mountains']
  },
  {
    _id: '12',
    name: 'Brazil',
    category: 'country',
    country: 'brazil',
    continent: 'south america',
    coordinates: { lat: -14.2350, lng: -51.9253 },
    description: 'Largest South American country with Amazon rainforest, beaches, and vibrant culture',
    rating: 4.4,
    isPopular: true,
    searchKeywords: ['brazil', 'brazilian', 'amazon', 'rainforest', 'beaches', 'rio', 'samba']
  },
  {
    _id: '13',
    name: 'Russia',
    category: 'country',
    country: 'russia',
    continent: 'europe',
    coordinates: { lat: 61.5240, lng: 105.3188 },
    description: 'Largest country in the world with rich history, literature, and diverse landscapes',
    rating: 4.2,
    isPopular: true,
    searchKeywords: ['russia', 'russian', 'moscow', 'st petersburg', 'literature', 'history', 'vast']
  },
  {
    _id: '14',
    name: 'South Korea',
    category: 'country',
    country: 'south korea',
    continent: 'asia',
    coordinates: { lat: 35.9078, lng: 127.7669 },
    description: 'Dynamic country known for K-pop, technology, cuisine, and traditional culture',
    rating: 4.5,
    isPopular: true,
    searchKeywords: ['south korea', 'korean', 'k-pop', 'seoul', 'technology', 'kimchi', 'k-drama']
  },
  {
    _id: '15',
    name: 'Thailand',
    category: 'country',
    country: 'thailand',
    continent: 'asia',
    coordinates: { lat: 15.8700, lng: 100.9925 },
    description: 'Land of smiles with beautiful temples, beaches, and delicious street food',
    rating: 4.6,
    isPopular: true,
    searchKeywords: ['thailand', 'thai', 'bangkok', 'temples', 'beaches', 'street food', 'smiles']
  },
  {
    _id: '16',
    name: 'Singapore',
    category: 'country',
    country: 'singapore',
    continent: 'asia',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    description: 'Garden city with modern architecture, diverse cuisine, and world-class attractions',
    rating: 4.6,
    isPopular: true,
    searchKeywords: ['singapore', 'garden city', 'marina bay', 'gardens by the bay', 'sentosa', 'chinatown']
  },
  {
    _id: '17',
    name: 'United Arab Emirates',
    category: 'country',
    country: 'uae',
    continent: 'asia',
    coordinates: { lat: 23.4241, lng: 53.8478 },
    description: 'Modern federation with luxury shopping, ultramodern architecture, and desert landscapes',
    rating: 4.4,
    isPopular: true,
    searchKeywords: ['uae', 'emirates', 'dubai', 'abu dhabi', 'luxury', 'desert', 'modern']
  },
  {
    _id: '18',
    name: 'Switzerland',
    category: 'country',
    country: 'switzerland',
    continent: 'europe',
    coordinates: { lat: 46.8182, lng: 8.2275 },
    description: 'Alpine country known for chocolate, watches, banking, and stunning mountain scenery',
    rating: 4.8,
    isPopular: true,
    searchKeywords: ['switzerland', 'swiss', 'alps', 'chocolate', 'watches', 'banking', 'mountains']
  },
  {
    _id: '19',
    name: 'Netherlands',
    category: 'country',
    country: 'netherlands',
    continent: 'europe',
    coordinates: { lat: 52.1326, lng: 5.2913 },
    description: 'Low-lying country famous for tulips, windmills, canals, and cycling culture',
    rating: 4.5,
    isPopular: true,
    searchKeywords: ['netherlands', 'dutch', 'amsterdam', 'tulips', 'windmills', 'canals', 'cycling']
  },
  {
    _id: '20',
    name: 'New Zealand',
    category: 'country',
    country: 'new zealand',
    continent: 'oceania',
    coordinates: { lat: -40.9006, lng: 174.8860 },
    description: 'Island nation with breathtaking landscapes, adventure sports, and Maori culture',
    rating: 4.7,
    isPopular: true,
    searchKeywords: ['new zealand', 'kiwi', 'auckland', 'adventure', 'landscapes', 'maori', 'hobbit']
  },

  // Indian States
  {
    _id: '21',
    name: 'Karnataka',
    category: 'state',
    state: 'karnataka',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 15.3173, lng: 75.7139 },
    description: 'Silicon Valley of India, known for IT industry, ancient temples, and coffee plantations',
    rating: 4.4,
    isPopular: true,
    searchKeywords: ['karnataka', 'bangalore', 'mysore', 'hampi', 'coorg', 'silicon valley', 'it']
  },
  {
    _id: '22',
    name: 'Maharashtra',
    category: 'state',
    state: 'maharashtra',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 19.7515, lng: 75.7139 },
    description: 'Financial capital state with Bollywood, historic forts, and diverse landscapes',
    rating: 4.3,
    isPopular: true,
    searchKeywords: ['maharashtra', 'mumbai', 'pune', 'bollywood', 'forts', 'financial capital']
  },
  {
    _id: '23',
    name: 'Kerala',
    category: 'state',
    state: 'kerala',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 10.8505, lng: 76.2711 },
    description: 'God\'s Own Country with backwaters, hill stations, and Ayurvedic traditions',
    rating: 4.7,
    isPopular: true,
    searchKeywords: ['kerala', 'backwaters', 'alleppey', 'munnar', 'ayurveda', 'god\'s own country']
  },
  {
    _id: '24',
    name: 'Rajasthan',
    category: 'state',
    state: 'rajasthan',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 27.0238, lng: 74.2179 },
    description: 'Land of Kings with magnificent palaces, forts, and desert landscapes',
    rating: 4.5,
    isPopular: true,
    searchKeywords: ['rajasthan', 'jaipur', 'udaipur', 'jodhpur', 'jaisalmer', 'palaces', 'forts', 'desert']
  },
  {
    _id: '25',
    name: 'Tamil Nadu',
    category: 'state',
    state: 'tamil nadu',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 11.1271, lng: 78.6569 },
    description: 'Land of temples with rich Dravidian culture, classical dance, and ancient architecture',
    rating: 4.4,
    isPopular: true,
    searchKeywords: ['tamil nadu', 'chennai', 'madurai', 'temples', 'dravidian', 'classical dance']
  },
  {
    _id: '26',
    name: 'Goa',
    category: 'state',
    state: 'goa',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 15.2993, lng: 74.1240 },
    description: 'Beach paradise with Portuguese heritage, nightlife, and water sports',
    rating: 4.6,
    isPopular: true,
    searchKeywords: ['goa', 'beaches', 'party', 'portuguese', 'calangute', 'baga', 'anjuna', 'nightlife']
  },
  {
    _id: '27',
    name: 'Himachal Pradesh',
    category: 'state',
    state: 'himachal pradesh',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 31.1048, lng: 77.1734 },
    description: 'Mountain state with hill stations, adventure sports, and stunning natural beauty',
    rating: 4.6,
    isPopular: true,
    searchKeywords: ['himachal pradesh', 'shimla', 'manali', 'mountains', 'hill stations', 'adventure', 'nature']
  },
  {
    _id: '28',
    name: 'Uttarakhand',
    category: 'state',
    state: 'uttarakhand',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 30.0668, lng: 79.0193 },
    description: 'Devbhoomi with sacred temples, hill stations, and adventure tourism',
    rating: 4.5,
    isPopular: true,
    searchKeywords: ['uttarakhand', 'dehradun', 'rishikesh', 'haridwar', 'temples', 'mountains', 'adventure']
  },
  {
    _id: '29',
    name: 'Sikkim',
    category: 'state',
    state: 'sikkim',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 27.5330, lng: 88.5122 },
    description: 'Himalayan state with monasteries, beautiful landscapes, and adventure tourism',
    rating: 4.7,
    isPopular: true,
    searchKeywords: ['sikkim', 'gangtok', 'himalayas', 'monasteries', 'mountains', 'adventure', 'nature']
  },
  {
    _id: '30',
    name: 'Jammu and Kashmir',
    category: 'union territory',
    state: 'jammu and kashmir',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 34.0837, lng: 74.7973 },
    description: 'Crown of India with stunning mountains, lakes, and rich cultural heritage',
    rating: 4.8,
    isPopular: true,
    searchKeywords: ['jammu', 'kashmir', 'mountains', 'lakes', 'dal lake', 'gulmarg', 'srinagar', 'union territory']
  },
  {
    _id: '31',
    name: 'Ladakh',
    category: 'union territory',
    state: 'ladakh',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 34.1526, lng: 77.5771 },
    description: 'High-altitude desert with Buddhist monasteries, stunning landscapes, and adventure sports',
    rating: 4.9,
    isPopular: true,
    searchKeywords: ['ladakh', 'high altitude', 'desert', 'buddhist', 'monasteries', 'landscapes', 'adventure', 'union territory']
  },
  {
    _id: '32',
    name: 'Delhi',
    category: 'union territory',
    state: 'delhi',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 28.7041, lng: 77.1025 },
    description: 'National Capital Territory, rich in history, monuments, and diverse culture',
    rating: 4.3,
    isPopular: true,
    searchKeywords: ['delhi', 'new delhi', 'capital', 'red fort', 'india gate', 'qutub minar', 'lotus temple', 'union territory']
  }
];

// Helper function to get popular destinations
export const getPopularDestinations = (limit = 6) => {
  return placesData
    .filter(place => place.isPopular)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Helper function to search destinations
export const searchDestinations = (query, limit = 8) => {
  if (!query || query.length < 2) {
    return getPopularDestinations(limit);
  }

  const searchTerm = query.toLowerCase();
  
  return placesData
    .filter(place => {
      const nameMatch = place.name.toLowerCase().includes(searchTerm);
      const countryMatch = place.country?.toLowerCase().includes(searchTerm);
      const stateMatch = place.state?.toLowerCase().includes(searchTerm);
      const keywordMatch = place.searchKeywords?.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      );
      
      return nameMatch || countryMatch || stateMatch || keywordMatch;
    })
    .sort((a, b) => {
      // Prioritize exact name matches
      const aNameMatch = a.name.toLowerCase().includes(searchTerm);
      const bNameMatch = b.name.toLowerCase().includes(searchTerm);
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      // Then sort by rating
      return b.rating - a.rating;
    })
    .slice(0, limit);
};

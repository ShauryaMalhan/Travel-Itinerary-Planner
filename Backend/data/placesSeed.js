const Place = require('../models/Place');

const placesData = [
  // Countries
  {
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
    name: 'Gujarat',
    category: 'state',
    state: 'gujarat',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 23.0225, lng: 72.5714 },
    description: 'Business hub with rich heritage, vibrant festivals, and diverse landscapes',
    rating: 4.2,
    isPopular: true,
    searchKeywords: ['gujarat', 'ahmedabad', 'gandhinagar', 'business', 'festivals', 'heritage', 'garba']
  },
  {
    name: 'Uttar Pradesh',
    category: 'state',
    state: 'uttar pradesh',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 26.8467, lng: 80.9462 },
    description: 'Most populous state with rich history, monuments, and cultural heritage',
    rating: 4.1,
    isPopular: true,
    searchKeywords: ['uttar pradesh', 'lucknow', 'agra', 'taj mahal', 'varanasi', 'history', 'monuments']
  },
  {
    name: 'West Bengal',
    category: 'state',
    state: 'west bengal',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 22.9868, lng: 87.8550 },
    description: 'Cultural capital with literature, art, colonial architecture, and delicious cuisine',
    rating: 4.3,
    isPopular: true,
    searchKeywords: ['west bengal', 'kolkata', 'calcutta', 'culture', 'literature', 'art', 'durga puja']
  },
  {
    name: 'Punjab',
    category: 'state',
    state: 'punjab',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 31.1471, lng: 75.3412 },
    description: 'Land of five rivers with rich agricultural heritage, golden temples, and vibrant culture',
    rating: 4.4,
    isPopular: true,
    searchKeywords: ['punjab', 'chandigarh', 'amritsar', 'golden temple', 'agriculture', 'culture', 'bhangra']
  },
  {
    name: 'Haryana',
    category: 'state',
    state: 'haryana',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 29.0588, lng: 76.0856 },
    description: 'Agricultural state with industrial development, rich history, and cultural heritage',
    rating: 4.0,
    isPopular: true,
    searchKeywords: ['haryana', 'gurgaon', 'faridabad', 'agriculture', 'industry', 'history', 'culture']
  },
  {
    name: 'Madhya Pradesh',
    category: 'state',
    state: 'madhya pradesh',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 22.9734, lng: 78.6569 },
    description: 'Heart of India with ancient temples, wildlife sanctuaries, and rich cultural heritage',
    rating: 4.2,
    isPopular: true,
    searchKeywords: ['madhya pradesh', 'bhopal', 'indore', 'khajuraho', 'temples', 'wildlife', 'heritage']
  },
  {
    name: 'Bihar',
    category: 'state',
    state: 'bihar',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 25.0961, lng: 85.3131 },
    description: 'Ancient state with rich Buddhist heritage, historical sites, and cultural traditions',
    rating: 4.0,
    isPopular: true,
    searchKeywords: ['bihar', 'patna', 'bodh gaya', 'buddhist', 'heritage', 'history', 'culture']
  },
  {
    name: 'Odisha',
    category: 'state',
    state: 'odisha',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 20.9517, lng: 85.0985 },
    description: 'Temple state with ancient architecture, beautiful beaches, and rich cultural heritage',
    rating: 4.3,
    isPopular: true,
    searchKeywords: ['odisha', 'orissa', 'bhubaneswar', 'puri', 'konark', 'temples', 'beaches', 'culture']
  },
  {
    name: 'Andhra Pradesh',
    category: 'state',
    state: 'andhra pradesh',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 15.9129, lng: 79.7400 },
    description: 'Rice bowl of India with rich history, temples, and diverse cultural heritage',
    rating: 4.1,
    isPopular: true,
    searchKeywords: ['andhra pradesh', 'hyderabad', 'vijayawada', 'temples', 'rice', 'culture', 'heritage']
  },
  {
    name: 'Telangana',
    category: 'state',
    state: 'telangana',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 18.1124, lng: 79.0193 },
    description: 'Newest state with IT hub, historic monuments, and rich cultural traditions',
    rating: 4.2,
    isPopular: true,
    searchKeywords: ['telangana', 'hyderabad', 'charminar', 'golconda', 'it', 'heritage', 'culture']
  },
  {
    name: 'Assam',
    category: 'state',
    state: 'assam',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 26.2006, lng: 92.9376 },
    description: 'Tea garden state with diverse wildlife, rich culture, and beautiful landscapes',
    rating: 4.4,
    isPopular: true,
    searchKeywords: ['assam', 'guwahati', 'tea', 'kaziranga', 'wildlife', 'culture', 'bihu']
  },
  {
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
    name: 'Jharkhand',
    category: 'state',
    state: 'jharkhand',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 23.6102, lng: 85.2799 },
    description: 'Mineral-rich state with tribal culture, waterfalls, and natural beauty',
    rating: 4.0,
    isPopular: true,
    searchKeywords: ['jharkhand', 'ranchi', 'jamshedpur', 'minerals', 'tribal', 'waterfalls', 'nature']
  },
  {
    name: 'Chhattisgarh',
    category: 'state',
    state: 'chhattisgarh',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 21.2787, lng: 81.8661 },
    description: 'Rice bowl with tribal heritage, waterfalls, and rich mineral resources',
    rating: 4.0,
    isPopular: true,
    searchKeywords: ['chhattisgarh', 'raipur', 'bilaspur', 'tribal', 'waterfalls', 'minerals', 'rice']
  },
  {
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
    name: 'Manipur',
    category: 'state',
    state: 'manipur',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 24.6637, lng: 93.9063 },
    description: 'Jewel of India with rich culture, beautiful landscapes, and traditional dance',
    rating: 4.2,
    isPopular: true,
    searchKeywords: ['manipur', 'imphal', 'culture', 'dance', 'nature', 'jewel', 'traditions']
  },
  {
    name: 'Meghalaya',
    category: 'state',
    state: 'meghalaya',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 25.4670, lng: 91.3662 },
    description: 'Abode of clouds with living root bridges, waterfalls, and matrilineal society',
    rating: 4.4,
    isPopular: true,
    searchKeywords: ['meghalaya', 'shillong', 'cherrapunji', 'clouds', 'bridges', 'waterfalls', 'nature']
  },
  {
    name: 'Mizoram',
    category: 'state',
    state: 'mizoram',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 23.1645, lng: 92.9376 },
    description: 'Land of the hill people with beautiful landscapes and rich cultural heritage',
    rating: 4.1,
    isPopular: true,
    searchKeywords: ['mizoram', 'aizawl', 'hills', 'culture', 'nature', 'traditions', 'landscapes']
  },
  {
    name: 'Nagaland',
    category: 'state',
    state: 'nagaland',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 26.1584, lng: 94.5624 },
    description: 'Land of festivals with tribal culture, beautiful hills, and rich traditions',
    rating: 4.2,
    isPopular: true,
    searchKeywords: ['nagaland', 'kohima', 'dimapur', 'festivals', 'tribal', 'culture', 'hills']
  },
  {
    name: 'Tripura',
    category: 'state',
    state: 'tripura',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 23.9408, lng: 91.9882 },
    description: 'Small state with rich history, beautiful palaces, and diverse culture',
    rating: 4.0,
    isPopular: true,
    searchKeywords: ['tripura', 'agartala', 'palaces', 'history', 'culture', 'heritage', 'nature']
  },
  {
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
    name: 'Arunachal Pradesh',
    category: 'state',
    state: 'arunachal pradesh',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 28.2180, lng: 94.7278 },
    description: 'Land of the rising sun with diverse tribes, beautiful mountains, and rich culture',
    rating: 4.3,
    isPopular: true,
    searchKeywords: ['arunachal pradesh', 'itanagar', 'tawang', 'tribes', 'mountains', 'culture', 'nature']
  },


  // Union Territories
  {
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
  },
  {
    name: 'Puducherry',
    category: 'union territory',
    state: 'puducherry',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 11.9416, lng: 79.8083 },
    description: 'Former French colony with colonial architecture, beaches, and spiritual centers',
    rating: 4.4,
    isPopular: true,
    searchKeywords: ['puducherry', 'pondicherry', 'french colony', 'colonial', 'beaches', 'auroville', 'union territory']
  },
  {
    name: 'Chandigarh',
    category: 'union territory',
    state: 'chandigarh',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 30.7333, lng: 76.7794 },
    description: 'Planned city designed by Le Corbusier, known for modern architecture and gardens',
    rating: 4.2,
    isPopular: true,
    searchKeywords: ['chandigarh', 'planned city', 'le corbusier', 'modern architecture', 'gardens', 'union territory']
  },
  {
    name: 'Lakshadweep',
    category: 'union territory',
    state: 'lakshadweep',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 10.5667, lng: 72.6417 },
    description: 'Tropical archipelago with pristine beaches, coral reefs, and marine life',
    rating: 4.6,
    isPopular: true,
    searchKeywords: ['lakshadweep', 'islands', 'beaches', 'coral reefs', 'marine life', 'tropical', 'union territory']
  },
  {
    name: 'Daman and Diu',
    category: 'union territory',
    state: 'daman and diu',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 20.4283, lng: 72.8397 },
    description: 'Coastal union territory with Portuguese heritage, beaches, and historic forts',
    rating: 4.1,
    isPopular: true,
    searchKeywords: ['daman', 'diu', 'portuguese', 'beaches', 'forts', 'coastal', 'union territory']
  },
  {
    name: 'Dadra and Nagar Haveli',
    category: 'union territory',
    state: 'dadra and nagar haveli',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 20.1809, lng: 73.0169 },
    description: 'Small union territory with tribal culture, forests, and natural beauty',
    rating: 4.0,
    isPopular: true,
    searchKeywords: ['dadra', 'nagar haveli', 'tribal', 'forests', 'natural beauty', 'union territory']
  },
  {
    name: 'Andaman and Nicobar Islands',
    category: 'union territory',
    state: 'andaman and nicobar',
    country: 'india',
    continent: 'asia',
    coordinates: { lat: 11.7401, lng: 92.6586 },
    description: 'Tropical paradise with pristine beaches, coral reefs, and indigenous tribes',
    rating: 4.7,
    isPopular: true,
    searchKeywords: ['andaman', 'nicobar', 'islands', 'beaches', 'coral reefs', 'tribes', 'tropical', 'union territory']
  },
  {
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
  }
];

const seedPlaces = async () => {
  try {
    // Clear existing places
    await Place.deleteMany({});
    
    // Insert new places
    const createdPlaces = await Place.insertMany(placesData);
    
    console.log(`✅ Successfully seeded ${createdPlaces.length} places`);
    return createdPlaces;
  } catch (error) {
    console.error('❌ Error seeding places:', error);
    throw error;
  }
};

module.exports = { seedPlaces, placesData };
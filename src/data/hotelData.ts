import { getAssetUrl } from '../utils/assetUrl';
import { RoomTier, LuxuryAddon, TrailAttraction, GalleryItem, GuestStory, VirtualTourScene, ApiRoomType } from '../types';

export const SHOP_ID = 165;
export const API_ROOM_TYPES_URL = `https://hotelserver.billhost.co.in/${SHOP_ID}/rtmas`;

export const HOTEL_INFO = {
  name: "Meridian Blu",
  tagline: "Bespoke Luxury Hotel, Residences & Spa",
  elevation: "7,120 ft (2,170 m)",
  coordinates: "30.4598° N, 78.0644° E",
  address: "1, Kempty Fall Road, Charleville, Mussoorie, Uttarakhand 248179, India",
  landmark: "Near Happy Valley & Buddha Point (2.5 km from Library Chowk)",
  frontDeskPhone: "+91 96505 14794",
  reservationsPhone: "+91 96505 14773",
  phone: "+91 96505 14794",
  whatsapp: "+91 96505 14773",
  whatsappNumberDigits: "919650514773",
  gstNumber: "05AABCM1234F1Z5",
  gstinWithState: "05AABCM1234F1Z5 (Uttarakhand 05)",
  reservationsEmail: "reservations@meridianblu.com",
  checkInTime: "14:00",
  checkOutTime: "11:00",
  currencySymbol: "₹",
  softwareSystem: {
    shopId: 165,
    status: "Active & Synced with Hotel PMS",
    engineVersion: "BillHost PMS 4.2",
    apiEndpoint: "https://hotelserver.billhost.co.in/165/rtmas"
  },
  weather: {
    tempC: 17,
    condition: "Crisp & Pristine",
    winterlineSunset: "17:38",
    airQuality: "Pristine (AQI 18)",
    mountainViewIndex: "Clear Himalayan Peaks visible across Bandarpunch range"
  }
};

// Preset styling and asset dictionary for API room types by name/id using real property images (Shop ID: 165)
const ROOM_METADATA_CONFIG: Record<string, {
  name: string;
  tagline: string;
  defaultPrice: number;
  sizeSqFt: number;
  bed: string;
  view: string;
  imageUrl: string;
  galleryImages: string[];
  backupGradient: string;
  description: string;
  features: string[];
  amenities: string[];
  popular?: boolean;
}> = {
  "1099": {
    name: "Valley View Rooms",
    tagline: "Serene balcony retreats overlooking lush pine forests and misty Mussoorie valley folds",
    defaultPrice: 3000,
    sizeSqFt: 420,
    bed: "Plush King Size Bed",
    view: "Verdant Mussoorie Valley & Pine Hillside",
    imageUrl: getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room.avif"),
    galleryImages: [
      getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room.avif"),
      getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room (1).avif"),
      getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room (8).avif"),
      getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room 9.avif"),
      getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room bath room.avif")
    ],
    backupGradient: "from-emerald-950 via-stone-900 to-stone-950",
    description: "Immerse yourself in gentle valley breezes and panoramic hillside views. Featuring a private viewing balcony, handcrafted timber accents, premium high-thread linens, and luxurious modern en-suite amenities.",
    features: [
      "Private scenic balcony overlooking the Mussoorie valley",
      "Plush king-size mattress with high-thread Egyptian cotton linens",
      "Large picture windows capturing natural mountain daylight",
      "En-suite designer bathroom with high-pressure rain shower",
      "Artisanal Pahadi herbal tea & coffee maker station"
    ],
    amenities: ["Private Balcony", "High-Speed Starlink WiFi", "HD Smart TV", "Room Service", "Daily Housekeeping", "Climate Heating"],
    popular: false
  },
  "1100": {
    name: "Himalayan View Rooms",
    tagline: "Unobstructed vistas of the snow-clad Garhwal Himalayan range and Bandarpunch peaks",
    defaultPrice: 3300,
    sizeSqFt: 460,
    bed: "Grand Himalayan King Bed",
    view: "Snow-Capped Garhwal Himalayan Ridge",
    imageUrl: getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room.avif"),
    galleryImages: [
      getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room.avif"),
      getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room 2.avif"),
      getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room balcony.avif"),
      getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room bathroom.avif"),
      getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room bathroom2.avif")
    ],
    backupGradient: "from-sky-950 via-slate-900 to-blue-950",
    description: "Perched gracefully to provide front-row vistas of the eternal snow peaks of Garhwal. Wake up to golden sunrise rays reflecting off the Himalayan horizon from your private furnished balcony.",
    features: [
      "Sweeping panoramic balcony facing Bandarpunch snow peaks",
      "Generous sitting lounge with bespoke mountain-view daybed",
      "Premium acoustic double-glazed windows for tranquil quietude",
      "Spa-inspired Italian marble bathroom with rain shower",
      "Complimentary mountain high tea service"
    ],
    amenities: ["Panoramic Mountain Balcony", "Smart 4K TV", "High-Speed WiFi", "24/7 Hot Water", "In-Room Dining", "Tea/Coffee Bar"],
    popular: true
  },
  "1101": {
    name: "Summit Rooms",
    tagline: "Elevated luxury suites positioned high on Cloud Crest with dramatic 180° vistas",
    defaultPrice: 3500,
    sizeSqFt: 500,
    bed: "Signature Summit King Bed",
    view: "180° Himalayan Peaks & Cloud Sea",
    imageUrl: getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room.avif"),
    galleryImages: [
      getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room.avif"),
      getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room (1).avif"),
      getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room (3).avif"),
      getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room balcony.avif"),
      getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room bathroom.jpg")
    ],
    backupGradient: "from-amber-950 via-stone-900 to-emerald-950",
    description: "Positioned at the upper summit floors of Meridian Blu, these premier rooms offer expansive glass fronts overlooking rolling cloud formations and dramatic mountain sunrises. Crafted with seasoned walnut wood and bespoke fittings.",
    features: [
      "Upper-level summit balcony with dramatic high-altitude views",
      "Bespoke cedar wood furnishings and artisanal woven accents",
      "Walk-in dressing area and spacious executive vanity",
      "Deluxe bathroom featuring rain shower and botanical bath amenities",
      "Personalized morning awakening tray with Pahadi honey"
    ],
    amenities: ["Summit Viewing Balcony", "Premium Starlink WiFi", "Ultra HD Smart TV", "Luxury Bathrobes & Slippers", "Concierge Butler Service", "Complimentary High Tea"],
    popular: true
  },
  "1102": {
    name: "Skyline Rooms",
    tagline: "Our crown-tier penthouse rooms offering celestial twilight & famous Mussoorie winterline views",
    defaultPrice: 4000,
    sizeSqFt: 550,
    bed: "Royal Emperor King Bed",
    view: "Legendary Mussoorie Winterline & Horizon",
    imageUrl: getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (6).avif"),
    galleryImages: [
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (6).avif"),
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (2).avif"),
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (3).avif"),
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (5).avif"),
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room balcony.avif"),
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room bathroom.avif")
    ],
    backupGradient: "from-purple-950 via-slate-900 to-indigo-950",
    description: "The apex of alpine living at Meridian Blu. Crowned at the highest point of the property, Skyline Rooms showcase Mussoorie's legendary Winterline phenomenon and sweeping starlit Himalayan night skies from private rooftop-level balconies.",
    features: [
      "Top-floor private panoramic terrace balcony facing the Winterline",
      "Grand Emperor King bed with bespoke goose-down luxury bedding",
      "Floor-to-ceiling glass wall capturing sunrise to starlight",
      "Designer bathroom with premium fixtures and luxury toiletries",
      "Complimentary evening twilight refreshment service"
    ],
    amenities: ["Top-Floor Skyline Balcony", "Dyson / Premium Haircare", "Starlink High-Speed WiFi", "Smart 4K Entertainment", "Priority Concierge & Chef Service", "Fireside Evening Access"],
    popular: true
  }
};

// Initial inventory state map strictly reflecting PMS Vacant Rooms (/165/room/status/0)
// For Meridian Blu Shop 165:
// - Valley View Rooms (1099): 7 physical rooms, 7 vacant
// - Himalayan View Rooms (1100): 17 physical rooms, 13 vacant
// - Summit Rooms (1101): 6 physical rooms, 4 vacant
// - Skyline Rooms (1102): 3 physical rooms, 3 vacant
export const INITIAL_INVENTORY_DB: Record<string, { totalUnits: number; availableUnits: number; isSoldOut: boolean; statusText: string }> = {
  "1099": { totalUnits: 7, availableUnits: 7, isSoldOut: false, statusText: "7 Units Available" },
  "1100": { totalUnits: 17, availableUnits: 13, isSoldOut: false, statusText: "13 Units Available" },
  "1101": { totalUnits: 6, availableUnits: 4, isSoldOut: false, statusText: "4 Units Available" },
  "1102": { totalUnits: 3, availableUnits: 3, isSoldOut: false, statusText: "3 Units Available" }
};

// Transform API room into complete UI RoomTier
export const mapApiRoomToTier = (apiRoom: ApiRoomType): RoomTier => {
  const idStr = String(apiRoom.id);
  const rawName = (apiRoom.rtname || '').replace(/\u00a0/g, ' ').trim();
  const lowerName = rawName.toLowerCase();

  // Match by idStr or by name keywords
  let cfg = ROOM_METADATA_CONFIG[idStr];
  if (!cfg) {
    if (lowerName.includes('valley')) {
      cfg = ROOM_METADATA_CONFIG["1099"];
    } else if (lowerName.includes('himalayan')) {
      cfg = ROOM_METADATA_CONFIG["1100"];
    } else if (lowerName.includes('summit')) {
      cfg = ROOM_METADATA_CONFIG["1101"];
    } else if (lowerName.includes('skyline')) {
      cfg = ROOM_METADATA_CONFIG["1102"];
    }
  }

  // Dynamic Rent Resolution from API:
  let price = 0;
  if (apiRoom.rent && apiRoom.rent > 0) {
    price = apiRoom.rent;
  } else if (apiRoom.rentdouble && apiRoom.rentdouble > 0) {
    price = apiRoom.rentdouble;
  } else if (apiRoom.rentsingle && apiRoom.rentsingle > 0) {
    price = apiRoom.rentsingle;
  } else if (cfg?.defaultPrice) {
    price = cfg.defaultPrice;
  } else {
    price = 3000;
  }

  // Strictly use exact clean PMS room name from apiRoom.rtname
  const name = rawName || cfg?.name || `Room Type ${apiRoom.id}`;
  const inv = INITIAL_INVENTORY_DB[idStr];
  const totalUnits = inv ? inv.totalUnits : (apiRoom.totalroom ?? 1);
  const availableUnits = inv ? inv.availableUnits : totalUnits;
  const isSoldOut = inv ? inv.isSoldOut : false;
  const originalPrice = Math.round(price * 1.25);

  // Sanitize narration if it starts with shop id (e.g. "165Valley View Rooms" -> "Valley View Rooms")
  let sanitizedNarration = apiRoom.narration || "";
  sanitizedNarration = sanitizedNarration.replace(/^\d+/, '').replace(/\u00a0/g, ' ').trim();

  return {
    id: idStr,
    apiId: apiRoom.id,
    name,
    tagline: cfg?.tagline || (sanitizedNarration ? sanitizedNarration : "Bespoke luxury mountain stay with scenic views"),
    pricePerNight: price,
    originalPrice,
    sizeSqFt: cfg?.sizeSqFt || 450,
    capacity: {
      adults: apiRoom.occupancy > 0 ? apiRoom.occupancy : 2,
      children: 1
    },
    bed: cfg?.bed || "King/Queen Luxury Mountain Bed",
    view: cfg?.view || "Doon Valley & Himalayan Ridge",
    imageUrl: cfg?.imageUrl || getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room.avif"),
    galleryImages: cfg?.galleryImages || [cfg?.imageUrl || getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room.avif")],
    backupGradient: cfg?.backupGradient || "from-stone-900 via-emerald-950 to-stone-950",
    description: cfg?.description || apiRoom.roomtypedescription || "Experience tranquil Himalayan living with modern comforts and pristine nature.",
    features: cfg?.features || [
      "Scenic mountain and forest views",
      "Temperature-regulated heating and plush bedding",
      "En-suite bathroom with 24-hour hot water",
      "Artisanal tea and coffee bar",
      "High-speed Starlink WiFi"
    ],
    amenities: cfg?.amenities || ["Fast WiFi", "Smart TV", "Room Service", "Daily Housekeeping", "Heating"],
    popular: cfg?.popular,
    totalRooms: totalUnits,
    inventory: {
      roomId: idStr,
      roomName: name,
      totalUnits,
      availableUnits,
      isSoldOut,
      statusText: inv?.statusText || (isSoldOut ? "Sold Out in PMS" : `${availableUnits} Available`),
      lastUpdated: new Date().toISOString()
    }
  };
};

// Raw initial data fetched from https://hotelserver.billhost.co.in/165/rtmas with exact PMS names
export const RAW_API_ROOMS_SHOP_165: ApiRoomType[] = [
  {
    id: 1099,
    rtname: "Valley View Rooms",
    shopid: 165,
    narration: "165Valley View Rooms",
    chid: "valley-view-rooms",
    totalroom: 7,
    occupancy: 2,
    roomtypedescription: "valley-view-rooms-s-ep, valley-view-rooms-d-ep",
    rent: 0,
    rentsingle: 2500,
    rentdouble: 3000
  },
  {
    id: 1100,
    rtname: "Himalayan View Rooms",
    shopid: 165,
    narration: "165Himalayan View Rooms",
    chid: "himalayan-view-rooms",
    totalroom: 17,
    occupancy: 2,
    roomtypedescription: "himalayan-view-rooms-s-ep, himalayan-view-rooms-d-ep",
    rent: 0,
    rentsingle: 2800,
    rentdouble: 3300
  },
  {
    id: 1101,
    rtname: "Summit Rooms",
    shopid: 165,
    narration: "165Summit Rooms",
    chid: "summit-rooms",
    totalroom: 6,
    occupancy: 2,
    roomtypedescription: "summit-rooms-s-ep, summit-rooms-d-ep",
    rent: 0,
    rentsingle: 3000,
    rentdouble: 3500
  },
  {
    id: 1102,
    rtname: "Skyline Rooms",
    shopid: 165,
    narration: "165Skyline Rooms",
    chid: "skyline-rooms",
    totalroom: 3,
    occupancy: 2,
    roomtypedescription: "skyline-rooms-s-ep, skyline-rooms-d-ep",
    rent: 0,
    rentsingle: 3500,
    rentdouble: 4000
  }
];

// Initial preloaded ROOMS_DATA with room types & rents from API
export const ROOMS_DATA: RoomTier[] = RAW_API_ROOMS_SHOP_165.map(mapApiRoomToTier);

// Live fetch helper: fetches from https://hotelserver.billhost.co.in/165/rtmas or server proxy
export const fetchLiveRoomTypes = async (shopId: number = SHOP_ID): Promise<RoomTier[]> => {
  try {
    const res = await fetch(`https://hotelserver.billhost.co.in/${shopId}/rtmas`);
    if (res.ok) {
      const data: ApiRoomType[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(mapApiRoomToTier);
      }
    }
  } catch (err) {
    console.warn("Direct API fetch failed, trying local proxy:", err);
  }

  if (typeof window !== 'undefined' && !window.location.hostname.includes('github.io')) {
    try {
      const res = await fetch(`/api/room-types?shopId=${shopId}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map(mapApiRoomToTier);
        }
      }
    } catch (err) {
      console.warn("Proxy API fetch failed, using preloaded shop 165 room data:", err);
    }
  }

  return ROOMS_DATA;
};

export const LUXURY_ADDONS: LuxuryAddon[] = [
  {
    id: "sunset-bonfire",
    name: "Himalayan Sunset Bonfire & Mountain Barbecue",
    category: "culinary",
    price: 1500,
    duration: "2.5 hours",
    description: "Intimate fireside evening with spiced hot apple cider, live acoustic mountain music, and artisan charcuterie under the glowing Mussoorie Winterline.",
    iconName: "Flame"
  },
  {
    id: "george-everest-tea",
    name: "High Tea at George Everest View Terrace",
    category: "culinary",
    price: 850,
    duration: "1.5 hours",
    description: "Traditional British high tea served on our cliffside pavilion with fresh Landour bakery scones, artisanal mountain berry preserves, and Darjeeling first-flush teas.",
    iconName: "Coffee"
  },
  {
    id: "ayurvedic-spa-ritual",
    name: "Ananda Forest Abhyanga & Cedar Steam Spa",
    category: "wellness",
    price: 2200,
    duration: "90 mins",
    description: "Deeply restorative full-body massage using warm herbal oils infused with Himalayan cedarwood and wild mint, followed by private pine-mist steam therapy.",
    iconName: "Sparkles"
  },
  {
    id: "landour-guided-walk",
    name: "Landour Colonial Heritage & Chaar Dukaan Walk",
    category: "adventure",
    price: 750,
    duration: "3 hours",
    description: "Private guided historical trail through quiet deodar-draped Landour, visiting historic churches, colonial heritage nooks, and iconic mountain viewpoints.",
    iconName: "Compass"
  },
  {
    id: "luxury-airport-transfer",
    name: "Dehradun Airport Chauffeur Transfer (One-Way)",
    category: "transfer",
    price: 3500,
    duration: "2 hours",
    description: "Chauffeured luxury SUV transfer from Dehradun Jolly Grant Airport directly to hotel porte-cochere with onboard WiFi, chilled Himalayan towels, and mountain refreshments.",
    iconName: "Car"
  }
];

export const TRAILS_DATA: TrailAttraction[] = [
  {
    id: "george-everest-peak",
    name: "George Everest Peak & Observatory Trek",
    category: "trek",
    distanceFromHotelKm: 4.2,
    trailLengthKm: 3.5,
    elevationFt: 6750,
    difficulty: "Moderate",
    durationHours: "2.5 hrs",
    highlight: "Historic estate of Sir George Everest with 360-degree views of Doon Valley and Aglar River",
    description: "A scenic ridge walk leading to the historic 1832 house and observatory of Sir George Everest, Surveyor-General of India after whom Mt. Everest is named. The trail follows an open grassy crest with breathtaking drops on both sides.",
    bestTime: "Early Morning (06:30) or Golden Sunset",
    coordinates: { x: 28, y: 34 },
    packingTips: ["Sturdy trekking shoes", "Windbreaker jacket", "Camera with telephoto lens", "Hydration flask"],
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "benog-wildlife-sanctuary",
    name: "Benog Wildlife Sanctuary Pine Ridge",
    category: "nature",
    distanceFromHotelKm: 5.8,
    trailLengthKm: 4.8,
    elevationFt: 7150,
    difficulty: "Moderate",
    durationHours: "3.5 hrs",
    highlight: "Home to rare Himalayan Monal pheasants, barking deer, and ancient fir pine forests",
    description: "A pristine nature sanctuary enveloped in dense pine, oak, and deodar woodlands. Perfect for avid birdwatchers and naturalists seeking serene alpine solitude.",
    bestTime: "Morning (07:00 to 10:00) for avian sightings",
    coordinates: { x: 18, y: 52 },
    packingTips: ["Binoculars", "Quiet walking attire", "Sun protection & insect repellent", "Hiking poles"],
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "landour-chaar-dukaan",
    name: "Landour Heritage & Chaar Dukaan Trail",
    category: "heritage",
    distanceFromHotelKm: 6.5,
    trailLengthKm: 3.2,
    elevationFt: 7500,
    difficulty: "Gentle",
    durationHours: "2.0 hrs",
    highlight: "Historic 19th-century colonial cantonment, St. Paul's Church, and famous Landour Bakehouse",
    description: "A peaceful walking circuit through Landour, Mussoorie's historic twin. Shaded by ancient deodars, this walk passes literary nooks, colonial stone cottages, and the historic Chaar Dukaan four-shop square famous for mountain teas and confections.",
    bestTime: "Late Morning to Mid-Afternoon",
    coordinates: { x: 74, y: 26 },
    packingTips: ["Comfortable walking footwear", "Light woolen shawl", "Camera", "Canvas satchel"],
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "pari-tibba-trail",
    name: "Pari Tibba Mystic Ridge Trail",
    category: "trek",
    distanceFromHotelKm: 7.0,
    trailLengthKm: 5.4,
    elevationFt: 6920,
    difficulty: "Moderate",
    durationHours: "3.0 hrs",
    highlight: "Enchanting rhododendron forest often veiled in gentle mountain fog, immortalized in regional literature",
    description: "Famous in the writings of Ruskin Bond, Pari Tibba is an isolated wooded hill known for romantic folklore and atmospheric quietude. In spring, the hillside blooms with crimson rhododendron flowers.",
    bestTime: "Morning or Overcast Afternoon",
    coordinates: { x: 82, y: 65 },
    packingTips: ["Trail footwear", "Weatherproof shell", "Field notes & camera", "Provisions"],
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "camels-back-road",
    name: "Camel's Back Scenic Sunset Promenade",
    category: "viewpoint",
    distanceFromHotelKm: 3.1,
    trailLengthKm: 3.0,
    elevationFt: 6800,
    difficulty: "Gentle",
    durationHours: "1.5 hrs",
    highlight: "Natural rock formation resembling a resting camel, with sunset views of the winterline",
    description: "A paved, tranquil 3-kilometer promenade along the northern ridge of Mussoorie, free from heavy vehicular traffic. Lined with vintage Victorian wrought-iron resting gazebos overlooking expansive Himalayan valleys.",
    bestTime: "Sunset (16:30 to 18:00)",
    coordinates: { x: 50, y: 44 },
    packingTips: ["Warm evening wrap", "Comfortable walking shoes", "Camera"],
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "kempty-gorge-falls",
    name: "Kempty Mountain Gorge & Cascades",
    category: "nature",
    distanceFromHotelKm: 14.5,
    trailLengthKm: 2.0,
    elevationFt: 4500,
    difficulty: "Gentle",
    durationHours: "3.5 hrs (incl. drive)",
    highlight: "Thundering glacial cascade plunging into a natural mountain pool nestled between granite cliffs",
    description: "Originating high in the mountain streams, Kempty Falls cascades down multiple granite tiers. Our private concierge excursion includes an exclusive VIP terrace viewing deck avoiding crowded lower pools.",
    bestTime: "Morning (09:00 to 11:30)",
    coordinates: { x: 12, y: 18 },
    packingTips: ["Water-resistant footwear", "Towel", "Change of attire", "Sun protection"],
    imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80"
  }
];

export const VIRTUAL_TOUR_SCENES: VirtualTourScene[] = [
  {
    id: "sunset-terrace",
    title: "Himalayan Sunset & Winterline Terrace",
    description: "Perched high above the clouds, our open-air stone observation terrace offers a front-row seat to the world-famous Mussoorie winterline sunsets.",
    panoramaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    hotspots: [
      { x: 30, y: 48, label: "Winterline Horizon", detail: "At sunset, a vivid two-tone band of crimson and violet stretches across the valley." },
      { x: 62, y: 72, label: "Fireside Hearth Lounge", detail: "Teak armchairs with handwoven woolen throws and crackling pine embers." },
      { x: 80, y: 55, label: "Astronomical Brass Telescope", detail: "Precision vintage brass telescope for spotting snow peaks and stargazing." }
    ]
  },
  {
    id: "deodar-suite",
    title: "The Deodar Royal Suite Interior",
    description: "Handcrafted cedar wood beams, plush velvet daybed, an authentic river-stone fireplace, and sweeping mountain bay windows.",
    panoramaUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    hotspots: [
      { x: 42, y: 64, label: "River-Stone Fireplace", detail: "Wood-burning fireplace with evening turndown and pinecone aroma." },
      { x: 75, y: 50, label: "Panoramic Bay Window", detail: "Double-pane insulated bay seating with 180-degree views of Bandarpunch peaks." },
      { x: 22, y: 58, label: "Carved Deodar King Bed", detail: "Locally carved Himalayan cedar four-poster bed with custom goose-down mattress." }
    ]
  },
  {
    id: "glasshouse-dining",
    title: "Cedar & Spice Conservatory Dining",
    description: "Floor-to-ceiling glass dining room surrounded by evergreen deodar pines with candlelit tables and fine Himalayan culinary tastings.",
    panoramaUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    hotspots: [
      { x: 28, y: 60, label: "Sommelier Wine Bar", detail: "Curated collection of aged single-malts and organic mountain vintages." },
      { x: 55, y: 52, label: "Conservatory Glass Ceiling", detail: "Thermal glass pavilion showcasing clear starry mountain skies during dinner." },
      { x: 78, y: 68, label: "Chef's Hearth Table", detail: "Live charcoal tandoor and traditional Garhwali brass cookware." }
    ]
  },
  {
    id: "himalayan-spa",
    title: "Ananda Mountain Plunge Pool & Spa",
    description: "Heated natural stone plunge pool with infinity glass overlooking misty pine valleys, paired with private Ayurvedic therapy pavilions.",
    panoramaUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    hotspots: [
      { x: 48, y: 68, label: "Heated Cedar Plunge Pool", detail: "Maintained at a soothing 36 degrees Celsius with infused mineral spring water." },
      { x: 20, y: 50, label: "Pine Steam Sanctuary", detail: "Steam room infused with fresh deodar pine needle essential oils." },
      { x: 82, y: 46, label: "Himalayan Ridge View Deck", detail: "Reclining teak loungers with panoramic views of the outer Himalayas." }
    ]
  },
  {
    id: "library-lounge",
    title: "Colonial Library & Fireside Study",
    description: "Paneled in native Himalayan walnut wood, featuring antique maps, rare mountain exploration chronicles, and cozy leather reading alcoves.",
    panoramaUrl: "https://images.unsplash.com/photo-1507842229451-9f7a6279f6eb?auto=format&fit=crop&w=1600&q=80",
    hotspots: [
      { x: 35, y: 52, label: "Himalayan Cartography Archive", detail: "Original 19th-century Great Trigonometrical Survey maps of the Garhwal Himalayas." },
      { x: 65, y: 62, label: "Chesterfield Leather Wingback", detail: "Deep antique leather armchairs beside an unhurried reading hearth." }
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Sunset Mountain Terrace",
    category: "views",
    caption: "The radiant twilight and mountain vista observed directly from our open terrace overlooking the Mussoorie ranges.",
    location: "Sunset Terrace, Meridian Blu",
    elevation: "7,120 ft",
    imageUrl: getAssetUrl("/images/terrace.jpg"),
    aspectRatio: "16:9"
  },
  {
    id: "gal-2",
    title: "Fine Dining Restaurant & Alpine Cuisine",
    category: "dining",
    caption: "Warm ambiance and multi-cuisine culinary offerings crafted by our executive chefs in the hotel dining room.",
    location: "Meridian Blu Restaurant",
    elevation: "7,110 ft",
    imageUrl: getAssetUrl("/images/restaurant.jpg"),
    aspectRatio: "4:3"
  },
  {
    id: "gal-3",
    title: "Evening Mountain Bonfire & Barbecue",
    category: "outdoors",
    caption: "Crackling evening bonfire gatherings under the starlit Himalayan sky with warm beverages and barbecue.",
    location: "Campfire Terrace",
    elevation: "7,120 ft",
    imageUrl: getAssetUrl("/images/bonefire.jpg"),
    aspectRatio: "4:3"
  },
  {
    id: "gal-4",
    title: "Grand Entrance & Himalayan Arrival",
    category: "architecture",
    caption: "Welcoming entrance to Meridian Blu with peaceful mountain air and contemporary hospitality.",
    location: "Main Entrance",
    elevation: "7,120 ft",
    imageUrl: getAssetUrl("/images/hero/entrance.avif"),
    aspectRatio: "16:9"
  },
  {
    id: "gal-5",
    title: "Summit Balcony Luxury Suite",
    category: "rooms",
    caption: "Plush king bedding with private mountain view balcony framing breathtaking morning clouds.",
    location: "Summit Suite Floor",
    elevation: "7,140 ft",
    imageUrl: getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room.avif"),
    aspectRatio: "4:3"
  },
  {
    id: "gal-6",
    title: "Skyline Balcony Mountain Residence",
    category: "rooms",
    caption: "Spacious contemporary bedroom with walk-out scenic balcony and designer furnishings.",
    location: "Skyline Wing",
    elevation: "7,130 ft",
    imageUrl: getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (6).avif"),
    aspectRatio: "4:3"
  },
  {
    id: "gal-7",
    title: "Himalayan View Balcony Chamber",
    category: "rooms",
    caption: "Crisp daylight illuminating hand-hewn wood appointments and private mountain viewing balcony.",
    location: "Himalayan Wing",
    elevation: "7,120 ft",
    imageUrl: getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room.avif"),
    aspectRatio: "4:3"
  },
  {
    id: "gal-8",
    title: "Valley View Balcony Residence",
    category: "rooms",
    caption: "Tranquil green valley views, private sit-out balcony, and comfortable luxury appointments.",
    location: "Valley Crest Wing",
    elevation: "7,110 ft",
    imageUrl: getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room.avif"),
    aspectRatio: "4:3"
  },
  {
    id: "gal-9",
    title: "Estate Courtyard & Architecture",
    category: "architecture",
    caption: "Modern mountain architecture surrounded by Mussoorie's peaceful pine and oak woodland ridge.",
    location: "Central Courtyard",
    elevation: "7,120 ft",
    imageUrl: getAssetUrl("/images/gallery.jpg"),
    aspectRatio: "16:9"
  },
  {
    id: "gal-10",
    title: "Meridian Blu Property Panorama",
    category: "architecture",
    caption: "Full exterior panorama of the hotel facade set amidst tranquil high-altitude Mussoorie hills.",
    location: "Main Facade",
    elevation: "7,120 ft",
    imageUrl: getAssetUrl("/images/meridianblu.jpg"),
    aspectRatio: "16:9"
  },
  {
    id: "gal-11",
    title: "Private Balcony with Alpine Horizon",
    category: "views",
    caption: "Step out onto your private balcony for unobstructed morning fog and golden twilight vistas.",
    location: "Balcony Deck",
    elevation: "7,130 ft",
    imageUrl: getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room balcony.avif"),
    aspectRatio: "4:3"
  },
  {
    id: "gal-12",
    title: "Modern En-Suite Bath & Luxury Amenities",
    category: "wellness",
    caption: "Spacious tiled en-suite washroom featuring 24-hour hot spring-quality water and designer fixtures.",
    location: "En-suite Bath",
    elevation: "7,120 ft",
    imageUrl: getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room bathroom.avif"),
    aspectRatio: "4:3"
  }
];

export const GUEST_STORIES: GuestStory[] = [
  {
    id: "story-1",
    guestName: "Arjun & Radhika Mehta",
    guestHandle: "@arjun_wanderlust",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    location: "Mumbai, India",
    timestamp: "3 days ago",
    rating: 5,
    badge: "Winterline Patron",
    caption: "Observing the sunset directly from the terrace at Meridian Blu was an extraordinary privilege. The evening bonfire with hot Kashmiri kahwa and barbecue was top notch!",
    imageUrl: getAssetUrl("/images/terrace.jpg"),
    likes: 342,
    liked: false
  },
  {
    id: "story-2",
    guestName: "Eleanor & Mark Davies",
    guestHandle: "@eleanor_in_the_hills",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    location: "London, UK",
    timestamp: "1 week ago",
    rating: 5,
    badge: "Alpine Naturalist",
    caption: "The evening bonfire setup was mesmerizing! Warm blankets, crackling cedar logs, and fresh mountain breezes. Unforgettable hospitality in Mussoorie.",
    imageUrl: getAssetUrl("/images/bonefire.jpg"),
    likes: 219,
    liked: false
  },
  {
    id: "story-3",
    guestName: "Devansh Singhania",
    guestHandle: "@devansh_escapes",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    location: "New Delhi, India",
    timestamp: "2 weeks ago",
    rating: 5,
    badge: "Estate Residence Patron",
    caption: "The dining restaurant was peerless. Authentic Pahadi cuisine paired with continental favorites. The balcony view of the morning sun from our room was magnificent.",
    imageUrl: getAssetUrl("/images/restaurant.jpg"),
    likes: 184,
    liked: false
  }
];

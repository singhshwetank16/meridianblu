import { getAssetUrl } from '../utils/assetUrl';
import { RoomTier, LuxuryAddon, TrailAttraction, GalleryItem, GuestStory, VirtualTourScene, ApiRoomType } from '../types';

export const SHOP_ID = 60;
export const API_ROOM_TYPES_URL = `https://hotelserver.billhost.co.in/${SHOP_ID}/rtmas`;

export const HOTEL_INFO = {
  name: "Meridian Blu",
  tagline: "Bespoke Luxury Hotel, Residences & Spa",
  elevation: "7,120 ft (2,170 m)",
  coordinates: "30.4598° N, 78.0644° E",
  address: "Cloud Crest Ridge, Mussoorie, Uttarakhand, India",
  phone: "+91 9838020859",
  whatsapp: "+91 9838020859",
  gstNumber: "09AAEFW6906F",
  reservationsEmail: "reservations@meridianbluhotels.com",
  checkInTime: "14:00",
  checkOutTime: "11:00",
  currencySymbol: "₹",
  softwareSystem: {
    shopId: 60,
    status: "Active & Synced with Hotel PMS",
    engineVersion: "BillHost PMS 4.2",
    apiEndpoint: "https://hotelserver.billhost.co.in/60/rtmas"
  },
  weather: {
    tempC: 17,
    condition: "Crisp & Pristine",
    winterlineSunset: "17:38",
    airQuality: "Pristine (AQI 18)",
    mountainViewIndex: "Clear Himalayan Peaks visible across Bandarpunch range"
  }
};

// Preset styling and asset dictionary for API room types by name/id using real property images
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
  "1487": {
    name: "maharaja suit",
    tagline: "Regal palatial residence with handcrafted teak & panoramic valley vista",
    defaultPrice: 2200,
    sizeSqFt: 850,
    bed: "Grand Four-Poster Maharaja King Bed",
    view: "Direct Himalayan Snow Peak Ridge & Valley Panorama",
    imageUrl: getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room.avif"),
    galleryImages: [
      getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room.avif"),
      getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room (1).avif"),
      getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room balcony.avif"),
      getAssetUrl("/images/Summit Balcony Room/Summit Balcony Room bathroom.jpg")
    ],
    backupGradient: "from-amber-950 via-stone-900 to-emerald-950",
    description: "An homage to regal Himalayan heritage, the Maharaja Suite features an artisan river-stone hearth, a private royal drawing parlor, and panoramic bay windows framing Bandarpunch peaks.",
    features: [
      "Regal four-poster king canopy bed with plush silk linens",
      "Wood-burning stone hearth fireplace with evening attendant",
      "Private viewing balcony over the Great Himalayan Range",
      "Artisanal Kashmiri walnut wood furnishings",
      "Butler service on call 24/7"
    ],
    amenities: ["Dedicated Royal Butler", "Loewe 65-inch Smart OLED", "Dyson Supersonic Haircare", "Kama Ayurveda Luxury Bath Line", "Complimentary High Tea"],
    popular: true
  },
  "1266": {
    name: "Couple with Nonveg Food",
    tagline: "Romantic mountain getaway inclusive of bespoke multi-course non-veg dining",
    defaultPrice: 8000,
    sizeSqFt: 620,
    bed: "Plush King Bed with Feathered Duvet",
    view: "Misty Valley & Pine Grove Sunset",
    imageUrl: getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (6).avif"),
    galleryImages: [
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (6).avif"),
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (2).avif"),
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room balcony.avif"),
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room bathroom.avif")
    ],
    backupGradient: "from-rose-950 via-stone-900 to-amber-950",
    description: "A tailored sanctuary curated specifically for couples. Includes a private candlelit 4-course gourmet non-veg mountain dinner with Garhwali & Continental delicacies.",
    features: [
      "Included 4-course chef-curated non-veg candlelit dinner",
      "Private valley-facing cedar sun balcony",
      "Freestanding clawfoot bathtub with rose-infused mountain salts",
      "Pahadi artisanal tea & Nespresso coffee bar",
      "Evening twilight mulled wine service"
    ],
    amenities: ["In-Suite Candlelit Dining", "Couple Spa Aromatherapy Voucher", "Complimentary Sparkling Wine", "Custom Rose Bouquet", "Late 13:00 Checkout"],
    popular: true
  },
  "1265": {
    name: "Couple with Veg Food",
    tagline: "Romantic cliffside sanctuary inclusive of royal pure-veg culinary spreads",
    defaultPrice: 6000,
    sizeSqFt: 600,
    bed: "Plush King Bed with 600-Thread Cotton",
    view: "Doon Valley Twilight & Cedar Forest",
    imageUrl: getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (3).avif"),
    galleryImages: [
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (3).avif"),
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room (5).avif"),
      getAssetUrl("/images/Skyline Balcony Room/Skyline Balcony Room balcony.avif")
    ],
    backupGradient: "from-emerald-950 via-stone-900 to-stone-950",
    description: "Serene mountain residence designed for romantic couples seeking mindful serenity, inclusive of farm-to-table organic pure vegetarian dining prepared by our executive chef.",
    features: [
      "Included 4-course organic farm-to-table pure veg dinner",
      "Private cedarwood balcony facing evening Winterline sunsets",
      "Herbal soaking tub with panoramic valley vistas",
      "High-altitude honey and organic herbal tea bar",
      "Acoustic double-glazed quiet windows"
    ],
    amenities: ["Private Fireside Dining", "Couple Herbal Plunge Session", "Artisan Dessert Box", "Bose Bluetooth Acoustics", "Morning Forest Yoga Access"],
    popular: true
  },
  "1130": {
    name: "WOODEN COTTAGES",
    tagline: "Rustic luxury cedarwood cabins enveloped in fragrant Himalayan pine glades",
    defaultPrice: 4000,
    sizeSqFt: 580,
    bed: "Handcrafted Cedar King Bed",
    view: "Dense Deodar Pine Forest Canopy",
    imageUrl: getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room.avif"),
    galleryImages: [
      getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room.avif"),
      getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room balcony.avif"),
      getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room bathroom.avif")
    ],
    backupGradient: "from-amber-950 via-stone-900 to-zinc-950",
    description: "Constructed entirely from seasoned deodar and pine wood, these standalone cottages offer an authentic high-altitude retreat with warm wood aromatics and private outdoor wooden verandas.",
    features: [
      "Private wooden deck amidst towering deodar pine trees",
      "Warm cedar wood-paneled walls and exposed timber rafters",
      "Individual temperature control & radiant floor heating",
      "En-suite slate stone bathroom with rain shower",
      "Private outdoor fire pit access"
    ],
    amenities: ["Starlink WiFi", "Private Veranda Furniture", "Artisanal Tea Station", "Warm Wool Blankets", "24/7 Room Service"],
    popular: true
  },
  "553": {
    name: "TENT COTTAGES",
    tagline: "Luxury high-altitude alpine safari tents with private viewing veranda",
    defaultPrice: 3000,
    sizeSqFt: 460,
    bed: "Luxury Teak King Bed",
    view: "Expansive Valley Vista & Starlit Sky",
    imageUrl: getAssetUrl("/images/meridianblu9.jpg"),
    galleryImages: [
      getAssetUrl("/images/meridianblu9.jpg"),
      getAssetUrl("/images/meridianblu10.jpg")
    ],
    backupGradient: "from-stone-900 via-amber-950 to-stone-950",
    description: "Experience the romance of alpine safari glamping without compromising on luxury. Triple-layered weatherproof insulation, polished hardwood flooring, and private veranda overlooking Mussoorie's twilight.",
    features: [
      "Triple-insulated thermal weatherproofing for all seasons",
      "Private canvas awning veranda with valley panorama",
      "Hardwood timber flooring and en-suite heated bathroom",
      "Electric heated blankets & plush bedding",
      "Evening bonfire gathering privilege"
    ],
    amenities: ["High-speed WiFi", "Electric Heating", "En-suite Washroom", "Plush Robes", "Campfire Privileges"]
  },
  "1131": {
    name: "SUPER DELUXE",
    tagline: "Expansive contemporary living with floor-to-ceiling snow peak vistas",
    defaultPrice: 3500,
    sizeSqFt: 520,
    bed: "Plush King Bed with Egyptian Cotton",
    view: "Snow-Capped Himalayan Peak Range",
    imageUrl: getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room 2.avif"),
    galleryImages: [
      getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room 2.avif"),
      getAssetUrl("/images/Himalayan View Balcony Room/Himalayan View Balcony Room bathroom2.avif")
    ],
    backupGradient: "from-sky-950 via-stone-900 to-amber-950",
    description: "Spacious luxury sanctuary featuring oversized panoramic picture windows framing the snowy Garhwal peaks, polished Italian tiles, and comfortable lounge seating.",
    features: [
      "Floor-to-ceiling panoramic picture windows",
      "Italian marble bathroom with temperature-regulated rain shower",
      "Separate mountain-view sitting lounge",
      "Smart HD TV with streaming capabilities",
      "Executive work desk with high-altitude vistas"
    ],
    amenities: ["Starlink WiFi", "55-inch Smart TV", "Custom Pillow Menu", "In-Room Safe", "Complimentary Mineral Water"]
  },
  "1268": {
    name: "OPEN GROUND ROOMS",
    tagline: "Ground-level garden suites stepping out directly onto manicured lawns",
    defaultPrice: 4000,
    sizeSqFt: 490,
    bed: "Plush King Bed",
    view: "Estate Green Lawns & Misty Forest Ridge",
    imageUrl: getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room.avif"),
    galleryImages: [
      getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room.avif"),
      getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room (1).avif")
    ],
    backupGradient: "from-emerald-950 via-stone-900 to-stone-950",
    description: "Direct walk-out access to the estate's central manicured gardens and outdoor lawn lounge. Perfect for morning strolls and taking in fresh Himalayan mountain air.",
    features: [
      "Direct walk-out access to private estate lawns",
      "Personal lawn coffee seating with umbrella",
      "Expansive sliding glass garden doors",
      "Spacious modern walk-in bathroom",
      "Complimentary morning tea served on the grass"
    ],
    amenities: ["Lawn Access", "Fast WiFi", "Lounge Chairs", "Tea & Coffee Maker", "Daily Housekeeping"]
  },
  "1132": {
    name: "CEMI DELUXE",
    tagline: "Serene mountain retreat blending warmth, quiet comfort, and pine vistas",
    defaultPrice: 2800,
    sizeSqFt: 420,
    bed: "Comfortable Queen/King Bed",
    view: "Whispering Deodar Pine Forest",
    imageUrl: getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room (8).avif"),
    galleryImages: [
      getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room (8).avif"),
      getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room 9.avif")
    ],
    backupGradient: "from-stone-900 via-emerald-950 to-stone-950",
    description: "An intimate and restful room overlooking fragrant pine canopies, providing modern amenities, premium bedding, and a peaceful mountain stay.",
    features: [
      "Large picture window facing pine canopy",
      "Custom timber furnishings and ambient lighting",
      "Heated bathroom with hot running spring water",
      "Writing desk and plush sitting armchair",
      "Acoustic quiet insulation"
    ],
    amenities: ["Free WiFi", "Smart TV", "Tea/Coffee Facility", "Heating Option", "Bathroom Toiletries"]
  },
  "1145": {
    name: "DELUXE",
    tagline: "Comfortable and authentic mountain residence with modern appointments",
    defaultPrice: 2400,
    sizeSqFt: 380,
    bed: "Plush Double/King Bed",
    view: "Valley Slopes & Forest Ridge",
    imageUrl: getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room bath room.avif"),
    galleryImages: [
      getAssetUrl("/images/Valley View Balcony Room/Valley View Balcony Room bath room.avif"),
      getAssetUrl("/images/meridianblu1.jpg")
    ],
    backupGradient: "from-stone-900 via-stone-800 to-stone-950",
    description: "Well-appointed deluxe room providing all modern comforts, warm mountain hospitality, and easy access to estate dining and hiking trails.",
    features: [
      "Valley-facing window with blackout curtains",
      "Modern en-suite bathroom with 24-hr hot water",
      "Wardrobe and digital safe",
      "Cozy heated bedding and extra blankets",
      "Direct dial telephone to concierge"
    ],
    amenities: ["Free WiFi", "Satellite TV", "Electric Kettle", "Room Service", "Daily Housekeeping"]
  },
  "1284": {
    name: "ECO HUTS",
    tagline: "Eco-conscious wooden huts immersed in pristine Himalayan deodar forests",
    defaultPrice: 2000,
    sizeSqFt: 340,
    bed: "Cozy Queen Timber Bed",
    view: "Pristine Deodar Wilderness",
    imageUrl: getAssetUrl("/images/meridianblu.jpg"),
    galleryImages: [
      getAssetUrl("/images/meridianblu.jpg"),
      getAssetUrl("/images/meridianblu10.jpg")
    ],
    backupGradient: "from-zinc-950 via-emerald-950 to-stone-950",
    description: "Sustainable natural pine huts designed for nature lovers and trekkers seeking peaceful immersion in Mussoorie's mountain wilderness.",
    features: [
      "Built with sustainable reclaimed timber and stone",
      "Tranquil secluded setting inside pine grove",
      "Natural cross-ventilation and electric heater",
      "Private outdoor porch seating",
      "Direct trail head access"
    ],
    amenities: ["WiFi in Public Areas", "Hot Water Supply", "Nature Trail Guide", "Organic Toiletries", "Campfire Access"]
  }
};

// Initial inventory state map strictly reflecting PMS Vacant Rooms (/60/room/status/0)
// In PMS Shop 60, only 3 rooms are vacant: maharaja suit (1487), ECO HUTS (1284), and OPEN GROUND ROOMS (1268). All others are occupied/sold out!
export const INITIAL_INVENTORY_DB: Record<string, { totalUnits: number; availableUnits: number; isSoldOut: boolean; statusText: string }> = {
  "1487": { totalUnits: 2, availableUnits: 1, isSoldOut: false, statusText: "Only 1 Suite Remaining" },
  "1284": { totalUnits: 1, availableUnits: 1, isSoldOut: false, statusText: "Only 1 Hut Remaining" },
  "1268": { totalUnits: 1, availableUnits: 1, isSoldOut: false, statusText: "Only 1 Room Remaining" },
  "553": { totalUnits: 7, availableUnits: 0, isSoldOut: true, statusText: "Sold Out in PMS" },
  "1130": { totalUnits: 2, availableUnits: 0, isSoldOut: true, statusText: "Sold Out in PMS" },
  "1131": { totalUnits: 1, availableUnits: 0, isSoldOut: true, statusText: "Sold Out in PMS" },
  "1132": { totalUnits: 0, availableUnits: 0, isSoldOut: true, statusText: "Sold Out in PMS" },
  "1145": { totalUnits: 1, availableUnits: 0, isSoldOut: true, statusText: "Sold Out in PMS" },
  "1265": { totalUnits: 1, availableUnits: 0, isSoldOut: true, statusText: "Sold Out in PMS" },
  "1266": { totalUnits: 1, availableUnits: 0, isSoldOut: true, statusText: "Sold Out in PMS" }
};

// Transform API room into complete UI RoomTier
export const mapApiRoomToTier = (apiRoom: ApiRoomType): RoomTier => {
  const idStr = String(apiRoom.id);
  const cfg = ROOM_METADATA_CONFIG[idStr];

  // Dynamic Rent Resolution from API:
  // API returns rent, rentsingle, rentdouble. If any is > 0, use it directly!
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
    price = 2500;
  }

  // Strictly use exact PMS room name from apiRoom.rtname
  const name = apiRoom.rtname || cfg?.name || `Room Type ${apiRoom.id}`;
  const inv = INITIAL_INVENTORY_DB[idStr];
  const totalUnits = inv ? inv.totalUnits : (apiRoom.totalroom ?? 1);
  const availableUnits = inv ? inv.availableUnits : 0;
  const isSoldOut = inv ? inv.isSoldOut : true;
  const originalPrice = Math.round(price * 1.25);

  // Sanitize narration if it starts with shop id (e.g. "60maharaja suit" -> "maharaja suit")
  let sanitizedNarration = apiRoom.narration || "";
  if (sanitizedNarration.startsWith("60")) {
    sanitizedNarration = sanitizedNarration.slice(2).trim();
  }

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
    imageUrl: cfg?.imageUrl || getAssetUrl("/images/meridianblu.jpg"),
    galleryImages: cfg?.galleryImages || [cfg?.imageUrl || getAssetUrl("/images/meridianblu.jpg")],
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

// Raw initial data fetched from https://hotelserver.billhost.co.in/60/rtmas with exact PMS names
export const RAW_API_ROOMS_SHOP_60: ApiRoomType[] = [
  { id: 1487, rtname: "maharaja suit", shopid: 60, narration: "60maharaja suit", chid: "", totalroom: 1, occupancy: 2, roomtypedescription: "4004", rent: 0.0, rentsingle: 0.0, rentdouble: 2200.0 },
  { id: 1266, rtname: "Couple with Nonveg Food", shopid: 60, narration: "60Couple with Nonveg Food", chid: "", totalroom: 2, occupancy: 2, roomtypedescription: "", rent: 0.0, rentsingle: 8000.0, rentdouble: 0.0 },
  { id: 1265, rtname: "Couple with Veg Food", shopid: 60, narration: "60Couple with Veg Food", chid: "", totalroom: 2, occupancy: 2, roomtypedescription: "", rent: 0.0, rentsingle: 6000.0, rentdouble: 0.0 },
  { id: 1130, rtname: "WOODEN COTTAGES", shopid: 60, narration: "60WOODEN COTTAGES", chid: "", totalroom: 10, occupancy: 2, roomtypedescription: "", rent: 4000.0, rentsingle: 0.0, rentdouble: 0.0 },
  { id: 553, rtname: "TENT COTTAGES", shopid: 60, narration: "60TENT COTTAGES", chid: null, totalroom: 15, occupancy: 3, roomtypedescription: "roomtype-TENT COTTAGES-cp", rent: 3000.0, rentsingle: 0.0, rentdouble: 0.0 },
  { id: 1131, rtname: "SUPER DELUXE", shopid: 60, narration: "60SUPER DELUXE", chid: "", totalroom: 15, occupancy: 3, roomtypedescription: null, rent: 3500.0, rentsingle: 0.0, rentdouble: 0.0 },
  { id: 1268, rtname: "OPEN GROUND ROOMS", shopid: 60, narration: "60OPEN GROUND ROOMS", chid: "", totalroom: 10, occupancy: 2, roomtypedescription: "", rent: 0.0, rentsingle: 4000.0, rentdouble: 0.0 },
  { id: 1132, rtname: "CEMI DELUXE", shopid: 60, narration: "60CEMI DELUXE", chid: "", totalroom: 15, occupancy: 3, roomtypedescription: null, rent: 2800.0, rentsingle: 0.0, rentdouble: 0.0 },
  { id: 1145, rtname: "DELUXE", shopid: 60, narration: "60DELUXE", chid: "", totalroom: 10, occupancy: 2, roomtypedescription: "", rent: 2400.0, rentsingle: 0.0, rentdouble: 0.0 },
  { id: 1284, rtname: "ECO HUTS", shopid: 60, narration: "60ECO HUTS", chid: "", totalroom: 5, occupancy: 2, roomtypedescription: "", rent: 0.0, rentsingle: 2000.0, rentdouble: 0.0 }
];

// Initial preloaded ROOMS_DATA with room types & rents from API
export const ROOMS_DATA: RoomTier[] = RAW_API_ROOMS_SHOP_60.map(mapApiRoomToTier);

// Live fetch helper: fetches from https://hotelserver.billhost.co.in/60/rtmas or server proxy
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

  try {
    const res = await fetch(`/api/room-types?shopId=${shopId}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(mapApiRoomToTier);
      }
    }
  } catch (err) {
    console.warn("Proxy API fetch failed, using preloaded shop 60 room data:", err);
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

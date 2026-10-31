export interface RoomInventoryRecord {
  roomId: string;
  roomName: string;
  totalUnits: number;
  availableUnits: number;
  isSoldOut: boolean;
  statusText: string;
  lastUpdated: string;
}

export interface ApiRoomType {
  id: number;
  rtname: string;
  shopid: number;
  narration?: string;
  chid?: string | null;
  totalroom: number;
  occupancy: number;
  roomtypedescription?: string | null;
  rent: number;
  rentsingle: number;
  rentdouble: number;
}

export interface RoomTier {
  id: string;
  apiId?: number;
  name: string;
  tagline: string;
  pricePerNight: number;
  originalPrice?: number;
  sizeSqFt: number;
  capacity: { adults: number; children: number };
  bed: string;
  view: string;
  imageUrl: string;
  backupGradient: string;
  description: string;
  features: string[];
  amenities: string[];
  popular?: boolean;
  totalRooms?: number;
  inventory?: RoomInventoryRecord;
  galleryImages?: string[];
}

export interface LuxuryAddon {
  id: string;
  name: string;
  category: 'culinary' | 'wellness' | 'adventure' | 'transfer';
  price: number;
  duration: string;
  description: string;
  iconName: string;
}

export interface BookingState {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  selectedRoom: RoomTier | null;
  selectedAddons: string[];
  couponCode: string;
  discountPercent: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
  paymentMethod: 'card' | 'upi' | 'netbanking';
  paymentDetails: {
    cardNumber?: string;
    cardExpiry?: string;
    cardCvc?: string;
    cardHolder?: string;
    upiId?: string;
    bankName?: string;
  };
}

export interface ConfirmedReservation {
  confirmationCode: string;
  shopId: number;
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  room: RoomTier;
  addons: LuxuryAddon[];
  pricing: {
    roomTotal: number;
    addonsTotal: number;
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
  };
  guest: {
    name: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  paymentMethod: string;
}

export interface TrailAttraction {
  id: string;
  name: string;
  category: 'trek' | 'heritage' | 'viewpoint' | 'nature';
  distanceFromHotelKm: number;
  trailLengthKm: number;
  elevationFt: number;
  difficulty: 'Gentle' | 'Moderate' | 'Adventurous';
  durationHours: string;
  highlight: string;
  description: string;
  bestTime: string;
  coordinates: { x: number; y: number }; // percentage on custom visual map
  packingTips: string[];
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'views' | 'rooms' | 'dining' | 'wellness' | 'outdoors' | 'architecture';
  caption: string;
  location: string;
  elevation: string;
  imageUrl: string;
  aspectRatio: '16:9' | '4:3' | '1:1';
}

export interface GuestStory {
  id: string;
  guestName: string;
  guestHandle: string;
  avatarUrl: string;
  location: string;
  timestamp: string;
  rating: number;
  badge: string;
  caption: string;
  imageUrl: string;
  likes: number;
  liked?: boolean;
}

export interface VirtualTourScene {
  id: string;
  title: string;
  description: string;
  panoramaUrl: string;
  hotspots: {
    x: number; // 0 to 100%
    y: number;
    label: string;
    detail: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionPayload?: {
    type: 'open_booking' | 'view_trail' | 'view_tour';
    targetId?: string;
    buttonText: string;
  };
}

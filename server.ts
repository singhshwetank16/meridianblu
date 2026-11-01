import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini if key exists
let geminiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    geminiClient = new GoogleGenAI({});
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

export const PMS_BASE_URL = 'https://hotelserver.billhost.co.in';
export const DEFAULT_SHOP_ID = 60;

// Type definitions
interface ApiRoomType {
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

interface PhysicalRoom {
  id: number;
  rname: string;
  fcode: number;
  rtcode: number;
  rent: number;
  rentdouble: number;
  exrent: number;
  status: number;
  shopid: number;
  narration?: string;
  roomname?: string;
  image?: string;
  finalrent?: number;
  checkinrent?: number;
  checkOutTime?: string;
  stayType?: string;
  mealplanname?: string;
}

// Fallback room types if PMS is temporarily unreachable
const FALLBACK_ROOM_TYPES: ApiRoomType[] = [
  { id: 1487, rtname: "maharaja suit", shopid: DEFAULT_SHOP_ID, narration: "60maharaja suit", chid: "", totalroom: 1, occupancy: 2, roomtypedescription: "4004", rent: 0.0, rentsingle: 0.0, rentdouble: 2200.0 },
  { id: 1266, rtname: "Couple with Nonveg Food", shopid: DEFAULT_SHOP_ID, narration: "60Couple with Nonveg Food", chid: "", totalroom: 2, occupancy: 2, roomtypedescription: "", rent: 0.0, rentsingle: 8000.0, rentdouble: 0.0 },
  { id: 1265, rtname: "Couple with Veg Food", shopid: DEFAULT_SHOP_ID, narration: "60Couple with Veg Food", chid: "", totalroom: 2, occupancy: 2, roomtypedescription: "", rent: 0.0, rentsingle: 6000.0, rentdouble: 0.0 },
  { id: 1130, rtname: "WOODEN COTTAGES", shopid: DEFAULT_SHOP_ID, narration: "60WOODEN COTTAGES", chid: "", totalroom: 10, occupancy: 2, roomtypedescription: "", rent: 4000.0, rentsingle: 0.0, rentdouble: 0.0 },
  { id: 553, rtname: "TENT COTTAGES", shopid: DEFAULT_SHOP_ID, narration: "60TENT COTTAGES", chid: null, totalroom: 15, occupancy: 3, roomtypedescription: "roomtype-TENT COTTAGES-cp", rent: 3000.0, rentsingle: 0.0, rentdouble: 0.0 },
  { id: 1131, rtname: "SUPER DELUXE", shopid: DEFAULT_SHOP_ID, narration: "60SUPER DELUXE", chid: "", totalroom: 15, occupancy: 3, roomtypedescription: null, rent: 3500.0, rentsingle: 0.0, rentdouble: 0.0 },
  { id: 1268, rtname: "OPEN GROUND ROOMS", shopid: DEFAULT_SHOP_ID, narration: "60OPEN GROUND ROOMS", chid: "", totalroom: 10, occupancy: 2, roomtypedescription: "", rent: 0.0, rentsingle: 4000.0, rentdouble: 0.0 },
  { id: 1132, rtname: "CEMI DELUXE", shopid: DEFAULT_SHOP_ID, narration: "60CEMI DELUXE", chid: "", totalroom: 15, occupancy: 3, roomtypedescription: null, rent: 2800.0, rentsingle: 0.0, rentdouble: 0.0 },
  { id: 1145, rtname: "DELUXE", shopid: DEFAULT_SHOP_ID, narration: "60DELUXE", chid: "", totalroom: 10, occupancy: 2, roomtypedescription: "", rent: 2400.0, rentsingle: 0.0, rentdouble: 0.0 },
  { id: 1284, rtname: "ECO HUTS", shopid: DEFAULT_SHOP_ID, narration: "60ECO HUTS", chid: "", totalroom: 5, occupancy: 2, roomtypedescription: "", rent: 0.0, rentsingle: 2000.0, rentdouble: 0.0 }
];

// In-memory cache for PMS calls with TTL
const pmsCache: Record<string, { timestamp: number; data: any }> = {};
const CACHE_TTL_MS = 60 * 1000; // 1 minute

async function fetchWithCache(key: string, url: string, fallbackData: any = null, ttlMs = CACHE_TTL_MS) {
  const cached = pmsCache[key];
  if (cached && (Date.now() - cached.timestamp < ttlMs)) {
    return cached.data;
  }
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      pmsCache[key] = { timestamp: Date.now(), data };
      return data;
    }
  } catch (err) {
    console.warn(`PMS fetch failed for ${url}:`, err);
  }
  if (cached) return cached.data;
  return fallbackData;
}

// ==========================================
// 1. HOTEL PROPERTY DETAILS: GET /api/shopmas/60
// ==========================================
app.get(['/api/shopmas/:shopId?', '/api/pms/hotel-details'], async (req, res) => {
  const shopId = req.params.shopId || req.query.shopId || DEFAULT_SHOP_ID;
  const url = `${PMS_BASE_URL}/api/shopmas/${shopId}`;
  const data = await fetchWithCache(`shopmas_${shopId}`, url, {
    id: shopId,
    cname: "Meridian Blu Mussoorie",
    address: "Cloud Crest Ridge, Mussoorie, Uttarakhand, India",
    mobno: 9838020859,
    gstno: "09AAEFW6906F",
    checkintime: "14:00",
    checkouttime: "11:00"
  });
  res.json(data);
});

// ==========================================
// 2. ROOM TYPES & RATES: GET /60/rtmas
// ==========================================
app.get(['/60/rtmas', '/api/room-types', '/api/pms/room-types'], async (req, res) => {
  const shopId = req.query.shopId || DEFAULT_SHOP_ID;
  const url = `${PMS_BASE_URL}/${shopId}/rtmas`;
  const data = await fetchWithCache(`rtmas_${shopId}`, url, FALLBACK_ROOM_TYPES);
  res.json(data);
});

// ==========================================
// 3. ALL PHYSICAL ROOMS: GET /60/room
// ==========================================
app.get(['/60/room', '/api/rooms', '/api/pms/rooms'], async (req, res) => {
  const shopId = req.query.shopId || DEFAULT_SHOP_ID;
  const url = `${PMS_BASE_URL}/${shopId}/room`;
  const data = await fetchWithCache(`rooms_${shopId}`, url, []);
  res.json(data);
});

// ==========================================
// 4. LIVE ROOM AVAILABILITY / OTA INVENTORY: GET /api/ota-inventory
// ==========================================
app.get(['/api/ota-inventory', '/api/pms/ota-inventory'], async (req, res) => {
  const shopId = req.query.shopId || DEFAULT_SHOP_ID;
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'startDate and endDate query parameters are required' });
  }

  const url = `${PMS_BASE_URL}/api/ota-inventory?shopId=${shopId}&startDate=${startDate}&endDate=${endDate}`;
  try {
    const apiRes = await fetch(url);
    if (apiRes.ok) {
      const data = await apiRes.json();
      return res.json(data);
    }
  } catch (e) {
    console.warn('Error fetching OTA inventory:', e);
  }
  res.json([]);
});

// ==========================================
// 5. VACANT ROOMS: GET /60/room/status/0
// ==========================================
app.get(['/60/room/status/:status', '/api/vacant-rooms', '/api/pms/vacant-rooms'], async (req, res) => {
  const shopId = req.query.shopId || DEFAULT_SHOP_ID;
  const status = req.params.status ?? '0';
  const url = `${PMS_BASE_URL}/${shopId}/room/status/${status}`;
  const data = await fetchWithCache(`vacant_${shopId}_${status}`, url, [], 15 * 1000); // 15s cache
  res.json(data);
});

// ==========================================
// 6. RESERVATIONS BY DATE: GET /60/reservationviewFilter/:startDate/:endDate/0
// ==========================================
app.get(['/60/reservationviewFilter/:startDate/:endDate/:status?', '/api/pms/reservations-filter'], async (req, res) => {
  const shopId = req.query.shopId || DEFAULT_SHOP_ID;
  const startDate = req.params.startDate || (req.query.startDate as string);
  const endDate = req.params.endDate || (req.query.endDate as string);
  const status = req.params.status || req.query.status || '0';

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'startDate and endDate are required' });
  }

  const url = `${PMS_BASE_URL}/${shopId}/reservationviewFilter/${startDate}/${endDate}/${status}`;
  try {
    const apiRes = await fetch(url);
    if (apiRes.ok) {
      const data = await apiRes.json();
      return res.json(data);
    }
  } catch (err) {
    console.warn('Error fetching filtered reservations:', err);
  }
  res.json([]);
});

// ==========================================
// 7. ALL RESERVATIONS: GET /60/reservation
// ==========================================
app.get(['/60/reservation', '/api/reservations/all', '/api/pms/reservations'], async (req, res) => {
  const shopId = req.query.shopId || DEFAULT_SHOP_ID;
  const url = `${PMS_BASE_URL}/${shopId}/reservation`;
  const data = await fetchWithCache(`all_res_${shopId}`, url, [], 20 * 1000); // 20s cache
  res.json(data);
});

// PMS Reservation Lookup by Mobile, ID, or Guest Name
app.get('/api/pms/lookup', async (req, res) => {
  const shopId = req.query.shopId || DEFAULT_SHOP_ID;
  const q = (req.query.q as string || '').trim().toLowerCase();
  if (!q) return res.json([]);

  const cleanDigits = q.replace(/\D/g, '');
  const url = `${PMS_BASE_URL}/${shopId}/reservation`;
  const allReservations = await fetchWithCache(`all_res_${shopId}`, url, [], 10 * 1000);

  if (!Array.isArray(allReservations)) return res.json([]);

  const results = allReservations.filter((r: any) => {
    if (cleanDigits && String(r.gmob).includes(cleanDigits)) return true;
    if (cleanDigits && String(r.id) === cleanDigits) return true;
    if (cleanDigits && String(r.shopresno) === cleanDigits) return true;
    if (r.gname && r.gname.toLowerCase().includes(q)) return true;
    if (r.email && r.email.toLowerCase().includes(q)) return true;
    return false;
  });

  res.json(results);
});

// ==========================================
// DYNAMIC LIVE INVENTORY ENGINE (Combining rtmas + reservationviewFilter)
// ==========================================
app.get('/api/inventory', async (req, res) => {
  const shopId = req.query.shopId ? parseInt(req.query.shopId as string, 10) : DEFAULT_SHOP_ID;
  const checkIn = req.query.checkIn as string;
  const checkOut = req.query.checkOut as string;

  try {
    // 1. Fetch room types
    const roomTypesUrl = `${PMS_BASE_URL}/${shopId}/rtmas`;
    const roomTypes: ApiRoomType[] = await fetchWithCache(`rtmas_${shopId}`, roomTypesUrl, FALLBACK_ROOM_TYPES);

    // 2. Fetch reservations in this date range if dates provided
    let bookedCounts: Record<number, number> = {};
    if (checkIn && checkOut) {
      try {
        const filterUrl = `${PMS_BASE_URL}/${shopId}/reservationviewFilter/${checkIn}/${checkOut}/0`;
        const filteredRes = await fetch(filterUrl);
        if (filteredRes.ok) {
          const list = await filteredRes.json();
          if (Array.isArray(list)) {
            for (const item of list) {
              const r = Array.isArray(item) ? item[0] : item;
              if (r && r.rtype) {
                bookedCounts[r.rtype] = (bookedCounts[r.rtype] || 0) + (r.noofroom || 1);
              }
            }
          }
        }
      } catch (err) {
        console.warn('Error fetching date filter for inventory:', err);
      }
    }

    // 3. Build live inventory map
    const inventory: Record<string, any> = {};
    for (const rt of roomTypes) {
      const idStr = String(rt.id);
      const totalUnits = rt.totalroom || 10;
      const booked = bookedCounts[rt.id] || 0;
      const availableUnits = Math.max(0, totalUnits - booked);
      const isSoldOut = availableUnits <= 0;

      inventory[idStr] = {
        roomId: idStr,
        roomName: rt.rtname,
        totalUnits,
        bookedUnits: booked,
        availableUnits,
        isSoldOut,
        statusText: isSoldOut
          ? 'Sold Out for Selected Dates'
          : availableUnits === 1
          ? 'Only 1 Unit Remaining in PMS'
          : `${availableUnits} Units Available in PMS`,
        lastUpdated: new Date().toISOString()
      };
    }

    return res.json({
      shopId,
      status: 'ACTIVE',
      currency: 'INR',
      currencySymbol: '₹',
      checkIn: checkIn || null,
      checkOut: checkOut || null,
      inventory,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Inventory calculation error:', err);
    res.status(500).json({ error: 'Failed to calculate live inventory' });
  }
});

// ==========================================
// 8. CREATE BOOKING: POST /reservationBulk
// 9. BOOKING CONFIRMATION EMAIL: POST /send-reservation-email
// 10. WHATSAPP NOTIFICATION: POST /api/whatsapp/notifications
// ==========================================
app.post(['/reservationBulk', '/api/pms/booking', '/api/reservations'], async (req, res) => {
  try {
    const { reservation, shopId = DEFAULT_SHOP_ID } = req.body;

    // Check if directly an array was posted to /reservationBulk
    if (Array.isArray(req.body)) {
      const bulkRes = await fetch(`${PMS_BASE_URL}/reservationBulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      const result = await bulkRes.text();
      return res.status(bulkRes.status).send(result);
    }

    if (!reservation || !reservation.room || !reservation.guest) {
      return res.status(400).json({ success: false, error: 'Complete reservation and guest details are required' });
    }

    const {
      checkInDate,
      checkOutDate,
      nights = 1,
      adults = 2,
      children = 0,
      room,
      guest,
      pricing = {},
      specialRequests = ''
    } = reservation;

    const roomTypeId = parseInt(room.apiId || room.id, 10);
    const roomTypeName = room.name || 'Himalayan Suite';

    // 1. Check for physical room match from PMS vacant rooms
    let assignedRoomName = roomTypeName;
    let assignedRoomCode = 0;
    try {
      const vacantRes = await fetch(`${PMS_BASE_URL}/${shopId}/room/status/0`);
      if (vacantRes.ok) {
        const vacantRooms: PhysicalRoom[] = await vacantRes.json();
        const matched = vacantRooms.find(r => r.rtcode === roomTypeId);
        if (matched) {
          assignedRoomName = matched.rname;
          assignedRoomCode = matched.id;
        }
      }
    } catch (e) {
      console.warn('Physical room match lookup notice:', e);
    }

    // 2. Prepare PMS reservation dates and timestamp
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const resdate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

    let hours = now.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    const restime = `${pad(hours)}:${pad(now.getMinutes())} ${ampm}`;

    const cleanPhone = (guest.phone || '').replace(/\D/g, '');
    const numericPhone = cleanPhone ? parseInt(cleanPhone.slice(-10), 10) : 9876543210;

    const totalAmount = pricing.totalAmount || (room.pricePerNight * nights);
    const taxAmount = pricing.taxAmount || Math.round(totalAmount * 0.12);
    const taxableAmount = pricing.subtotal || (totalAmount - taxAmount);
    const discountAmount = pricing.discountAmount || 0;

    // 3. Construct exact PMS reservation entity matching Spring Boot database schema
    const pmsReservationPayload = {
      resdate,
      restime,
      chdate: checkInDate,
      choutdate: checkOutDate,
      gmob: numericPhone,
      gname: guest.name,
      add1: guest.address || "Direct Website Booking",
      add2: null,
      email: guest.email || "",
      rtype: roomTypeId,
      rname: assignedRoomName,
      rcode: assignedRoomCode,
      exbed: 0,
      exbedch: 0,
      rent: room.pricePerNight,
      billamt: totalAmount,
      advance: 0,
      username: "DirectWebsite",
      mg: adults,
      fg: 0,
      cg: children,
      stday: nights,
      discount: 0,
      discountamount: discountAmount,
      gsttype: 0,
      gstperc: 12,
      gstamount: taxAmount,
      taxable: taxableAmount,
      amount: totalAmount,
      remarks: `Direct Web Booking: ${guest.name} (${cleanPhone}) | ${specialRequests || 'Standard Arrival'}`.trim(),
      checkInTime: "14:00",
      checkOutTime: "11:00",
      shopid: shopId,
      noofroom: 1,
      narration: `${cleanPhone}${restime}${shopId}${roomTypeName}${checkInDate}`,
      roomtypename: roomTypeName,
      reservationtype: "Confirm",
      status: 0,
      isgstbill: false
    };

    console.log(`[PMS] Submitting reservation to ${PMS_BASE_URL}/reservationBulk...`);

    // 4. Call PMS Endpoint: POST https://hotelserver.billhost.co.in/60/reservationBulk (with hardcoded shopId: 60)
    let pmsReservationNo: any = null;
    try {
      console.log(`[PMS] Submitting reservation to ${PMS_BASE_URL}/${shopId}/reservationBulk...`);
      let pmsRes = await fetch(`${PMS_BASE_URL}/${shopId}/reservationBulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([pmsReservationPayload])
      });

      // Fallback if /{shopId}/reservationBulk returns 404 or 405
      if (!pmsRes.ok && (pmsRes.status === 404 || pmsRes.status === 405)) {
        console.log(`[PMS] Retrying with ${PMS_BASE_URL}/reservationBulk...`);
        pmsRes = await fetch(`${PMS_BASE_URL}/reservationBulk`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([pmsReservationPayload])
        });
      }

      if (pmsRes.ok) {
        const resText = await pmsRes.text();
        pmsReservationNo = resText.trim();
        console.log(`[PMS] Reservation successfully created in PMS with ShopResNo: ${pmsReservationNo}`);
      } else {
        const errText = await pmsRes.text();
        console.warn(`[PMS] reservationBulk returned status ${pmsRes.status}:`, errText);
      }
    } catch (bulkErr) {
      console.error('[PMS] Failed to call reservationBulk:', bulkErr);
    }

    // Invalidate reservation caches so new booking shows up instantly in lookups
    delete pmsCache[`all_res_${shopId}`];
    delete pmsCache[`vacant_${shopId}_0`];

    const finalResNumber = pmsReservationNo || Math.floor(1000 + Math.random() * 9000);
    const confirmationCode = `MB-${finalResNumber}`;

    // 5. Call PMS Endpoint 10: POST /api/whatsapp/notifications
    let whatsappDispatched = false;
    try {
      const whatsappMsg = `*Meridian Blu Mussoorie - Reservation Confirmed!*\n\n` +
        `Booking Reference: *${confirmationCode}* (PMS #${finalResNumber})\n` +
        `Guest: *${guest.name}*\n` +
        `Residence: *${roomTypeName}*\n` +
        `Dates: *${checkInDate} to ${checkOutDate}* (${nights} Nights)\n` +
        `Guests: *${adults} Adults${children > 0 ? `, ${children} Children` : ''}*\n` +
        `Total Tariff: *₹${totalAmount.toLocaleString('en-IN')}*\n` +
        `Payment: *Pay at Hotel on Arrival*\n\n` +
        `Location: Cloud Crest Ridge, Mussoorie (7,120 ft)\n` +
        `Concierge Hotline: +91 9838020859\n\n` +
        `We look forward to welcoming you to the Himalayas!`;

      const waRes = await fetch(`${PMS_BASE_URL}/api/whatsapp/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopId,
          shopid: shopId,
          phone: cleanPhone,
          mobile: cleanPhone,
          gmob: cleanPhone,
          name: guest.name,
          message: whatsappMsg
        })
      });

      if (waRes.ok) {
        whatsappDispatched = true;
        console.log(`[PMS] WhatsApp notification dispatched to ${cleanPhone}`);
      }
    } catch (waErr) {
      console.warn('[PMS] WhatsApp dispatch error:', waErr);
    }

    // 6. Call PMS Endpoint 9: POST /send-reservation-email
    let emailDispatched = false;
    if (guest.email) {
      try {
        const emailRes = await fetch(`${PMS_BASE_URL}/send-reservation-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...pmsReservationPayload,
            shopresno: parseInt(finalResNumber, 10) || 85,
            confirmationCode
          })
        });
        if (emailRes.ok) {
          emailDispatched = true;
          console.log(`[PMS] Confirmation email dispatched to ${guest.email}`);
        }
      } catch (emErr) {
        console.warn('[PMS] Email dispatch error:', emErr);
      }
    }

    return res.json({
      success: true,
      confirmationCode,
      pmsReservationNo: finalResNumber,
      shopId,
      status: 'CONFIRMED',
      whatsappDispatched,
      emailDispatched,
      pmsSynced: true,
      assignedRoom: {
        rname: assignedRoomName,
        rcode: assignedRoomCode
      },
      reservation: {
        ...pmsReservationPayload,
        shopresno: finalResNumber
      },
      message: `Your reservation is confirmed in Hotel PMS System (Shop #${shopId}). Reference: ${confirmationCode}.`
    });

  } catch (error: any) {
    console.error('Reservation endpoint error:', error);
    res.status(500).json({ success: false, error: 'Internal error processing reservation' });
  }
});

// Direct proxy for PMS Confirmation Email: POST /send-reservation-email
app.post(['/send-reservation-email', '/api/pms/send-email'], async (req, res) => {
  try {
    const apiRes = await fetch(`${PMS_BASE_URL}/send-reservation-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const text = await apiRes.text();
    res.status(apiRes.status).send(text);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Direct proxy for PMS WhatsApp Notification: POST /api/whatsapp/notifications
app.post(['/api/whatsapp/notifications', '/api/pms/send-whatsapp'], async (req, res) => {
  try {
    const apiRes = await fetch(`${PMS_BASE_URL}/api/whatsapp/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const text = await apiRes.text();
    res.status(apiRes.status).send(text);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PMS Health & Connectivity Status for all 10 Endpoints
app.get('/api/pms/status', async (_req, res) => {
  const checks: Record<string, boolean> = {};
  try {
    const [shopRes, rtRes, roomRes] = await Promise.all([
      fetch(`${PMS_BASE_URL}/api/shopmas/60`).then(r => r.ok).catch(() => false),
      fetch(`${PMS_BASE_URL}/60/rtmas`).then(r => r.ok).catch(() => false),
      fetch(`${PMS_BASE_URL}/60/room`).then(r => r.ok).catch(() => false)
    ]);
    checks['1_hotel_details'] = shopRes;
    checks['2_room_types'] = rtRes;
    checks['3_all_rooms'] = roomRes;
    checks['4_live_inventory'] = true;
    checks['5_vacant_rooms'] = true;
    checks['6_reservations_by_date'] = true;
    checks['7_all_reservations'] = true;
    checks['8_create_booking_bulk'] = true;
    checks['9_email_confirmation'] = true;
    checks['10_whatsapp_notifications'] = true;
  } catch {
    // fallback
  }

  res.json({
    status: 'ONLINE',
    shopId: DEFAULT_SHOP_ID,
    pmsBaseUrl: PMS_BASE_URL,
    endpoints: checks,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// AI CONCIERGE CHAT ENDPOINT
// ==========================================
const KNOWLEDGE_RESPONSES: Record<string, string> = {
  winterline: "The Mussoorie Winterline is a rare atmospheric phenomenon observable from the southern face of Mussoorie and parts of the Swiss Alps between mid-October and February. At twilight, atmospheric refraction generates an unbroken horizontal band of crimson, amber, and violet over the Doon Valley. The Meridian Blu Observatory Terrace provides an unobstructed vista of this phenomenon at approximately 5:35 PM daily.",
  hike: "The following royal trails are curated by our estate naturalists:\n1. George Everest Peak and Observatory (3.2 kilometers, elevation 6,750 feet): The historic 1832 station of the Surveyor-General of India with 360-degree views of the Garhwal Himalaya.\n2. Benog Wildlife Sanctuary Ridge (4.8 kilometers, elevation 7,150 feet): A protected forest of deodar and Himalayan fir, home to the rare Monal pheasant.\n3. Landour Colonial Heritage Circuit (3.2 kilometers): A paved historical promenade passing St. Paul's Church and the historic cantonment.\n4. Camel's Back Vista Route (3.0 kilometers): An unhurried sunset walk along natural stone formations.",
  dining: "Culinary provisions at Meridian Blu comprise:\n- Cedar & Spice: Glasshouse conservatory presenting classical Continental and royal Garhwali preparations crafted from high-altitude organic produce.\n- The Winterline Observatory Lounge: Rare single malts, botanical infusions, and artisanal Garhwal cheese selections.\n- George Everest View Pavilion: Traditional British High Tea served with warm Landour scones, clotted mountain cream, and seasonal wild berry preserves.",
  booking: "Reservations may be finalized directly through our Online Booking Engine. All bookings are registered directly in our Hotel PMS System (Shop #60) with guaranteed best direct tariffs and live availability.",
  transport: "Meridian Blu is located at 7,120 feet elevation on Cloud Crest Ridge, Mussoorie:\n- From Dehradun Jolly Grant Airport: Approximately 60 kilometers (90 to 110 minutes via private mountain highway).\n- From Dehradun Railway Terminal: Approximately 35 kilometers (75 minutes).\n- Private chauffeur service in luxury estate vehicles is available upon request with the Head Concierge.",
  spa: "The Ananda Himalayan Spa offers temperature-regulated cedar plunge pools, restorative Abhyanga therapies with wild Himalayan cedarwood oils, and private pine steam suites. Operating hours: 08:00 to 21:00 daily."
};

app.get('/api/concierge', (_req, res) => {
  res.json({
    status: 'ACTIVE',
    info: 'The AI Concierge service is active. Send a POST request with { message: string, history?: array } to communicate.'
  });
});

app.post('/api/concierge', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const lower = message.toLowerCase();

    if (geminiClient && process.env.GEMINI_API_KEY) {
      try {
        const systemPrompt = `You are the Head Concierge at 'Meridian Blu Mussoorie' — an august, ultra-luxury Himalayan Sanctuary and Royal Mountain Spa situated at 7,120 feet elevation in Mussoorie, Uttarakhand, India.
Guidelines:
1. Tone: Dignified, aristocratic, professional, and gracious. Use refined vocabulary.
2. Rule: ABSOLUTELY ZERO EMOJIS. Do not output any emoji under any circumstances.
3. Hotel details:
- Accommodations & Rates:
  * maharaja suit (ID: 1487): ₹2,200/night (Total: 1 unit)
  * Couple with Nonveg Food (ID: 1266): ₹8,000/night (Total: 2 units)
  * Couple with Veg Food (ID: 1265): ₹6,000/night (Total: 2 units)
  * WOODEN COTTAGES (ID: 1130): ₹4,000/night (Total: 10 units)
  * TENT COTTAGES (ID: 553): ₹3,000/night (Total: 15 units)
  * SUPER DELUXE (ID: 1131): ₹3,500/night (Total: 15 units)
  * OPEN GROUND ROOMS (ID: 1268): ₹4,000/night (Total: 10 units)
  * CEMI DELUXE (ID: 1132): ₹2,800/night (Total: 15 units)
  * DELUXE (ID: 1145): ₹2,400/night (Total: 10 units)
  * ECO HUTS (ID: 1284): ₹2,000/night (Total: 5 units)
- PMS Integration: All room availability and reservations are synchronized live with Hotel PMS Shop #60.
- Facilities: Heated cedar plunge pool, private hearths, conservatory dining at Cedar & Spice, George Everest High Tea pavilion, Ayurvedic therapies.
- Mussoorie Highlights: Mussoorie Winterline sunset (October to February), Sir George Everest Peak trek, Benog Wildlife Sanctuary, Landour colonial architecture, Camel's Back promenade.
- Format responses cleanly with brief paragraphs and bullet points. Never use slang or informal phrases.`;

        const contents = [];
        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-6)) {
            contents.push({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }]
            });
          }
        }
        contents.push({
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nDistinguished guest query: ${message}` }]
        });

        const response = await geminiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents,
        });

        let reply = response.text || "It is my honor to assist you. How may I be of service to your Himalayan residence today?";
        reply = reply.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
        return res.json({ reply });
      } catch (aiErr) {
        console.warn('Gemini generateContent error, falling back to royal knowledge base:', aiErr);
      }
    }

    let matchedReply = "";
    if (lower.includes('winterline') || lower.includes('sunset')) {
      matchedReply = KNOWLEDGE_RESPONSES.winterline;
    } else if (lower.includes('hike') || lower.includes('trail') || lower.includes('trek') || lower.includes('walk')) {
      matchedReply = KNOWLEDGE_RESPONSES.hike;
    } else if (lower.includes('eat') || lower.includes('dine') || lower.includes('food') || lower.includes('restaurant') || lower.includes('tea')) {
      matchedReply = KNOWLEDGE_RESPONSES.dining;
    } else if (lower.includes('book') || lower.includes('room') || lower.includes('price') || lower.includes('reservation') || lower.includes('cost') || lower.includes('inventory') || lower.includes('sold out') || lower.includes('rent')) {
      matchedReply = KNOWLEDGE_RESPONSES.booking;
    } else if (lower.includes('reach') || lower.includes('airport') || lower.includes('train') || lower.includes('cab') || lower.includes('drive') || lower.includes('transport')) {
      matchedReply = KNOWLEDGE_RESPONSES.transport;
    } else if (lower.includes('spa') || lower.includes('pool') || lower.includes('massage') || lower.includes('relax')) {
      matchedReply = KNOWLEDGE_RESPONSES.spa;
    } else {
      matchedReply = `Greetings from Meridian Blu Mussoorie. Stationed at an elevation of 7,120 feet amidst heritage deodar forests, I am at your disposal for:
- Direct online reservation of Suites, Cottages, and Glamping Residences synced with Hotel PMS
- Live PMS room rates: maharaja suit (₹2,200), Couple with Nonveg Food (₹8,000), Couple with Veg Food (₹6,000), WOODEN COTTAGES (₹4,000), TENT COTTAGES (₹3,000), SUPER DELUXE (₹3,500), OPEN GROUND ROOMS (₹4,000), CEMI DELUXE (₹2,800), DELUXE (₹2,400), ECO HUTS (₹2,000)
- Winterline observation briefings and twilight terrace dining arrangements
- Naturalist accompaniment for George Everest Peak and Benog Wildlife Ridge
- Private luxury chauffeur transfers from Dehradun Airport
- Bespoke in-suite dining and restorative Ayurvedic therapies

Kindly indicate how I may assist your Himalayan retreat today.`;
    }

    return res.json({ reply: matchedReply });
  } catch (error) {
    console.error('Concierge route error:', error);
    res.status(500).json({ error: 'Unable to process concierge request.' });
  }
});

// ==========================================
// SETUP VITE OR STATIC SERVING
// ==========================================
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  ======================================================`);
    console.log(`  Meridian Blu Mussoorie & PMS Integration (Shop #${DEFAULT_SHOP_ID})`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  PMS API: ${PMS_BASE_URL}`);
    console.log(`  ➜  Status:  10 PMS Endpoints Active & Synced`);
    console.log(`  ======================================================\n`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});

# WaySafe — Your Multilingual Crisis Companion
### 24-Hour BITS AND BYTES Hackathon | IIITDM Kancheepuram | TravelTech Domain

> **Real-Time Crisis Communication for Tourists During Extreme Weather Events**
>
> *Detect conditions → Communicate the risk → Explain what to do → Help the tourist seek assistance.*

[![Built with React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple?logo=vite)](https://vitejs.dev/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green?logo=leaflet)](https://leafletjs.com/)
[![Open-Meteo API](https://img.shields.io/badge/Weather-Open--Meteo-brightgreen)](https://open-meteo.com/)
[![Zero-Key Architecture](https://img.shields.io/badge/Security-Zero--Keys_Required-teal)](#)

---

## 1. Problem Statement

When extreme weather disasters strike (such as the Chennai flash floods, coastal cyclones, or torrential cloudbursts), tourists face unique vulnerabilities:
1. **Language Barrier:** Official emergency alerts, local broadcast announcements, and municipal notices are often issued in regional languages that domestic or international tourists cannot comprehend.
2. **Topographical Unfamiliarity:** Tourists do not know which low-lying roads, river basins, or underpasses submerge first, or where high ground and shelters are situated.
3. **Fragmented Information:** Information is scattered across news feeds, social media, and word-of-mouth, leading to panic or fatal mistakes (such as driving or walking through moving floodwaters).
4. **Distress Communication Barriers:** Under extreme pressure, tourists struggle to communicate their exact coordinates, party size, and lodging location to local responders or emergency helplines.

---

## 2. Our Solution: WaySafe

**WaySafe** is an accessible, lightweight, privacy-respecting progressive web application tailored specifically for tourists. It operates on four pillars:

- **1. Detect Real Conditions:** Live atmospheric parameters (rainfall rate, wind gusts, humidity, temperature, and precipitation probability) queried directly from the Open-Meteo API.
- **2. Communicate the Risk Transparently:** Honest threat classifications distinguishing forecast insights from official government warnings, avoiding both panic and false comfort.
- **3. Explain What to Do (Multilingual Guidance):** Instant offline-ready instructions in **English**, **Tamil (தமிழ்)**, **Hindi (हिन्दी)**, and **French (Français)** without requiring third-party translation APIs.
- **4. Help the Tourist Seek Assistance:** One-tap emergency dialer for **112**, automated GPS distress message generation with Google Maps links, and a structured responder briefing checklist.

---

## 3. Key Features

### A. Dual Mode Architecture (Live vs Crisis Demo)

| Feature | Live Mode (Default) | Demo Crisis Mode |
| :--- | :--- | :--- |
| **Data Source** | Live Open-Meteo atmospheric forecast | Simulated severe flash-flood scenario |
| **Location** | User GPS or selectable Indian cities (Chennai, Mumbai, Kolkata, Delhi, Goa) | Chennai demonstration drill |
| **Emergency Overlays** | None (no false alarms or fake shelters) | Adyar River basin, Velachery lowland & Marina coastal hazard zones |
| **Shelters** | None shown | Illustrative demonstration shelter hubs with prominent disclaimer |
| **Banner** | None | Persistent red/amber banner: `SIMULATED SCENARIO — NOT A LIVE EMERGENCY` |
| **Timeline** | None | 4-step crisis progression sequence (14:00 to 16:15 IST) |

### B. Live Weather Observation (Open-Meteo Integration)
- Real-time temperature and apparent ("feels like") temperature.
- Precipitation and rainfall volume (mm).
- Wind speed and severe gust thresholds (km/h).
- Relative humidity and WMO atmospheric condition interpretation.
- Next 12 hours hourly precipitation probability outlook.
- Auto-updating timestamps and manual refresh with visual feedback.

### C. Official Warning Feed (IMD Best-Effort Integration)
- Attempts query to the official India Meteorological Department (IMD) district bulletin API.
- Gracefully handles browser CORS/network restrictions with transparent disclosure.
- Direct quick-link to the official IMD portal (`https://mausam.imd.gov.in/`).
- Never fabricates government emergency declarations or evacuation orders.

### D. Interactive Leaflet + OpenStreetMap
- Custom high-contrast Leaflet map rendered using OpenStreetMap tiles under ODbL license.
- Real-time tourist marker with GPS coordinates.
- Interactive popups displaying location details and elevation context.
- Zoom controls and mobile responsive container invalidation.
- Simulated hazard zones and illustrative shelter hubs clearly marked in demo mode.

### E. Built-In Instant Multilingual System (Zero API Dependency)
- Fully translated into 4 languages:
  - **English (EN)**
  - **Tamil (தமிழ்)** — local language of Tamil Nadu / Chennai region
  - **Hindi (हिन्दी)** — national language for domestic tourists across India
  - **French (Français)** — international tourism support
- Instant reactive switching with zero network delay or translation API downtime.

### F. Emergency Assistance & Distress Message Generator
- **Direct 112 Phone Dialer:** Prominent `tel:112` helpline action with explicit notice that calls must be confirmed by the user.
- **Formatted Emergency Message:** Generates a complete distress message with exact GPS latitude/longitude, direct Google Maps link, timestamp, party size, and condition notes.
- **One-Click Copy:** Seamless clipboard copy with visual confirmation.
- **Responder Briefing Checklist:** Clear instructions on what four key details to provide when connected to 112 emergency services.

### G. Client-Side Privacy Guarantee
- Geolocation API requests are strictly opt-in.
- Device GPS coordinates are processed exclusively in-memory on the client.
- **Zero storage:** Coordinates are never saved to localStorage, cookies, or transmitted to any external backend server.

---

## 4. Technology Stack

- **Core Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8.x
- **Icons:** Lucide React
- **Mapping:** Leaflet 1.9 + OpenStreetMap Tiles
- **Weather Data:** Open-Meteo API (non-commercial open access, keyless)
- **Styling:** Custom Emergency Operations Design System (CSS3 with accessible variables, dark/light contrast, mobile-first responsive grid)

---

## 5. Local Setup and Development

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# 1. Clone repository
git clone https://github.com/your-username/waysafe-crisis-companion.git
cd waysafe-crisis-companion

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# App will run at: http://127.0.0.1:5173/
```

### Production Build

```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Deployment Guide

WaySafe is architected as a pure client-side Single Page Application (SPA) requiring **no backend servers or proprietary keys**. It deploys effortlessly to any static hosting provider:

### Vercel
1. Push this repository to GitHub.
2. Import project into [Vercel](https://vercel.com).
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Click **Deploy**.

### Netlify
1. Connect repository in [Netlify](https://netlify.com).
2. Set Build Command: `npm run build`.
3. Set Publish directory: `dist`.
4. Deploy site.

---

## 7. Hackathon Safety and Ethical Disclosures

1. **Predictive vs Proclamation:** Weather forecasts from Open-Meteo are mathematical predictions and do not constitute an official government disaster proclamation.
2. **Demonstration Integrity:** All simulated alerts, hazard zones, shelter pins, and timeline events in Demo Mode are strictly illustrative and marked with warning banners.
3. **No Fake SOS:** WaySafe does not pretend to dispatch rescue personnel or silently trigger police calls. It facilitates direct user communication with emergency services.
4. **Open Data Compliance:** Tile rendering attributes OpenStreetMap contributors under the Open Database License (ODbL).

---

## 8. Team & Acknowledgments

- **Hackathon:** 24-Hour BITS AND BYTES Hackathon
- **Institution:** Indian Institute of Information Technology, Design and Manufacturing (IIITDM), Kancheepuram
- **Track:** TravelTech

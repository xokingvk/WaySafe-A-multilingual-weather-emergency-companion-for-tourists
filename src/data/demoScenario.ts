import type { WeatherData, HourlyForecastItem } from '../types/weather';
import type { EmergencyAlert, HazardZone, ShelterPoint, AlertTimelineEvent } from '../types/emergency';

// Simulated Weather for Chennai Flash-Flood Scenario
export const DEMO_WEATHER_DATA: WeatherData = {
  temperature: 24.2,
  feelsLike: 23.5,
  humidity: 98,
  precipitation: 88.5, // 88.5 mm extreme heavy rain
  rain: 88.5,
  windSpeed: 48.0, // km/h
  windGusts: 76.5, // km/h severe gusts
  weatherCode: 65, // Heavy rain
  conditionLabel: 'Extreme Torrential Rain & Flash Flood Threat',
  conditionDescription: 'Persistent intense precipitation leading to localized waterlogging and rapid runoff.',
  isCaution: true,
  isSevere: true,
  time: new Date().toISOString(),
  timezone: 'Asia/Kolkata',
  latitude: 13.0827,
  longitude: 80.2707,
};

// Simulated 12-Hour Hourly Forecast
export const DEMO_HOURLY_FORECAST: HourlyForecastItem[] = [
  { time: 'T+0h', formattedTime: '16:00', temperature: 24, precipitationProbability: 100, precipitation: 22.4, weatherCode: 65, conditionLabel: 'Torrential Rain' },
  { time: 'T+1h', formattedTime: '17:00', temperature: 24, precipitationProbability: 95, precipitation: 28.0, weatherCode: 65, conditionLabel: 'Intense Downpour' },
  { time: 'T+2h', formattedTime: '18:00', temperature: 23, precipitationProbability: 90, precipitation: 19.5, weatherCode: 65, conditionLabel: 'Heavy Rain' },
  { time: 'T+3h', formattedTime: '19:00', temperature: 23, precipitationProbability: 85, precipitation: 14.0, weatherCode: 63, conditionLabel: 'Moderate Rain' },
  { time: 'T+4h', formattedTime: '20:00', temperature: 23, precipitationProbability: 80, precipitation: 11.2, weatherCode: 63, conditionLabel: 'Rain Showers' },
  { time: 'T+5h', formattedTime: '21:00', temperature: 24, precipitationProbability: 70, precipitation: 7.5, weatherCode: 61, conditionLabel: 'Light Rain' },
  { time: 'T+6h', formattedTime: '22:00', temperature: 24, precipitationProbability: 60, precipitation: 4.0, weatherCode: 61, conditionLabel: 'Intermittent Rain' },
  { time: 'T+7h', formattedTime: '23:00', temperature: 24, precipitationProbability: 45, precipitation: 1.5, weatherCode: 80, conditionLabel: 'Drizzle' },
  { time: 'T+8h', formattedTime: '00:00', temperature: 24, precipitationProbability: 35, precipitation: 0.8, weatherCode: 80, conditionLabel: 'Scattered Showers' },
  { time: 'T+9h', formattedTime: '01:00', temperature: 24, precipitationProbability: 25, precipitation: 0.2, weatherCode: 3, conditionLabel: 'Overcast' },
  { time: 'T+10h', formattedTime: '02:00', temperature: 25, precipitationProbability: 20, precipitation: 0.0, weatherCode: 2, conditionLabel: 'Partly Cloudy' },
  { time: 'T+11h', formattedTime: '03:00', temperature: 25, precipitationProbability: 15, precipitation: 0.0, weatherCode: 1, conditionLabel: 'Clearing' },
];

// Simulated Official Alert for Demo
export const DEMO_EMERGENCY_ALERT: EmergencyAlert = {
  id: 'demo-alert-chennai-01',
  title: '[DEMONSTRATION] Red Flash-Flood Warning for Chennai Coastal District',
  description:
    'SIMULATED SCENARIO ONLY: Intense convective cloudburst has caused sudden drainage saturation in Adyar and South Chennai basins. Tourists are instructed to remain indoors on higher floors.',
  severity: 'critical',
  source: 'Simulated Emergency Operations Exercise (Not an Official Alert)',
  sourceUrl: 'https://mausam.imd.gov.in/',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  isSimulated: true,
  district: 'Chennai',
};

// Simulated Hazard Zones on Leaflet map (Chennai coordinates)
export const DEMO_HAZARD_ZONES: HazardZone[] = [
  {
    id: 'hazard-adyar-basin',
    name: 'Adyar River Low-Lying Basin [SIMULATED]',
    type: 'river_basin',
    severity: 'extreme',
    center: [13.0067, 80.2458], // Kotturpuram / Adyar river bend
    radiusMeters: 1400,
    advisory: 'DEMO ONLY: Water levels reaching bank overflow threshold. Road crossings impassable. Avoid Saidapet & Kotturpuram bridges.',
    isSimulated: true,
  },
  {
    id: 'hazard-velachery-marsh',
    name: 'Velachery Lowland Waterlogging Zone [SIMULATED]',
    type: 'waterlogging',
    severity: 'high',
    center: [12.9815, 80.2180], // Velachery Lake vicinity
    radiusMeters: 1600,
    advisory: 'DEMO ONLY: Severe localized stormwater accumulation. Internal access roads submerged by 2–3 feet.',
    isSimulated: true,
  },
  {
    id: 'hazard-marina-surge',
    name: 'Marina Coastal Storm Surge Buffer [SIMULATED]',
    type: 'coastal_surge',
    severity: 'high',
    center: [13.0500, 80.2824], // Marina Beachfront
    radiusMeters: 1200,
    advisory: 'DEMO ONLY: High tidal swells and strong surf. Beach access strictly restricted. Keep 500m inland buffer.',
    isSimulated: true,
  },
];

// Illustrative Demonstration Shelters (Clearly marked NOT confirmed operational)
export const DEMO_SHELTER_POINTS: ShelterPoint[] = [
  {
    id: 'shelter-trade-centre',
    name: 'Chennai Trade Centre Exhibition Complex [DEMO SHELTER]',
    type: 'evacuation_hub',
    address: 'Nandambakkam, Mount Poonamallee Road, Chennai',
    lat: 13.0180,
    lng: 80.1870,
    capacityNote: 'Illustrative capacity: ~1,500 people (Elevated concrete structure with generator backup)',
    contactNote: 'Demo contact point only. In real life, verify via official 112 helpline.',
    isSimulated: true,
  },
  {
    id: 'shelter-ripon-building',
    name: 'Ripon Building Civic Aid Post [DEMO AID POST]',
    type: 'medical_post',
    address: 'Sydenhams Rd, Kannappar Thidal, Periyamet, Chennai',
    lat: 13.0827,
    lng: 80.2780,
    capacityNote: 'Illustrative medical triage post & clean drinking water distribution point.',
    contactNote: 'Demo post marker for presentation.',
    isSimulated: true,
  },
  {
    id: 'shelter-nehru-stadium',
    name: 'Jawaharlal Nehru Indoor Stadium [DEMO HIGH GROUND]',
    type: 'high_ground_shelter',
    address: 'Periamet, Chennai, Tamil Nadu 600003',
    lat: 13.0850,
    lng: 80.2730,
    capacityNote: 'Elevated structural shelter with first-aid distribution point.',
    contactNote: 'Demonstration dataset — not an active government facility.',
    isSimulated: true,
  },
];

// Simulated Alert Timeline for the Chennai Event
export const DEMO_TIMELINE_EVENTS: AlertTimelineEvent[] = [
  {
    time: '14:00',
    title: 'Monsoon Depression Intensification',
    detail: 'Doppler Radar detects heavy cloud bands converging over North Coastal Tamil Nadu.',
    level: 'info',
    actionRequired: 'Tourists advised to monitor weather advisories and plan return to accommodations.',
  },
  {
    time: '14:45',
    title: 'Heavy Rainfall Advisory Issued',
    detail: 'Rainfall rate exceeds 45mm/hour in Guindy, Mylapore, and Velachery sectors.',
    level: 'warning',
    actionRequired: 'Avoid underground metro pedestrian tunnels and low-lying underpasses.',
  },
  {
    time: '15:30',
    title: 'Adyar River Water Level Threshold Breached',
    detail: 'River discharge sensors cross warning levels; stormwater drains reaching peak capacity.',
    level: 'critical',
    actionRequired: 'Move immediately to 2nd floor or higher if situated in river-adjacent lodgings.',
  },
  {
    time: '16:15',
    title: 'Simulated Red Alert: Flash-Flood Status',
    detail: 'Arterial roadways reporting 40–60cm waterlogging. Surface transit suspended.',
    level: 'critical',
    actionRequired: 'Do not attempt to drive. Charge mobile devices. Dial 112 for urgent medical evacuation.',
  },
];

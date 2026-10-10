import type { TranslationDictionary } from '../../types/translations';

export const enTranslations: TranslationDictionary = {
  langCode: 'en',
  langName: 'English',
  nativeName: 'English',

  header: {
    title: 'WaySafe',
    tagline: 'Your Multilingual Crisis Companion',
    liveModeBadge: 'LIVE MODE',
    demoModeBadge: 'CRISIS DEMO',
    useMyLocation: 'Use My Location',
    locating: 'Acquiring GPS...',
    locationDenied: 'GPS Permission Denied',
    selectPreset: 'Choose City',
    refresh: 'Refresh',
    refreshing: 'Updating...',
    updatedJustNow: 'Updated just now',
    updatedAgo: (mins: number) => `Updated ${mins}m ago`,
    statusLive: 'Connected to Live Forecast',
    statusDemo: 'Simulated Scenario Active',
    activateDemoBtn: 'Activate Crisis Demo',
    exitDemoBtn: 'Exit Demo / Return to Live Mode',
  },

  banner: {
    simulatedTitle: 'SIMULATED SCENARIO — NOT A LIVE EMERGENCY',
    simulatedDescription:
      'Demonstration of a Severe Flash-Flood Event in Chennai. All alerts, hazard zones, shelter pins, and timeline events shown in this mode are purely illustrative.',
    exitDemoButton: 'Exit Demo / Return to Live Mode',
  },

  safetyOverview: {
    title: 'Your Safety Overview',
    subtitle: 'Real-time conditions and localized threat evaluation for tourists',
    temperature: 'Temperature',
    feelsLike: 'Feels Like',
    humidity: 'Humidity',
    rainfall: 'Precipitation',
    windSpeed: 'Wind Speed',
    windGusts: 'Wind Gusts',
    rainProbability: 'Rain Probability',
    condition: 'Atmospheric Condition',
    statusNormal: 'Conditions Normal — No Extreme Weather Detected',
    statusCaution: 'Condition to Watch — Elevated Rain Forecast',
    statusSevere: 'Forecast Alert — Elevated Wind & Heavy Precipitation',
    statusDemoFlood: 'SIMULATED EMERGENCY: Severe Flash-Flood Warning in Chennai',
    sourceVerified: 'Live Feed: Open-Meteo Meteorological Service',
    forecastNotice:
      'Notice: Forecast values are predictive atmospheric models and do not constitute an official government disaster proclamation.',
    simulatedNotice:
      'Demonstration notice: Values shown are simulated test data for training and evaluation purposes.',
  },

  officialWarning: {
    title: 'Official IMD District Bulletin',
    activeTitle: 'Official Warning Bulletin Retrieved',
    noActiveTitle: 'No Official Severe Warning in Effect',
    unavailableTitle: 'IMD Direct Feed Unavailable',
    unavailableDesc:
      'Direct browser-to-server connection to IMD warnings is restricted by public CORS policies. Access verified bulletins on the official portal:',
    visitPortalBtn: 'Open Official IMD Portal (mausam.imd.gov.in)',
    sourceLabel: 'India Meteorological Department (Govt. of India)',
  },

  emergencyAction: {
    title: 'What should I do now?',
    subtitle: 'Immediate safety protocols for tourists during severe weather & floods',
    actions: [
      {
        step: 1,
        title: 'Never Walk or Drive Through Floodwater',
        description:
          'Just 6 inches (15 cm) of moving water can sweep an adult off their feet; 12 inches can float a vehicle. Turn around immediately.',
        badge: 'Critical Rule',
      },
      {
        step: 2,
        title: 'Seek Higher Ground & Avoid Low-Lying Basements',
        description:
          'Move to upper floors or elevated buildings. Stay away from open drainage canals, rivers, and underpasses.',
        badge: 'High Elevation',
      },
      {
        step: 3,
        title: 'Keep Devices Charged & Conserve Battery',
        description:
          'Switch your phone to Low Power Mode. Keep your portable power bank close and prioritize essential emergency communication.',
        badge: 'Communication',
      },
      {
        step: 4,
        title: 'Stay Clear of Electrical Infrastructure',
        description:
          'Submerged transformers, downed electric poles, or exposed cables create fatal electrocution hazards in standing water.',
        badge: 'Electrical Safety',
      },
      {
        step: 5,
        title: 'Prepare Your Emergency Message & Stay Put',
        description:
          'Do not attempt adventurous travel or sightseeing. If water threatens your hotel or lodging, contact local emergency services (112).',
        badge: 'Assistance',
      },
    ],
  },

  map: {
    title: 'Interactive Safety & Hazard Map',
    subtitle: 'Contextual tourist navigation with OpenStreetMap tiles',
    legendTitle: 'Map Legend',
    legendTourist: 'Your Location / Selected City',
    legendHazard: 'Simulated Hazard Zone (Demo Only)',
    legendShelter: 'Illustrative Shelter Hub (Demo Only)',
    demoNote:
      'Demo zones and shelters shown are illustrative scenario markers. They are not verified safe evacuation centers.',
    youAreHere: 'Tourist Current Location',
    selectedLocation: 'Selected City Center',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    demoShelterBadge: 'DEMO SHELTER',
    demoHazardBadge: 'SIMULATED HAZARD',
  },

  outlook: {
    title: 'Hourly Forecast Outlook',
    subtitle: 'Anticipated precipitation probability and intensity for the next 12 hours',
    precipitationProb: 'Precip. Prob.',
    rainAmount: 'Expected Rain',
    nextHours: '12-Hour Outlook',
    noRain: 'Minimal rain probability expected',
  },

  assistance: {
    title: 'Emergency Assistance & Help Message',
    subtitle: 'Direct responder dialer and pre-formatted crisis message generator',
    call112Btn: 'Emergency Helpline: Call 112',
    call112Notice:
      'Clicking this opens your device phone dialer with 112 pre-filled. You must press the call button to initiate. WaySafe does not automatically place calls.',
    helpMessageTitle: 'Formatted Emergency Help Message',
    helpMessageDesc:
      'Copy and send this text via SMS, WhatsApp, or emergency channels to police, hotel reception, or family.',
    copyBtn: 'Copy Emergency Message',
    copiedSuccess: 'Copied to Clipboard!',
    checklistTitle: 'What to Tell Responders on 112',
    checklistItems: [
      '1. Your exact landmark or GPS coordinates (latitude & longitude).',
      '2. Total number of people with you (specify any children, elderly, or medical needs).',
      '3. Nature of the immediate danger (rising water level, structural damage, trapped).',
      '4. If you have drinking water, mobile power, or are stranded in the open.',
    ],
    disclaimer:
      'Disclaimer: WaySafe is a self-help crisis guidance tool. It does not dispatch emergency services or track your device.',
    manualLocationPrompt: 'Enter your hotel or current landmark address if GPS is unavailable.',
  },

  sources: {
    title: 'Data Sources & System Trust',
    subtitle: 'Transparent disclosures regarding third-party feeds and data integrity',
    openMeteoTitle: 'Open-Meteo Weather API',
    openMeteoDesc:
      'Open meteorological forecast model providing live temperature, wind, and precipitation parameters without tracking.',
    imdTitle: 'India Meteorological Department (IMD)',
    imdDesc:
      'The National Meteorological Service of India. Official district bulletins are cited when accessible.',
    osmTitle: 'OpenStreetMap & Leaflet',
    osmDesc:
      'Crowdsourced, global geospatial map tiles rendered under the Open Database License (ODbL).',
    privacyTitle: 'Client-Side Privacy Guarantee',
    privacyDesc:
      'GPS coordinates are processed strictly inside your browser. No personal location data is recorded, saved, or uploaded.',
    officialDisclaimer:
      'Weather forecasts are predictive and are not official emergency declarations. Always comply with orders issued by NDMA, SDRF, and district administration.',
  },

  timeline: {
    title: 'Simulated Crisis Timeline',
    subtitle: 'Demonstration sequence of alert escalation for Chennai flash floods',
    badge: 'Scenario Progression',
  },
};

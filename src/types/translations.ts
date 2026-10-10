export type SupportedLanguage = 'en' | 'ta' | 'hi' | 'fr';

export interface TranslationDictionary {
  langCode: SupportedLanguage;
  langName: string;
  nativeName: string;

  header: {
    title: string;
    tagline: string;
    liveModeBadge: string;
    demoModeBadge: string;
    useMyLocation: string;
    locating: string;
    locationDenied: string;
    selectPreset: string;
    refresh: string;
    refreshing: string;
    updatedJustNow: string;
    updatedAgo: (mins: number) => string;
    statusLive: string;
    statusDemo: string;
    activateDemoBtn: string;
    exitDemoBtn: string;
  };

  banner: {
    simulatedTitle: string;
    simulatedDescription: string;
    exitDemoButton: string;
  };

  safetyOverview: {
    title: string;
    subtitle: string;
    temperature: string;
    feelsLike: string;
    humidity: string;
    rainfall: string;
    windSpeed: string;
    windGusts: string;
    rainProbability: string;
    condition: string;
    statusNormal: string;
    statusCaution: string;
    statusSevere: string;
    statusDemoFlood: string;
    sourceVerified: string;
    forecastNotice: string;
    simulatedNotice: string;
  };

  officialWarning: {
    title: string;
    activeTitle: string;
    noActiveTitle: string;
    unavailableTitle: string;
    unavailableDesc: string;
    visitPortalBtn: string;
    sourceLabel: string;
  };

  emergencyAction: {
    title: string;
    subtitle: string;
    actions: Array<{
      step: number;
      title: string;
      description: string;
      badge: string;
    }>;
  };

  map: {
    title: string;
    subtitle: string;
    legendTitle: string;
    legendTourist: string;
    legendHazard: string;
    legendShelter: string;
    demoNote: string;
    youAreHere: string;
    selectedLocation: string;
    zoomIn: string;
    zoomOut: string;
    demoShelterBadge: string;
    demoHazardBadge: string;
  };

  outlook: {
    title: string;
    subtitle: string;
    precipitationProb: string;
    rainAmount: string;
    nextHours: string;
    noRain: string;
  };

  assistance: {
    title: string;
    subtitle: string;
    call112Btn: string;
    call112Notice: string;
    helpMessageTitle: string;
    helpMessageDesc: string;
    copyBtn: string;
    copiedSuccess: string;
    checklistTitle: string;
    checklistItems: string[];
    disclaimer: string;
    manualLocationPrompt: string;
  };

  sources: {
    title: string;
    subtitle: string;
    openMeteoTitle: string;
    openMeteoDesc: string;
    imdTitle: string;
    imdDesc: string;
    osmTitle: string;
    osmDesc: string;
    privacyTitle: string;
    privacyDesc: string;
    officialDisclaimer: string;
  };

  timeline: {
    title: string;
    subtitle: string;
    badge: string;
  };
}

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { CrisisBanner } from './components/CrisisBanner';
import { SafetyOverview } from './components/SafetyOverview';
import { EmergencyActionPanel } from './components/EmergencyActionPanel';
import { WeatherMap } from './components/WeatherMap';
import { WeatherOutlook } from './components/WeatherOutlook';
import { EmergencyAssistance } from './components/EmergencyAssistance';
import { DemoTimeline } from './components/DemoTimeline';
import { TrustSources } from './components/TrustSources';

import { CITY_PRESETS } from './data/cities';
import { getTranslations } from './data/translations';
import {
  DEMO_WEATHER_DATA,
  DEMO_HOURLY_FORECAST,
  DEMO_HAZARD_ZONES,
  DEMO_SHELTER_POINTS,
} from './data/demoScenario';
import { fetchLiveWeather } from './services/weatherService';
import { checkImdDistrictWarning, type ImdWarningResult } from './services/imdService';
import { getCurrentDeviceLocation } from './services/locationService';
import { formatTimeAgo } from './utils/formatters';

import type { SupportedLanguage } from './types/translations';
import type { WeatherData, HourlyForecastItem } from './types/weather';

export function App() {
  // Mode State
  const [isDemo, setIsDemo] = useState<boolean>(false);

  // Localization State
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');
  const t = useMemo(() => getTranslations(selectedLanguage), [selectedLanguage]);

  // Location State
  const [selectedCityId, setSelectedCityId] = useState<string>('chennai');
  const [customCoords, setCustomCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Weather State
  const [liveWeather, setLiveWeather] = useState<WeatherData | null>(null);
  const [liveHourly, setLiveHourly] = useState<HourlyForecastItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // IMD Warning State
  const [imdResult, setImdResult] = useState<ImdWarningResult | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3800);
  }, []);

  // Compute Active Coordinates & Name
  const currentCity = useMemo(() => {
    if (selectedCityId === 'custom' && customCoords) {
      return {
        id: 'custom',
        name: 'Device GPS Location',
        state: 'Local Device',
        lat: customCoords.lat,
        lng: customCoords.lng,
      };
    }
    const found = CITY_PRESETS.find((c) => c.id === selectedCityId);
    return found || CITY_PRESETS[0];
  }, [selectedCityId, customCoords]);

  const activeLat = isDemo ? 13.0827 : currentCity.lat;
  const activeLng = isDemo ? 80.2707 : currentCity.lng;
  const activeLocationName = isDemo ? 'Chennai (Demonstration Drill)' : `${currentCity.name}, ${currentCity.state}`;

  // Weather Fetching Handler
  const loadWeather = useCallback(
    async (lat: number, lng: number, cityInfo: typeof currentCity) => {
      setLoading(true);
      setError(null);

      try {
        const { current, hourly } = await fetchLiveWeather(lat, lng);
        setLiveWeather(current);
        setLiveHourly(hourly);
        setLastUpdated(new Date());

        // Check IMD District Warning (safe attempt)
        checkImdDistrictWarning(cityInfo.imdDistrictId, cityInfo.name)
          .then((res) => setImdResult(res))
          .catch(() => {
            setImdResult({
              status: 'feed_unavailable',
              diagnosticReason: 'CORS restriction',
              officialPortalUrl: 'https://mausam.imd.gov.in/',
            });
          });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch live weather data';
        setError(message);
        showToast(message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [showToast]
  );

  // Initial Load and on Location change
  useEffect(() => {
    if (!isDemo) {
      loadWeather(activeLat, activeLng, currentCity);
    }
  }, [activeLat, activeLng, currentCity, isDemo, loadWeather]);

  // Handle City Selector Change
  const handleSelectCity = (cityId: string) => {
    if (isDemo) return;
    setSelectedCityId(cityId);
  };

  // Handle Use My Location (Browser Geolocation)
  const handleUseMyLocation = async () => {
    if (isDemo) return;
    setIsLocating(true);

    try {
      const coords = await getCurrentDeviceLocation();
      setCustomCoords(coords);
      setSelectedCityId('custom');
      showToast('GPS position acquired successfully.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Location request denied or failed.';
      showToast(message);
    } finally {
      setIsLocating(false);
    }
  };

  // Handle Manual Weather Refresh
  const handleRefresh = async () => {
    if (isDemo) return;
    setRefreshing(true);
    await loadWeather(activeLat, activeLng, currentCity);
    showToast('Weather data refreshed.');
  };

  // Handle Demo Mode Toggle
  const handleToggleDemo = () => {
    if (!isDemo) {
      setIsDemo(true);
      showToast('⚠️ Activated Simulated Crisis Demo (Chennai Flash Flood).');
    } else {
      setIsDemo(false);
      showToast('Exited Demo Mode. Restored live weather observations.');
    }
  };

  // Active Data for View (Live vs Demo)
  const displayWeather = isDemo ? DEMO_WEATHER_DATA : liveWeather;
  const displayHourly = isDemo ? DEMO_HOURLY_FORECAST : liveHourly;
  const displayPrecipProbability = useMemo(() => {
    if (isDemo) return 95;
    if (liveHourly && liveHourly.length > 0) {
      return liveHourly[0].precipitationProbability;
    }
    return 0;
  }, [isDemo, liveHourly]);

  const lastUpdatedText = formatTimeAgo(lastUpdated);

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        selectedCityId={selectedCityId}
        onSelectCity={handleSelectCity}
        onUseMyLocation={handleUseMyLocation}
        isLocating={isLocating}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        isDemo={isDemo}
        onToggleDemo={handleToggleDemo}
        onRefresh={handleRefresh}
        isRefreshing={refreshing}
        lastUpdatedText={lastUpdatedText}
        t={t}
      />

      {/* Persistent Demo Scenario Warning Banner */}
      {isDemo && (
        <CrisisBanner t={t} onExitDemo={handleToggleDemo} />
      )}

      {/* Main Content Layout */}
      <main className="main-content" id="main-content">
        <div className="dashboard-grid">
          {/* Left Column: Conditions, Map, Outlook */}
          <div className="dashboard-column">
            {/* Safety Overview */}
            <SafetyOverview
              weather={displayWeather}
              loading={loading && !isDemo}
              error={error}
              locationName={activeLocationName}
              isDemo={isDemo}
              imdResult={imdResult}
              precipProbability={displayPrecipProbability}
              t={t}
            />

            {/* Interactive Leaflet Map */}
            <WeatherMap
              lat={activeLat}
              lng={activeLng}
              locationName={activeLocationName}
              isDemo={isDemo}
              hazardZones={isDemo ? DEMO_HAZARD_ZONES : []}
              shelters={isDemo ? DEMO_SHELTER_POINTS : []}
              t={t}
            />

            {/* Hourly Precipitation & Weather Outlook */}
            <WeatherOutlook hourly={displayHourly} t={t} />

            {/* Transparency & Data Sources */}
            <TrustSources t={t} />
          </div>

          {/* Right Column: Actions, Emergency Assistance, Demo Timeline */}
          <div className="dashboard-column">
            {/* Emergency Action Panel ("What should I do now?") */}
            <EmergencyActionPanel t={t} />

            {/* Emergency Assistance ("Get Help" - 112, Help Message, Checklist) */}
            <EmergencyAssistance
              locationName={activeLocationName}
              lat={activeLat}
              lng={activeLng}
              isDemo={isDemo}
              t={t}
              onShowToast={showToast}
            />

            {/* In Demo Mode: Crisis Timeline */}
            {isDemo && <DemoTimeline t={t} />}
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;

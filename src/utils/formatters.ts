export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`;
}

export function formatWindSpeed(kmh: number): string {
  return `${Math.round(kmh)} km/h`;
}

export function formatPrecipitation(mm: number): string {
  return `${mm.toFixed(1)} mm`;
}

export function formatTimeAgo(date: Date | null): string {
  if (!date) return 'Not updated yet';
  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSec < 45) return 'Just now';
  const mins = Math.floor(diffSec / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ago`;
}

interface HelpMessageParams {
  locationName: string;
  lat: number;
  lng: number;
  customDetails?: string;
  isDemo?: boolean;
  partySize?: number;
}

export function generateHelpMessage({
  locationName,
  lat,
  lng,
  customDetails,
  isDemo = false,
  partySize = 1,
}: HelpMessageParams): string {
  const mapLink = `https://maps.google.com/?q=${lat.toFixed(5)},${lng.toFixed(5)}`;
  const time = new Date().toLocaleString();

  if (isDemo) {
    return `[DEMO DRILL - NOT A REAL EMERGENCY]
EMERGENCY ASSISTANCE REQUEST — TOURIST IN DISTRESS
--------------------------------------------------
Location: ${locationName}
GPS Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}
Map Link: ${mapLink}
Time: ${time}
Party Size: ${partySize} person(s)
Current Situation: [SIMULATION] Rapid waterlogging surrounding building; road impassable.
Needs: Immediate evacuation transport & high-ground shelter.
--------------------------------------------------
Generated via WaySafe Crisis Companion (Demo Mode)`;
  }

  return `EMERGENCY ASSISTANCE REQUEST — TOURIST IN DISTRESS
--------------------------------------------------
Location: ${locationName}
GPS Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}
Map Link: ${mapLink}
Time: ${time}
Party Size: ${partySize} person(s)
Situation: ${customDetails || 'Severe weather / waterlogging danger. We need emergency advice or evacuation.'}
Needs: Safe shelter guidance, immediate responder contact.
--------------------------------------------------
Generated via WaySafe Crisis Companion (https://waysafe.travel)`;
}

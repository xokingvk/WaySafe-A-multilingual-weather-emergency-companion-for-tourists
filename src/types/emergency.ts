export type AlertSeverity = 'critical' | 'warning' | 'advisory' | 'info';

export interface EmergencyAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  source: string;
  sourceUrl?: string;
  timestamp: string;
  isSimulated: boolean;
  district?: string;
}

export interface HazardZone {
  id: string;
  name: string;
  type: 'flash_flood' | 'waterlogging' | 'river_basin' | 'coastal_surge';
  severity: 'extreme' | 'high' | 'moderate';
  center: [number, number]; // [lat, lng]
  radiusMeters: number;
  polygon?: [number, number][]; // optional polygon boundary
  advisory: string;
  isSimulated: boolean;
}

export interface ShelterPoint {
  id: string;
  name: string;
  type: 'evacuation_hub' | 'medical_post' | 'high_ground_shelter';
  address: string;
  lat: number;
  lng: number;
  capacityNote: string;
  contactNote: string;
  isSimulated: boolean;
}

export interface AlertTimelineEvent {
  time: string;
  title: string;
  detail: string;
  level: AlertSeverity;
  actionRequired: string;
}

export interface CityPreset {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  imdDistrictId?: string; // Optional IMD district ID code if verified
}

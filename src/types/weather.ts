export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  precipitation: number;
  rain: number;
  windSpeed: number;
  windGusts: number;
  weatherCode: number;
  conditionLabel: string;
  conditionDescription: string;
  isCaution: boolean;
  isSevere: boolean;
  time: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

export interface HourlyForecastItem {
  time: string; // ISO string
  formattedTime: string; // "14:00"
  temperature: number;
  precipitationProbability: number;
  precipitation: number;
  weatherCode: number;
  conditionLabel: string;
}

export interface WeatherState {
  data: WeatherData | null;
  hourly: HourlyForecastItem[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isStale: boolean;
}

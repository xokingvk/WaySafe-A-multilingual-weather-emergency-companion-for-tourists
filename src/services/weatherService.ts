import type { WeatherData, HourlyForecastItem } from '../types/weather';

// WMO Weather Interpretation Codes (WW)
export function interpretWmoCode(code: number): { label: string; description: string } {
  switch (code) {
    case 0:
      return { label: 'Clear Sky', description: 'Sunlit and calm atmospheric conditions.' };
    case 1:
      return { label: 'Mainly Clear', description: 'Slight scattered clouds with high visibility.' };
    case 2:
      return { label: 'Partly Cloudy', description: 'Intermittent cloud cover.' };
    case 3:
      return { label: 'Overcast', description: 'Dense cloud ceiling covering the sky.' };
    case 45:
    case 48:
      return { label: 'Fog / Mist', description: 'Reduced horizontal visibility; drive with caution.' };
    case 51:
    case 53:
    case 55:
      return { label: 'Light Drizzle', description: 'Fine water droplets; low immediate flood risk.' };
    case 56:
    case 57:
      return { label: 'Freezing Drizzle', description: 'Icy mist conditions.' };
    case 61:
      return { label: 'Light Rain', description: 'Steady gentle showers; roads wet.' };
    case 63:
      return { label: 'Moderate Rain', description: 'Substantial continuous precipitation.' };
    case 65:
      return { label: 'Heavy Torrential Rain', description: 'High-intensity downpour with ponding risk.' };
    case 66:
    case 67:
      return { label: 'Freezing Rain', description: 'Severe freezing precipitation.' };
    case 71:
    case 73:
    case 75:
      return { label: 'Snowfall', description: 'Snow accumulation on roadways.' };
    case 77:
      return { label: 'Snow Grains', description: 'Granular frozen precipitation.' };
    case 80:
      return { label: 'Slight Rain Showers', description: 'Passing rain squalls.' };
    case 81:
      return { label: 'Moderate Rain Showers', description: 'Noticeable shower activity.' };
    case 82:
      return { label: 'Violent Rain Showers', description: 'Intense short-duration burst of water.' };
    case 85:
    case 86:
      return { label: 'Snow Showers', description: 'Blustery snow squalls.' };
    case 95:
      return { label: 'Thunderstorm', description: 'Lightning and electrical activity detected.' };
    case 96:
    case 99:
      return { label: 'Severe Thunderstorm with Hail', description: 'Violent lightning, gusty downdrafts, and hail.' };
    default:
      return { label: 'Variable Conditions', description: 'Standard atmospheric observation.' };
  }
}

interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current?: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    rain: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_gusts_10m: number;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    precipitation: number[];
    weather_code: number[];
  };
}

export async function fetchLiveWeather(
  lat: number,
  lng: number,
  signal?: AbortSignal
): Promise<{ current: WeatherData; hourly: HourlyForecastItem[] }> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', lat.toFixed(4));
  url.searchParams.set('longitude', lng.toFixed(4));
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_gusts_10m'
  );
  url.searchParams.set(
    'hourly',
    'precipitation_probability,precipitation,weather_code,temperature_2m'
  );
  url.searchParams.set('timezone', 'auto');
  url.searchParams.set('forecast_days', '2');

  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), 9000); // 9-second timeout

  const combinedSignal = signal
    ? anySignal([signal, timeoutController.signal])
    : timeoutController.signal;

  try {
    const res = await fetch(url.toString(), { signal: combinedSignal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Open-Meteo HTTP ${res.status}: ${res.statusText}`);
    }

    const json: OpenMeteoResponse = await res.json();

    if (!json.current) {
      throw new Error('Open-Meteo response did not contain current weather data.');
    }

    const { label, description } = interpretWmoCode(json.current.weather_code);

    const isSevere =
      json.current.precipitation > 25 ||
      json.current.wind_speed_10m > 55 ||
      json.current.wind_gusts_10m > 75 ||
      json.current.weather_code >= 95;

    const isCaution =
      !isSevere &&
      (json.current.precipitation > 5 ||
        json.current.wind_speed_10m > 30 ||
        json.current.wind_gusts_10m > 45 ||
        [63, 65, 81, 82].includes(json.current.weather_code));

    const current: WeatherData = {
      temperature: Math.round(json.current.temperature_2m * 10) / 10,
      feelsLike: Math.round(json.current.apparent_temperature * 10) / 10,
      humidity: Math.round(json.current.relative_humidity_2m),
      precipitation: Math.round(json.current.precipitation * 10) / 10,
      rain: Math.round(json.current.rain * 10) / 10,
      windSpeed: Math.round(json.current.wind_speed_10m * 10) / 10,
      windGusts: Math.round(json.current.wind_gusts_10m * 10) / 10,
      weatherCode: json.current.weather_code,
      conditionLabel: label,
      conditionDescription: description,
      isCaution,
      isSevere,
      time: json.current.time,
      timezone: json.timezone || 'UTC',
      latitude: json.latitude,
      longitude: json.longitude,
    };

    // Process hourly forecast: pick next 12 hours starting from now
    const hourly: HourlyForecastItem[] = [];
    if (json.hourly && Array.isArray(json.hourly.time)) {
      const now = new Date();
      const startIndex = json.hourly.time.findIndex((t) => new Date(t) >= now);
      const start = startIndex >= 0 ? startIndex : 0;
      const count = Math.min(12, json.hourly.time.length - start);

      for (let i = 0; i < count; i++) {
        const idx = start + i;
        const timeStr = json.hourly.time[idx];
        const dateObj = new Date(timeStr);
        const hours = dateObj.getHours().toString().padStart(2, '0') + ':00';
        const wCode = json.hourly.weather_code[idx] ?? 0;
        const info = interpretWmoCode(wCode);

        hourly.push({
          time: timeStr,
          formattedTime: hours,
          temperature: Math.round(json.hourly.temperature_2m[idx] * 10) / 10,
          precipitationProbability: json.hourly.precipitation_probability[idx] ?? 0,
          precipitation: Math.round((json.hourly.precipitation[idx] ?? 0) * 10) / 10,
          weatherCode: wCode,
          conditionLabel: info.label,
        });
      }
    }

    return { current, hourly };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        throw new Error('Weather request timed out after 9 seconds. Please check connection and refresh.');
      }
      throw err;
    }
    throw new Error('Failed to retrieve live weather data.');
  }
}

// Polyfill-friendly helper to combine abort signals
function anySignal(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();
  for (const sig of signals) {
    if (sig.aborted) {
      controller.abort();
      return controller.signal;
    }
    sig.addEventListener('abort', () => controller.abort(), { once: true });
  }
  return controller.signal;
}

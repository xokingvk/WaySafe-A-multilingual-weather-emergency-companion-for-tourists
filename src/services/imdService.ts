import type { EmergencyAlert } from '../types/emergency';

export interface ImdWarningResult {
  status: 'verified_alert' | 'no_active_alert' | 'feed_unavailable';
  districtName?: string;
  alert?: EmergencyAlert;
  diagnosticReason?: string;
  officialPortalUrl: string;
}

export async function checkImdDistrictWarning(
  districtId?: string,
  districtName?: string
): Promise<ImdWarningResult> {
  const officialPortalUrl = 'https://mausam.imd.gov.in/';

  if (!districtId) {
    return {
      status: 'feed_unavailable',
      diagnosticReason: 'No official IMD district mapping identifier provided for this location.',
      officialPortalUrl,
    };
  }

  const endpoint = `https://mausam.imd.gov.in/api/warnings_district_api.php?id=${encodeURIComponent(districtId)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000); // 4-second timeout

  try {
    const res = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return {
        status: 'feed_unavailable',
        diagnosticReason: `IMD endpoint responded with HTTP ${res.status}`,
        officialPortalUrl,
      };
    }

    const data = await res.json();

    // Check if response contains valid structured warnings
    // E.g. array of warnings or object with warning keys
    if (Array.isArray(data) && data.length > 0) {
      const first = data[0];
      const warningText = first.warning || first.warning_type || first.description || '';
      const color = (first.color || first.warning_color || '').toLowerCase();

      if (warningText) {
        return {
          status: 'verified_alert',
          districtName: first.district_name || districtName,
          alert: {
            id: `imd-${districtId}-${Date.now()}`,
            title: `IMD Official Warning: ${first.district_name || districtName}`,
            description: warningText,
            severity: color.includes('red') ? 'critical' : color.includes('orange') || color.includes('amber') ? 'warning' : 'advisory',
            source: 'India Meteorological Department (Official API)',
            sourceUrl: officialPortalUrl,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSimulated: false,
            district: first.district_name || districtName,
          },
          officialPortalUrl,
        };
      }
    }

    return {
      status: 'no_active_alert',
      districtName: districtName,
      officialPortalUrl,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    // Typical in client-side SPA due to browser CORS policies on mausam.imd.gov.in
    const reason =
      err instanceof Error && err.name === 'AbortError'
        ? 'IMD query timed out (4s limit)'
        : 'Browser CORS / Network restrictions prevent direct client-side query to government portal';

    return {
      status: 'feed_unavailable',
      districtName,
      diagnosticReason: reason,
      officialPortalUrl,
    };
  }
}

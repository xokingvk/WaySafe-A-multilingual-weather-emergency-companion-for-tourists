import React from 'react';
import {
  Thermometer,
  CloudRain,
  Wind,
  Droplets,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  Info,
} from 'lucide-react';
import type { WeatherData } from '../types/weather';
import type { ImdWarningResult } from '../services/imdService';
import type { TranslationDictionary } from '../types/translations';

interface SafetyOverviewProps {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  locationName: string;
  isDemo: boolean;
  imdResult: ImdWarningResult | null;
  precipProbability: number;
  t: TranslationDictionary;
}

export const SafetyOverview: React.FC<SafetyOverviewProps> = ({
  weather,
  loading,
  error,
  locationName,
  isDemo,
  imdResult,
  precipProbability,
  t,
}) => {
  if (loading && !weather) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <div
            style={{
              width: 38,
              height: 38,
              border: '3px solid #e2e8f0',
              borderTopColor: '#0d9488',
              borderRadius: '50%',
              margin: '0 auto 1rem auto',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <h3 style={{ fontSize: '1.1rem', color: '#1e293b' }}>
            Fetching meteorological observations...
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Querying Open-Meteo real-time atmospheric forecast for {locationName}.
          </p>
        </div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="card" style={{ borderColor: '#fca5a5' }}>
        <div className="card-body">
          <div className="status-callout status-callout-critical" style={{ marginTop: 0 }}>
            <AlertCircle size={22} color="#dc2626" />
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>
                Unable to retrieve weather data
              </strong>
              <p style={{ fontSize: '0.85rem', margin: '0.25rem 0' }}>{error}</p>
              <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                Please check your internet connection or choose another location.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 className="card-title">
              <ShieldAlert size={22} color="#0d9488" />
              {t.safetyOverview.title}
            </h2>
            <span
              style={{
                fontSize: '0.75rem',
                background: '#f1f5f9',
                color: '#475569',
                padding: '0.2rem 0.5rem',
                borderRadius: '6px',
                fontWeight: 600,
              }}
            >
              {locationName}
            </span>
          </div>
          <p className="card-subtitle">{t.safetyOverview.subtitle}</p>
        </div>
      </div>

      <div className="card-body">
        {/* Status Callout Banner */}
        {isDemo ? (
          <div className="status-callout status-callout-critical">
            <AlertTriangle size={24} color="#dc2626" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.95rem', display: 'block', color: '#991b1b' }}>
                {t.safetyOverview.statusDemoFlood}
              </strong>
              <p style={{ fontSize: '0.8125rem', margin: '0.2rem 0 0 0', color: '#7f1d1d' }}>
                {t.safetyOverview.simulatedNotice}
              </p>
            </div>
          </div>
        ) : weather.isSevere ? (
          <div className="status-callout status-callout-critical">
            <AlertTriangle size={24} color="#dc2626" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.95rem', display: 'block', color: '#991b1b' }}>
                {t.safetyOverview.statusSevere}
              </strong>
              <p style={{ fontSize: '0.8125rem', margin: '0.2rem 0 0 0', color: '#7f1d1d' }}>
                {weather.conditionDescription}
              </p>
            </div>
          </div>
        ) : weather.isCaution ? (
          <div className="status-callout status-callout-caution">
            <AlertTriangle size={24} color="#d97706" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.95rem', display: 'block', color: '#92400e' }}>
                {t.safetyOverview.statusCaution}
              </strong>
              <p style={{ fontSize: '0.8125rem', margin: '0.2rem 0 0 0', color: '#78350f' }}>
                {weather.conditionDescription}
              </p>
            </div>
          </div>
        ) : (
          <div className="status-callout status-callout-normal">
            <CheckCircle2 size={24} color="#16a34a" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.95rem', display: 'block', color: '#166534' }}>
                {t.safetyOverview.statusNormal}
              </strong>
              <p style={{ fontSize: '0.8125rem', margin: '0.2rem 0 0 0', color: '#14532d' }}>
                {weather.conditionDescription}
              </p>
            </div>
          </div>
        )}

        {/* Primary Metrics Grid */}
        <div className="weather-main-grid">
          {/* Temperature */}
          <div className="metric-box">
            <span className="metric-label">
              <Thermometer size={14} color="#0d9488" />
              {t.safetyOverview.temperature}
            </span>
            <span className="metric-value">{weather.temperature}°C</span>
            <span className="metric-subtext">
              {t.safetyOverview.feelsLike}: {weather.feelsLike}°C
            </span>
          </div>

          {/* Precipitation */}
          <div className="metric-box">
            <span className="metric-label">
              <CloudRain size={14} color="#2563eb" />
              {t.safetyOverview.rainfall}
            </span>
            <span
              className="metric-value"
              style={{ color: weather.precipitation > 15 ? '#dc2626' : undefined }}
            >
              {weather.precipitation} mm
            </span>
            <span className="metric-subtext">
              {t.safetyOverview.rainProbability}: {precipProbability}%
            </span>
          </div>

          {/* Wind */}
          <div className="metric-box">
            <span className="metric-label">
              <Wind size={14} color="#0284c7" />
              {t.safetyOverview.windSpeed}
            </span>
            <span
              className="metric-value"
              style={{ color: weather.windSpeed > 45 ? '#dc2626' : undefined }}
            >
              {weather.windSpeed} km/h
            </span>
            <span className="metric-subtext">
              {t.safetyOverview.windGusts}: {weather.windGusts} km/h
            </span>
          </div>

          {/* Humidity */}
          <div className="metric-box">
            <span className="metric-label">
              <Droplets size={14} color="#0891b2" />
              {t.safetyOverview.humidity}
            </span>
            <span className="metric-value">{weather.humidity}%</span>
            <span className="metric-subtext">Atmospheric moisture</span>
          </div>

          {/* Condition */}
          <div className="metric-box" style={{ gridColumn: 'span 2' }}>
            <span className="metric-label">
              <Gauge size={14} color="#7c3aed" />
              {t.safetyOverview.condition}
            </span>
            <span
              className="metric-value"
              style={{
                fontSize: '1.15rem',
                color: isDemo ? '#b91c1c' : '#0f172a',
              }}
            >
              {weather.conditionLabel}
            </span>
            <span className="metric-subtext">{weather.conditionDescription}</span>
          </div>
        </div>

        {/* Official IMD Warning Integration Card */}
        <div
          style={{
            marginTop: '1.25rem',
            padding: '1rem',
            background: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.4rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor:
                    imdResult?.status === 'verified_alert'
                      ? '#dc2626'
                      : imdResult?.status === 'no_active_alert'
                      ? '#16a34a'
                      : '#f59e0b',
                }}
              />
              <strong style={{ fontSize: '0.875rem', color: '#1e293b' }}>
                {t.officialWarning.title}
              </strong>
            </div>

            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
              {t.officialWarning.sourceLabel}
            </span>
          </div>

          {isDemo ? (
            <div style={{ fontSize: '0.8125rem', color: '#991b1b', marginTop: '0.3rem' }}>
              <strong>[DEMONSTRATION]</strong> Simulated red-alert warning bulletin active for Chennai
              district during this presentation exercise.
            </div>
          ) : imdResult?.status === 'verified_alert' ? (
            <div style={{ fontSize: '0.825rem', color: '#b91c1c' }}>
              <strong>⚠️ {imdResult.alert?.title}:</strong> {imdResult.alert?.description}
            </div>
          ) : imdResult?.status === 'no_active_alert' ? (
            <div style={{ fontSize: '0.8125rem', color: '#166534' }}>
              {t.officialWarning.noActiveTitle} for {locationName}.
            </div>
          ) : (
            <div style={{ fontSize: '0.8125rem', color: '#475569' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>{t.officialWarning.unavailableDesc}</p>
              <a
                href={imdResult?.officialPortalUrl || 'https://mausam.imd.gov.in/'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{
                  fontSize: '0.75rem',
                  display: 'inline-flex',
                  color: '#0d9488',
                  borderColor: '#99f6e4',
                  backgroundColor: '#f0fdfa',
                }}
              >
                <ExternalLink size={12} />
                {t.officialWarning.visitPortalBtn}
              </a>
            </div>
          )}
        </div>

        {/* Honesty & Freshness Footnote */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginTop: '0.85rem',
            fontSize: '0.75rem',
            color: '#64748b',
          }}
        >
          <Info size={13} style={{ flexShrink: 0 }} />
          <span>
            {isDemo ? t.safetyOverview.simulatedNotice : t.safetyOverview.forecastNotice}
          </span>
        </div>
      </div>
    </div>
  );
};

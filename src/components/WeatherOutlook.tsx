import React from 'react';
import { Clock, CloudRain, Droplet } from 'lucide-react';
import type { HourlyForecastItem } from '../types/weather';
import type { TranslationDictionary } from '../types/translations';

interface WeatherOutlookProps {
  hourly: HourlyForecastItem[];
  t: TranslationDictionary;
}

export const WeatherOutlook: React.FC<WeatherOutlookProps> = ({ hourly, t }) => {
  if (!hourly || hourly.length === 0) return null;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h2 className="card-title">
            <Clock size={22} color="#0d9488" />
            {t.outlook.title}
          </h2>
          <p className="card-subtitle">{t.outlook.subtitle}</p>
        </div>
      </div>

      <div className="card-body" style={{ paddingTop: '0.25rem' }}>
        <div className="hourly-scroll" tabIndex={0} aria-label="Hourly forecast list">
          {hourly.map((item, idx) => {
            const hasSignificantRain = item.precipitationProbability >= 50 || item.precipitation > 2;

            return (
              <div
                key={`${item.time}-${idx}`}
                className="hourly-card"
                style={{
                  borderColor: hasSignificantRain ? '#bfdbfe' : undefined,
                  backgroundColor: hasSignificantRain ? '#f8fafc' : undefined,
                }}
              >
                <span className="hourly-time">{item.formattedTime}</span>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 28,
                  }}
                >
                  <CloudRain
                    size={20}
                    color={hasSignificantRain ? '#2563eb' : '#64748b'}
                  />
                </div>

                <span className="hourly-temp">{item.temperature}°</span>

                <span
                  className="hourly-prob"
                  style={{
                    backgroundColor: item.precipitationProbability > 60 ? '#dbeafe' : '#f1f5f9',
                    color: item.precipitationProbability > 60 ? '#1d4ed8' : '#475569',
                  }}
                >
                  <Droplet size={10} style={{ display: 'inline', marginRight: 2 }} />
                  {item.precipitationProbability}%
                </span>

                <span className="hourly-precip">
                  {item.precipitation > 0 ? `${item.precipitation}mm` : '0 mm'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

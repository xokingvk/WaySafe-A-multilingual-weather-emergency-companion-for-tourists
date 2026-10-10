import React from 'react';
import {
  ShieldAlert,
  MapPin,
  RefreshCw,
  Globe,
  Radio,
  AlertTriangle,
  ArrowLeft,
  Navigation,
} from 'lucide-react';
import { CITY_PRESETS } from '../data/cities';
import { languageOptions } from '../data/translations';
import type { SupportedLanguage, TranslationDictionary } from '../types/translations';

interface HeaderProps {
  selectedCityId: string;
  onSelectCity: (cityId: string) => void;
  onUseMyLocation: () => void;
  isLocating: boolean;
  selectedLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  isDemo: boolean;
  onToggleDemo: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdatedText: string;
  t: TranslationDictionary;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCityId,
  onSelectCity,
  onUseMyLocation,
  isLocating,
  selectedLanguage,
  onSelectLanguage,
  isDemo,
  onToggleDemo,
  onRefresh,
  isRefreshing,
  lastUpdatedText,
  t,
}) => {
  return (
    <header className="header-wrapper">
      <div className="header-inner">
        {/* Brand */}
        <div className="header-brand">
          <div className="brand-icon-box" aria-hidden="true">
            <ShieldAlert size={26} />
          </div>
          <div className="brand-info">
            <div className="brand-name">
              {t.header.title}
              <span
                className={`badge ${isDemo ? 'badge-demo' : 'badge-live'}`}
                style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}
              >
                <Radio size={10} />
                {isDemo ? t.header.demoModeBadge : t.header.liveModeBadge}
              </span>
            </div>
            <div className="brand-tagline">{t.header.tagline}</div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="header-controls">
          {/* City Preset Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={16} color="#64748b" />
            <select
              id="city-selector"
              aria-label={t.header.selectPreset}
              className="control-select"
              value={isDemo ? 'chennai' : selectedCityId}
              onChange={(e) => onSelectCity(e.target.value)}
              disabled={isDemo}
            >
              {CITY_PRESETS.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}, {city.state}
                </option>
              ))}
              {selectedCityId === 'custom' && (
                <option value="custom">📍 Device GPS Location</option>
              )}
            </select>
          </div>

          {/* Use My Location Button */}
          <button
            id="use-my-location-btn"
            onClick={onUseMyLocation}
            disabled={isLocating || isDemo}
            className="btn btn-outline btn-sm"
            title="Detect device GPS coordinates and fetch local weather"
          >
            <Navigation size={14} className={isLocating ? 'animate-spin' : ''} />
            {isLocating ? t.header.locating : t.header.useMyLocation}
          </button>

          {/* Refresh Weather */}
          <button
            id="refresh-weather-btn"
            onClick={onRefresh}
            disabled={isRefreshing || isDemo}
            className="btn btn-outline btn-sm"
            title={`${t.header.refresh} (${lastUpdatedText})`}
          >
            <RefreshCw
              size={14}
              style={{
                animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
              }}
            />
            <span style={{ display: 'none' }}>{t.header.refresh}</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {isRefreshing ? t.header.refreshing : lastUpdatedText}
            </span>
          </button>

          {/* Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Globe size={16} color="#64748b" />
            <select
              id="language-selector"
              aria-label="Select Application Language"
              className="control-select"
              value={selectedLanguage}
              onChange={(e) => onSelectLanguage(e.target.value as SupportedLanguage)}
            >
              {languageOptions.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.native} ({opt.label})
                </option>
              ))}
            </select>
          </div>

          {/* Mode Switcher */}
          {isDemo ? (
            <button
              id="exit-demo-mode-btn"
              onClick={onToggleDemo}
              className="btn btn-sm btn-danger"
              style={{ fontWeight: 700 }}
            >
              <ArrowLeft size={14} />
              {t.header.exitDemoBtn}
            </button>
          ) : (
            <button
              id="activate-crisis-demo-btn"
              onClick={onToggleDemo}
              className="btn btn-sm btn-demo-trigger"
            >
              <AlertTriangle size={14} />
              {t.header.activateDemoBtn}
            </button>
          )}
        </div>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
};

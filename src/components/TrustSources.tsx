import React from 'react';
import { ShieldCheck, Cloud, Building2, Map, Lock, AlertCircle } from 'lucide-react';
import type { TranslationDictionary } from '../types/translations';

interface TrustSourcesProps {
  t: TranslationDictionary;
}

export const TrustSources: React.FC<TrustSourcesProps> = ({ t }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h2 className="card-title">
            <ShieldCheck size={22} color="#0d9488" />
            {t.sources.title}
          </h2>
          <p className="card-subtitle">{t.sources.subtitle}</p>
        </div>
      </div>

      <div className="card-body">
        <div className="sources-grid">
          {/* Open-Meteo */}
          <div className="source-item">
            <div className="source-header">
              <Cloud size={16} color="#0284c7" />
              <span>{t.sources.openMeteoTitle}</span>
            </div>
            <p className="source-desc">{t.sources.openMeteoDesc}</p>
          </div>

          {/* IMD */}
          <div className="source-item">
            <div className="source-header">
              <Building2 size={16} color="#b45309" />
              <span>{t.sources.imdTitle}</span>
            </div>
            <p className="source-desc">{t.sources.imdDesc}</p>
          </div>

          {/* OpenStreetMap */}
          <div className="source-item">
            <div className="source-header">
              <Map size={16} color="#16a34a" />
              <span>{t.sources.osmTitle}</span>
            </div>
            <p className="source-desc">{t.sources.osmDesc}</p>
          </div>

          {/* Privacy */}
          <div className="source-item">
            <div className="source-header">
              <Lock size={16} color="#0d9488" />
              <span>{t.sources.privacyTitle}</span>
            </div>
            <p className="source-desc">{t.sources.privacyDesc}</p>
          </div>
        </div>

        {/* Official Disclaimer */}
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '0.75rem',
            color: '#475569',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
          }}
        >
          <AlertCircle size={15} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{t.sources.officialDisclaimer}</span>
        </div>
      </div>
    </div>
  );
};

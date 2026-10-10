import React from 'react';
import { AlertOctagon, ArrowLeft } from 'lucide-react';
import type { TranslationDictionary } from '../types/translations';

interface CrisisBannerProps {
  t: TranslationDictionary;
  onExitDemo: () => void;
}

export const CrisisBanner: React.FC<CrisisBannerProps> = ({ t, onExitDemo }) => {
  return (
    <div className="demo-banner" role="alert" aria-live="assertive">
      <div className="demo-banner-inner">
        <div className="demo-banner-content">
          <div className="demo-banner-icon">
            <AlertOctagon size={24} color="#ffffff" />
          </div>
          <div>
            <div className="demo-banner-title">{t.banner.simulatedTitle}</div>
            <div className="demo-banner-desc">{t.banner.simulatedDescription}</div>
          </div>
        </div>

        <button
          onClick={onExitDemo}
          className="btn btn-sm"
          style={{
            backgroundColor: '#ffffff',
            color: '#991b1b',
            border: 'none',
            fontWeight: 800,
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
          title="Exit simulated crisis scenario and restore live weather observation"
        >
          <ArrowLeft size={16} />
          {t.banner.exitDemoButton}
        </button>
      </div>
    </div>
  );
};

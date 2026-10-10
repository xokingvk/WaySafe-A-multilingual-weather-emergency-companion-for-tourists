import React from 'react';
import { HelpCircle } from 'lucide-react';
import type { TranslationDictionary } from '../types/translations';

interface EmergencyActionPanelProps {
  t: TranslationDictionary;
}

export const EmergencyActionPanel: React.FC<EmergencyActionPanelProps> = ({ t }) => {
  return (
    <div className="card" style={{ borderLeft: '4px solid #0d9488' }}>
      <div className="card-header">
        <div className="card-title-group">
          <h2 className="card-title">
            <HelpCircle size={22} color="#0d9488" />
            {t.emergencyAction.title}
          </h2>
          <p className="card-subtitle">{t.emergencyAction.subtitle}</p>
        </div>
      </div>

      <div className="card-body" style={{ paddingTop: '0.5rem' }}>
        <div className="action-steps-list">
          {t.emergencyAction.actions.map((act) => (
            <div key={act.step} className="action-step-item">
              <div className="step-num-badge">{act.step}</div>
              <div className="step-content">
                <div className="step-title">
                  <span>{act.title}</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      backgroundColor:
                        act.step === 1 ? '#fee2e2' : act.step === 4 ? '#fef3c7' : '#ccfbf1',
                      color:
                        act.step === 1 ? '#991b1b' : act.step === 4 ? '#92400e' : '#0f766e',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                    }}
                  >
                    {act.badge}
                  </span>
                </div>
                <p className="step-desc">{act.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

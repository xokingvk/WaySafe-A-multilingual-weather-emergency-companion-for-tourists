import React from 'react';
import { History, AlertTriangle } from 'lucide-react';
import { DEMO_TIMELINE_EVENTS } from '../data/demoScenario';
import type { TranslationDictionary } from '../types/translations';

interface DemoTimelineProps {
  t: TranslationDictionary;
}

export const DemoTimeline: React.FC<DemoTimelineProps> = ({ t }) => {
  return (
    <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
      <div className="card-header">
        <div className="card-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 className="card-title">
              <History size={22} color="#dc2626" />
              {t.timeline.title}
            </h2>
            <span className="badge badge-demo">{t.timeline.badge}</span>
          </div>
          <p className="card-subtitle">{t.timeline.subtitle}</p>
        </div>
      </div>

      <div className="card-body">
        <div className="timeline-list">
          {DEMO_TIMELINE_EVENTS.map((evt, idx) => (
            <div key={idx} className="timeline-item">
              <div
                className={`timeline-dot ${
                  evt.level === 'critical'
                    ? 'timeline-dot-critical'
                    : evt.level === 'warning'
                    ? 'timeline-dot-warning'
                    : ''
                }`}
              />
              <span className="timeline-time">{evt.time} IST</span>
              <div className="timeline-item-title">{evt.title}</div>
              <div className="timeline-item-desc">{evt.detail}</div>
              <div className="timeline-action-note">
                <AlertTriangle size={12} style={{ display: 'inline', marginRight: 4 }} />
                {evt.actionRequired}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

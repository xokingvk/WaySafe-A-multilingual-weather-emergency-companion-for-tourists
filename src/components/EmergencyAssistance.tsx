import React, { useState } from 'react';
import {
  PhoneCall,
  Copy,
  Check,
  LifeBuoy,
  Users,
  AlertOctagon,
  FileText,
} from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { generateHelpMessage } from '../utils/formatters';
import type { TranslationDictionary } from '../types/translations';

interface EmergencyAssistanceProps {
  locationName: string;
  lat: number;
  lng: number;
  isDemo: boolean;
  t: TranslationDictionary;
  onShowToast: (message: string) => void;
}

export const EmergencyAssistance: React.FC<EmergencyAssistanceProps> = ({
  locationName,
  lat,
  lng,
  isDemo,
  t,
  onShowToast,
}) => {
  const [partySize, setPartySize] = useState<number>(2);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const formattedMessage = generateHelpMessage({
    locationName,
    lat,
    lng,
    customDetails: customNotes.trim() || undefined,
    isDemo,
    partySize,
  });

  const handleCopy = async () => {
    const success = await copyToClipboard(formattedMessage);
    if (success) {
      setCopied(true);
      onShowToast(t.assistance.copiedSuccess);
      setTimeout(() => setCopied(false), 3000);
    } else {
      onShowToast('Could not copy automatically. Please select the text and copy manually.');
    }
  };

  return (
    <div className="card" style={{ borderTop: '4px solid #dc2626' }}>
      <div className="card-header">
        <div className="card-title-group">
          <h2 className="card-title">
            <LifeBuoy size={22} color="#dc2626" />
            {t.assistance.title}
          </h2>
          <p className="card-subtitle">{t.assistance.subtitle}</p>
        </div>
      </div>

      <div className="card-body">
        {/* Prominent Call 112 Action */}
        <div style={{ marginBottom: '1.25rem' }}>
          <a
            id="emergency-call-112-btn"
            href="tel:112"
            className="btn btn-emergency-call"
            title="Open phone dialer with 112"
          >
            <PhoneCall size={22} />
            <span>{t.assistance.call112Btn}</span>
          </a>
          <p
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginTop: '0.5rem',
              lineHeight: 1.4,
            }}
          >
            {t.assistance.call112Notice}
          </p>
        </div>

        {/* Party Size & Situation Note */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={16} color="#64748b" />
            <label
              htmlFor="party-size-select"
              style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155' }}
            >
              Number of People:
            </label>
            <select
              id="party-size-select"
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              className="control-select"
              style={{ padding: '0.25rem 1.8rem 0.25rem 0.6rem', fontSize: '0.8125rem' }}
            >
              <option value={1}>1 Person</option>
              <option value={2}>2 People</option>
              <option value={3}>3 People</option>
              <option value={4}>4 People</option>
              <option value={5}>5+ People</option>
            </select>
          </div>

          <button
            id="copy-emergency-message-btn"
            onClick={handleCopy}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: 700 }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? t.assistance.copiedSuccess : t.assistance.copyBtn}
          </button>
        </div>

        {/* Optional Custom Landmark / Note Input */}
        <div style={{ marginBottom: '0.75rem' }}>
          <label
            htmlFor="custom-situation-input"
            style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}
          >
            Hotel Name, Room No, or Landmark (Optional):
          </label>
          <input
            id="custom-situation-input"
            type="text"
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            placeholder="e.g. Room 304, Green Park Hotel, water rising near driveway"
            className="control-select"
            style={{ width: '100%', background: '#fff', fontSize: '0.8rem', padding: '0.45rem 0.75rem', backgroundImage: 'none' }}
          />
        </div>

        {/* Copyable Message Box */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <textarea
            id="emergency-message-preview"
            readOnly
            value={formattedMessage}
            className="help-message-textarea"
            aria-label="Generated emergency assistance message"
          />
        </div>

        {/* Checklist for Responders */}
        <div className="checklist-box">
          <div className="checklist-title">
            <FileText size={16} color="#0d9488" />
            <span>{t.assistance.checklistTitle}</span>
          </div>
          <ul className="checklist-list">
            {t.assistance.checklistItems.map((item, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                <span style={{ color: '#0d9488', fontWeight: 800 }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            marginTop: '0.85rem',
            padding: '0.5rem 0.75rem',
            background: '#fffbeb',
            border: '1px solid #fef3c7',
            borderRadius: '6px',
            fontSize: '0.73rem',
            color: '#92400e',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <AlertOctagon size={14} style={{ flexShrink: 0 }} />
          <span>{t.assistance.disclaimer}</span>
        </div>
      </div>
    </div>
  );
};

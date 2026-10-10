import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Layers } from 'lucide-react';
import type { HazardZone, ShelterPoint } from '../types/emergency';
import type { TranslationDictionary } from '../types/translations';

interface WeatherMapProps {
  lat: number;
  lng: number;
  locationName: string;
  isDemo: boolean;
  hazardZones?: HazardZone[];
  shelters?: ShelterPoint[];
  t: TranslationDictionary;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({
  lat,
  lng,
  locationName,
  isDemo,
  hazardZones = [],
  shelters = [],
  t,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: isDemo ? 12 : 11,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;

      // Invalidate size on resize to avoid partial rendering
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map view and markers when lat/lng/demo changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    // Clear previous markers and overlays
    markersGroup.clearLayers();

    // Fly to new center
    map.setView([lat, lng], isDemo ? 12 : 11, { animate: true });

    // 1. Tourist / Selected Location Marker
    const touristIcon = L.divIcon({
      className: 'custom-leaflet-marker-tourist',
      html: `
        <div style="
          background-color: #0d9488;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.45);
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });

    const touristMarker = L.marker([lat, lng], { icon: touristIcon });
    touristMarker.bindPopup(`
      <div style="font-family: inherit; padding: 4px; max-width: 240px;">
        <strong style="color: #0f172a; font-size: 14px; display: block; margin-bottom: 4px;">${locationName}</strong>
        <p style="font-size: 12px; color: #475569; margin: 0;">${t.map.youAreHere}</p>
        <span style="display: inline-block; margin-top: 6px; font-size: 11px; background: #ccfbf1; color: #0f766e; padding: 2px 6px; border-radius: 4px; font-weight: 600;">
          ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E
        </span>
      </div>
    `);
    markersGroup.addLayer(touristMarker);

    // 2. DEMO MODE ONLY: Add Simulated Hazard Circles and Shelters
    if (isDemo) {
      hazardZones.forEach((zone) => {
        const circle = L.circle(zone.center, {
          color: '#dc2626',
          fillColor: '#ef4444',
          fillOpacity: 0.28,
          weight: 2,
          dashArray: '5, 8',
          radius: zone.radiusMeters,
        });

        circle.bindPopup(`
          <div style="font-family: inherit; padding: 6px; max-width: 260px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="background: #fee2e2; color: #991b1b; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">
                ${t.map.demoHazardBadge}
              </span>
            </div>
            <strong style="color: #991b1b; font-size: 13px; display: block; margin-bottom: 4px;">${zone.name}</strong>
            <p style="font-size: 12px; color: #334155; margin: 0; line-height: 1.4;">${zone.advisory}</p>
          </div>
        `);
        markersGroup.addLayer(circle);
      });

      shelters.forEach((shelter) => {
        const shelterIcon = L.divIcon({
          className: 'custom-leaflet-marker-shelter',
          html: `
            <div style="
              background-color: #2563eb;
              color: white;
              width: 32px;
              height: 32px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid white;
              box-shadow: 0 4px 10px rgba(37, 99, 235, 0.4);
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21h18"></path>
                <path d="M19 21v-4"></path>
                <path d="M19 13a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v8"></path>
                <path d="M10 9V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4"></path>
              </svg>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        const shelterMarker = L.marker([shelter.lat, shelter.lng], { icon: shelterIcon });
        shelterMarker.bindPopup(`
          <div style="font-family: inherit; padding: 6px; max-width: 270px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="background: #dbeafe; color: #1e40af; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">
                ${t.map.demoShelterBadge}
              </span>
            </div>
            <strong style="color: #1e3a8a; font-size: 13px; display: block; margin-bottom: 4px;">${shelter.name}</strong>
            <p style="font-size: 11px; color: #475569; margin-bottom: 4px;">📍 ${shelter.address}</p>
            <p style="font-size: 11px; color: #1e293b; margin-bottom: 4px;"><strong>Capacity:</strong> ${shelter.capacityNote}</p>
            <div style="font-size: 10px; color: #b45309; background: #fffbeb; padding: 4px 6px; border-radius: 4px; border: 1px solid #fef3c7;">
              ⚠️ Demonstration marker only. Verify active operational shelters via 112.
            </div>
          </div>
        `);
        markersGroup.addLayer(shelterMarker);
      });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [lat, lng, locationName, isDemo, hazardZones, shelters, t]);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h2 className="card-title">
            <Layers className="text-teal-600" size={22} color="#0d9488" />
            {t.map.title}
          </h2>
          <p className="card-subtitle">{t.map.subtitle}</p>
        </div>
      </div>

      <div className="card-body" style={{ paddingTop: '0.5rem' }}>
        <div className="map-container-box" ref={mapContainerRef} />

        {/* Legend */}
        <div className="map-legend-box">
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-dot legend-dot-tourist" />
              <span>{t.map.legendTourist}</span>
            </div>

            {isDemo && (
              <>
                <div className="legend-item">
                  <span className="legend-dot legend-dot-hazard" />
                  <span>{t.map.legendHazard}</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot legend-dot-shelter" />
                  <span>{t.map.legendShelter}</span>
                </div>
              </>
            )}
          </div>

          {isDemo && (
            <p style={{ fontSize: '0.75rem', color: '#b91c1c', margin: 0, fontWeight: 500 }}>
              {t.map.demoNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

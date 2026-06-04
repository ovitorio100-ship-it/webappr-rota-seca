import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import Header from '../components/Header';
import { ShieldCheck, Navigation } from 'lucide-react';
import './AlternativeRoute.css';

const originalRoute = [
  [-8.1130, -34.8945],
  [-8.1000, -34.8920],
  [-8.0900, -34.8900],
  [-8.0560, -34.8810]
];

const safeRoute = [
  [-8.1130, -34.8945],
  [-8.1100, -34.9050],
  [-8.0800, -34.9100],
  [-8.0600, -34.8950],
  [-8.0560, -34.8810]
];

const blockIcon = L.divIcon({
  className: 'block-marker',
  html: '❌',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const AlternativeRoute = () => {
  const navigate = useNavigate();
  const [routeType, setRouteType] = useState('segura');

  return (
    <div className="route-container animate-fade-in">
      <Header title="Rota Alternativa" showBack={true} transparent={true} />

      <div className="route-toggle-container glass-panel">
        <div className="route-toggle">
          <div 
            className={`toggle-option ${routeType === 'segura' ? 'active' : ''}`}
            onClick={() => setRouteType('segura')}
          >
            Mais Segura
          </div>
          <div 
            className={`toggle-option ${routeType === 'rapida' ? 'active' : ''}`}
            onClick={() => setRouteType('rapida')}
          >
            Mais Rápida
          </div>
        </div>
      </div>

      <div className="map-route-wrapper">
        <MapContainer 
          bounds={[[-8.12, -34.92], [-8.04, -34.87]]} 
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          
          {/* Original Route */}
          <Polyline 
            positions={originalRoute} 
            pathOptions={{ color: '#E74C3C', weight: 4, dashArray: '10, 10', opacity: routeType === 'rapida' ? 1 : 0.4 }} 
          />
          <Marker position={[-8.1130, -34.8945]} icon={blockIcon} />
          <Marker position={[-8.0560, -34.8810]} icon={blockIcon} />

          {/* Safe Route */}
          <Polyline 
            positions={safeRoute} 
            pathOptions={{ color: '#27AE60', weight: 6, opacity: routeType === 'segura' ? 1 : 0.4 }} 
          />
        </MapContainer>
      </div>

      <div className="route-bottom-card glass-card">
        <div className="comparison-table mb-4">
          <div className="table-header">
            <div></div>
            <div className={`text-sm ${routeType === 'rapida' ? 'font-semibold text-main' : 'text-secondary'}`}>Rota Habitual</div>
            <div className={`text-sm ${routeType === 'segura' ? 'font-semibold text-success' : 'text-secondary'}`}>Rota Segura</div>
          </div>
          <div className="table-row">
            <div className="label">Tempo</div>
            <div className={routeType === 'rapida' ? 'font-semibold text-danger' : ''}>12 min</div>
            <div className={routeType === 'segura' ? 'font-semibold text-success' : ''}>18 min</div>
          </div>
          <div className="table-row">
            <div className="label">Distância</div>
            <div>4,2 km</div>
            <div>5,8 km</div>
          </div>
          <div className="table-row">
            <div className="label">Riscos</div>
            <div className="text-danger">3 ⚠️</div>
            <div className="text-success">0 ✅</div>
          </div>
          <div className="table-row">
            <div className="label">Status</div>
            <div className="text-danger caption">❌ Não recomendada</div>
            <div className="text-success caption">✅ Recomendada</div>
          </div>
        </div>

        <button className="btn-success mb-3 pulse-animation-subtle" style={{ background: routeType === 'segura' ? 'var(--gradient-success)' : 'var(--gradient-danger)' }} onClick={() => navigate('/navigate')}>
          <Navigation size={20} />
          Iniciar Navegação
        </button>
        <button className="btn-outline" onClick={() => navigate('/home')}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AlternativeRoute;

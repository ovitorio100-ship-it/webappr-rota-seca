import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation2, X, AlertTriangle } from 'lucide-react';
import './ActiveNavigation.css';

// Focus on the active segment
const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 17, { animate: true, duration: 1 });
  }, [position, map]);
  return null;
};

const ActiveNavigation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // Simulated turn-by-turn route coordinates
  const activeRoute = [
    [-8.1130, -34.8945],
    [-8.1100, -34.9050],
    [-8.0800, -34.9100],
    [-8.0600, -34.8950],
    [-8.0560, -34.8810]
  ];

  const instructions = [
    { text: 'Siga em frente na Av. Conselheiro Aguiar', distance: '800 m' },
    { text: 'Vire à direita na Rua Ribeiro de Brito (Desvio de alagamento)', distance: '1.2 km' },
    { text: 'Siga na Via Expressa', distance: '2.5 km' },
    { text: 'Vire à esquerda na Rua da Aurora', distance: '500 m' },
    { text: 'Você chegou ao seu destino!', distance: '0 m' }
  ];

  const carIcon = L.divIcon({
    className: 'car-marker',
    html: '<div class="car-arrow"></div>',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  // Simulate GPS movement every 4 seconds
  useEffect(() => {
    if (currentStep < activeRoute.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, activeRoute.length]);

  return (
    <div className="active-nav-container animate-fade-in">
      {/* Top Turn-by-Turn Instruction */}
      <div className="nav-header glass-card">
        <div className="nav-icon-box bg-accent">
          <Navigation2 size={28} color="white" />
        </div>
        <div className="nav-instruction">
          <h2 className="text-main mb-1" style={{ fontSize: '18px' }}>
            {instructions[currentStep].text}
          </h2>
          <span className="font-bold text-accent text-lg">
            {instructions[currentStep].distance}
          </span>
        </div>
      </div>

      <div className="nav-map-wrapper">
        <MapContainer 
          center={activeRoute[0]} 
          zoom={17} 
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          <MapUpdater position={activeRoute[currentStep]} />
          
          <Polyline 
            positions={activeRoute} 
            pathOptions={{ color: '#27AE60', weight: 8, opacity: 0.8 }} 
          />
          <Polyline 
            positions={activeRoute.slice(0, currentStep + 1)} 
            pathOptions={{ color: '#1B2A4A', weight: 8, opacity: 0.5 }} 
          />
          
          <Marker position={activeRoute[currentStep]} icon={carIcon} />
        </MapContainer>
      </div>

      {/* Floating Warnings */}
      <div className="nav-warnings">
        <div className="nav-warning-badge glass-panel text-success font-semibold flex items-center gap-2">
          Rota Segura Ativa ✅
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="nav-bottom-panel glass-card">
        <div className="nav-stats flex justify-between items-center mb-4">
          <div className="flex-col">
            <span className="text-success font-bold text-2xl">
              {currentStep === instructions.length - 1 ? 'Chegou' : `${18 - currentStep * 3} min`}
            </span>
            <span className="text-secondary font-semibold">
              {currentStep === instructions.length - 1 ? '0 km' : `${(5.8 - currentStep * 1.2).toFixed(1)} km`} • Chegada às 14:{45 + (18 - currentStep * 3)}
            </span>
          </div>
          <button 
            className="btn-end-route" 
            onClick={() => navigate('/home')}
          >
            <X size={24} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveNavigation;

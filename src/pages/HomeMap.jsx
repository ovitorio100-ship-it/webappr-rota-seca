import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { Bell, MapPin, Plus, ShieldCheck, Activity, User, CloudRain, Video, Moon, Sun } from 'lucide-react';
import BottomSheet from '../components/BottomSheet';
import { weatherData } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import 'leaflet/dist/leaflet.css';
import './HomeMap.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createCustomIcon = (level, source) => {
  let color = '#27AE60'; 
  if (level === 'LEVE') color = '#F5A623'; 
  if (level === 'MODERADO') color = '#E67E22'; 
  if (level === 'GRAVE' || level === 'INTRANSITAVEL') color = '#E74C3C'; 
  
  let sourceIcon = '👤';
  if (source === 'IoT') sourceIcon = '📡';
  if (source === 'IA') sourceIcon = '🤖';

  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div class="marker-pin" style="background-color: ${color};">
        <span class="marker-icon">${sourceIcon}</span>
      </div>
      <div class="marker-pulse" style="border-color: ${color};"></div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

const cameraIcon = L.divIcon({
  className: 'camera-marker',
  html: `
    <div style="background: #2D7DD2; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 2px solid white;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const cameras = [
  { id: 'cam1', name: 'Av. Agamenon Magalhães', lat: -8.0520, lng: -34.8900, img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80' },
  { id: 'cam2', name: 'Av. Domingos Ferreira', lat: -8.1150, lng: -34.8950, img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80' },
];

const HomeMap = () => {
  const navigate = useNavigate();
  const { floodPoints, alerts, predictiveAlertDismissed, dismissPredictiveAlert, darkMode, toggleDarkMode, user } = useAppContext();
  
  // Only show modal if not dismissed and we have "bad weather" simulation
  const [showAlertModal, setShowAlertModal] = useState(!predictiveAlertDismissed); 

  const unreadAlertsCount = alerts.length;

  return (
    <div className="home-container animate-fade-in">
      <div className="map-header flex justify-between items-center">
        <div className="profile-btn glass-panel shadow-sm flex items-center gap-2 cursor-pointer" style={{ padding: '6px 12px', borderRadius: '24px', width: 'auto' }} onClick={() => navigate('/profile')}>
          <div style={{ background: 'var(--gradient-primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
            {user.initials}
          </div>
          <span className="font-semibold text-primary text-sm">Olá, {user.name.split(' ')[0]}</span>
        </div>
        
        <div className="flex gap-2">
          <div className="notification-btn glass-panel shadow-sm cursor-pointer" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} className="text-alert" /> : <Moon size={20} className="text-primary" />}
          </div>
          
          <div className="notification-btn glass-panel shadow-sm cursor-pointer" onClick={() => navigate('/alerts')}>
            <Bell size={20} className="text-primary" />
            {unreadAlertsCount > 0 && <span className="notification-badge">{unreadAlertsCount}</span>}
          </div>
        </div>
      </div>

      {showAlertModal && (
        <div className="predictive-modal-overlay">
          <div className="predictive-modal glass-card animate-slide-up">
            <div className="flex justify-center mb-2">
              <div className="icon-warning bg-alert-light">
                <CloudRain size={32} className="text-alert" />
              </div>
            </div>
            <div className="badge-alert mb-2">ALERTA PREDITIVO</div>
            <h2 className="text-center mb-1">Chuva forte prevista para Boa Viagem</h2>
            <p className="text-center text-secondary text-sm mb-4">em aproximadamente 30 minutos</p>
            
            <div className="divider mb-4"></div>
            
            <p className="font-semibold mb-3">Sua rota habitual tem 3 pontos de alto risco:</p>
            <div className="risk-points mb-6">
              {floodPoints.slice(0,3).map(pt => (
                <div className="risk-point" key={pt.id}>
                  <span className={`dot ${pt.level?.toLowerCase() || 'leve'}`}></span>
                  <span className="name">{pt.name}</span>
                  <span className="prob">{pt.probability || 85}%</span>
                </div>
              ))}
            </div>

            <div className="flex-col gap-3">
              <button className="btn-success" style={{ background: 'var(--gradient-success)' }} onClick={() => navigate('/route')}>
                Ver Rota Alternativa Segura
              </button>
              <button className="btn-outline" onClick={() => { setShowAlertModal(false); dismissPredictiveAlert(); }}>
                Dispensar
              </button>
            </div>
            <p className="caption text-center mt-4">Baseado em dados meteorológicos + histórico</p>
          </div>
        </div>
      )}

      <div className="map-wrapper">
        <MapContainer 
          center={[-8.0500, -34.8700]} 
          zoom={13} 
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={darkMode 
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            }
            attribution='&copy; OSM &copy; CARTO'
          />
          <ZoomControl position="topright" />
          
          {floodPoints.map(point => (
            <Marker 
              key={point.id} 
              position={[point.lat, point.lng]}
              icon={createCustomIcon(point.level, point.source)}
            >
              <Popup className="custom-popup">
                <div className="popup-content">
                  <h3 className="text-sm font-semibold mb-1">{point.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`badge-level ${point.level?.toLowerCase()}`}>{point.level}</span>
                    <span className="caption flex items-center gap-1">
                      {point.source === 'IoT' && <Activity size={12}/>}
                      {point.source === 'IA' && <ShieldCheck size={12}/>}
                      {point.source === 'Usuário' && <User size={12}/>}
                      {point.source}
                    </span>
                  </div>
                  {point.probability > 0 && (
                    <p className="caption mb-2">Prob. de alagamento: <strong>{point.probability}%</strong></p>
                  )}
                  {point.description && <p className="caption mb-2 text-secondary">"{point.description}"</p>}
                  <button className="btn-primary" style={{padding: '8px', fontSize: '12px', width: '100%', background: 'var(--gradient-primary)'}} onClick={() => navigate('/route')}>
                    Evitar Região
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Traffic Cameras */}
          {cameras.map(cam => (
            <Marker key={cam.id} position={[cam.lat, cam.lng]} icon={cameraIcon}>
              <Popup className="custom-popup camera-popup">
                <div className="popup-content" style={{ minWidth: '220px' }}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold">{cam.name}</h3>
                    <span className="badge-level" style={{ background: 'var(--danger)', color: 'white', padding: '2px 6px', fontSize: '10px', animation: 'pulse-subtle 1.5s infinite' }}>AO VIVO</span>
                  </div>
                  <div className="camera-feed mb-2" style={{ borderRadius: '8px', overflow: 'hidden', height: '120px', background: '#000', position: 'relative' }}>
                    <img src={cam.img} alt="Live Feed" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                    <div style={{ position: 'absolute', bottom: '4px', right: '4px', color: 'white', fontSize: '10px', fontWeight: 'bold', textShadow: '0 1px 2px black' }}>CTTU - RECIFE</div>
                  </div>
                  <p className="caption text-secondary mb-0">Monitoramento contínuo ODS 11.</p>
                </div>
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      </div>

      <button className="fab-report" style={{ background: 'var(--gradient-primary)' }} onClick={() => navigate('/report')}>
        <Plus size={24} />
      </button>

      <div className="action-btn-container">
        <button className="btn-success shadow-lg" style={{ background: 'var(--gradient-success)' }} onClick={() => navigate('/route')}>
          <ShieldCheck size={20} />
          Traçar Rota Segura
        </button>
      </div>

      <BottomSheet initialExpanded={false} collapsedHeight={130}>
        <div className="summary-header mb-4">
          <h3 className="mb-2">Resumo Atual</h3>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-danger font-bold flex items-center gap-1">⚠️ {floodPoints.length} pontos de alagamento</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-primary flex items-center gap-1">🌧️ {weatherData.precipitation}</span>
          </div>
        </div>
        
        <div className="summary-list">
          <h4 className="mb-3 text-secondary">Pontos Críticos:</h4>
          {floodPoints.filter(p => p.level === 'GRAVE' || p.level === 'MODERADO').map(point => (
            <div key={point.id} className="summary-item card glass-card mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`status-dot ${point.level?.toLowerCase()}`}></div>
                <div className="flex-col">
                  <span className="font-semibold text-sm">{point.name}</span>
                  <span className="caption">{point.level} • {point.source}</span>
                </div>
              </div>
              <button className="btn-outline" style={{padding: '4px 8px', fontSize: '12px', width: 'auto'}} onClick={() => navigate('/route')}>
                Desviar
              </button>
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

export default HomeMap;

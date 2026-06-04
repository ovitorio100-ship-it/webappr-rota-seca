import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';
import { Camera, MapPin, CheckCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import './Report.css';

// Automatically geolocate user on map load
const LocationMarker = ({ position, setPosition }) => {
  const map = useMap();
  
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map, setPosition]);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  const icon = L.divIcon({
    className: 'draggable-marker',
    html: '<div class="pin"></div><div class="pulse"></div>',
    iconSize: [30, 30]
  });

  return position === null ? null : (
    <Marker position={position} icon={icon} draggable={true} eventHandlers={{
      dragend: (e) => setPosition(e.target.getLatLng())
    }} />
  );
};

const Report = () => {
  const navigate = useNavigate();
  const { addFloodPoint } = useAppContext();
  const [level, setLevel] = useState('');
  const [position, setPosition] = useState(null); // Will be set by geolocate or click
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!level || !position) return; // Need position
    
    // Add to global state
    addFloodPoint({
      name: 'Reporte do Usuário',
      level: level.toUpperCase(),
      lat: position.lat,
      lng: position.lng,
      description: description
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate('/home');
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="report-success flex-col items-center justify-center h-full animate-fade-in text-center p-6">
        <CheckCircle size={80} color="var(--success)" className="mb-4 pulse-animation" />
        <h2 className="mb-2">Obrigado!</h2>
        <p className="mb-6">Seu reporte foi validado e já está visível no mapa.</p>
        <div className="badge-community bg-accent text-white px-4 py-2 rounded-full" style={{ background: 'var(--gradient-primary)' }}>
          Você já ajudou a comunidade várias vezes este mês 🏅
        </div>
      </div>
    );
  }

  return (
    <div className="report-container animate-fade-in">
      <Header title="Reportar Alagamento" showBack={true} transparent={false} />
      
      <div className="report-map-section">
        <MapContainer 
          center={[-8.0500, -34.8700]} 
          zoom={14} 
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
        <div className="map-instruction flex items-center justify-center gap-2 glass-panel">
          <MapPin size={16} /> Arraste o pin para o ponto exato
        </div>
      </div>

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group mb-6">
          <label className="font-semibold mb-3 block">Nível da água</label>
          <div className="level-options grid-2">
            <div 
              className={`level-card ${level === 'leve' ? 'selected' : ''}`}
              onClick={() => setLevel('leve')}
            >
              <div className="level-icon text-alert">💧</div>
              <span className="level-title">Leve</span>
              <span className="caption text-center">Água na canela</span>
            </div>
            <div 
              className={`level-card ${level === 'moderado' ? 'selected' : ''}`}
              onClick={() => setLevel('moderado')}
            >
              <div className="level-icon text-orange">🌊</div>
              <span className="level-title">Moderado</span>
              <span className="caption text-center">Água no joelho</span>
            </div>
            <div 
              className={`level-card ${level === 'grave' ? 'selected' : ''}`}
              onClick={() => setLevel('grave')}
            >
              <div className="level-icon text-danger">🌊🌊</div>
              <span className="level-title">Grave</span>
              <span className="caption text-center">Água na cintura</span>
            </div>
            <div 
              className={`level-card ${level === 'intransitavel' ? 'selected' : ''}`}
              onClick={() => setLevel('intransitavel')}
            >
              <div className="level-icon text-danger-dark">⛔</div>
              <span className="level-title">Intransitável</span>
              <span className="caption text-center">Via bloqueada</span>
            </div>
          </div>
        </div>

        <div className="form-group mb-4">
          <button type="button" className="btn-camera flex justify-center items-center gap-2">
            <Camera size={20} />
            Tirar foto (Opcional)
          </button>
        </div>

        <div className="form-group mb-6">
          <textarea 
            rows="3" 
            placeholder="Observações adicionais..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn-primary" disabled={!level || !position} style={{ background: 'var(--gradient-primary)' }}>
          <MapPin size={20} />
          Enviar Reporte
        </button>
      </form>
    </div>
  );
};

export default Report;

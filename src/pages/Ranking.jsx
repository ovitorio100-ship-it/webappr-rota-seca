import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import Header from '../components/Header';
import { neighborhoodRanking } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import './Ranking.css';

const Ranking = () => {
  const { darkMode } = useAppContext();
  const [expandedId, setExpandedId] = useState(null);
  const [period, setPeriod] = useState('6_meses');

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getMultiplier = () => {
    if (period === '30_dias') return 0.2;
    if (period === '1_ano') return 2;
    return 1; // 6_meses
  };

  const getPeriodLabel = () => {
    if (period === '30_dias') return 'nos últimos 30 dias';
    if (period === '1_ano') return 'no último ano';
    return 'nos últimos 6 meses';
  };

  const dynamicRanking = neighborhoodRanking.map(item => {
    const newCount = Math.max(1, Math.round(item.count * getMultiplier()));
    let riskLabel = item.risk;
    if (newCount > 25) riskLabel = '🔴 Crítico';
    else if (newCount > 15) riskLabel = '🟠 Alto';
    else if (newCount > 5) riskLabel = '🟡 Moderado';
    else riskLabel = '🟢 Baixo';

    return { ...item, count: newCount, risk: riskLabel };
  }).sort((a, b) => b.count - a.count);

  // Approximate coordinates for Recife neighborhoods to simulate a heatmap
  const heatMapData = [
    { name: 'Boa Viagem', center: [-8.1130, -34.8945] },
    { name: 'Madalena', center: [-8.0500, -34.9080] },
    { name: 'Derby', center: [-8.0560, -34.8980] },
    { name: 'Imbiribeira', center: [-8.0950, -34.9050] },
    { name: 'Afogados', center: [-8.0770, -34.9120] }
  ];

  return (
    <div className="ranking-container animate-fade-in">
      <Header title="Ranking de Bairros" subtitle="Vulnerabilidade a alagamentos" showBack={true} />
      
      <div className="ranking-filter bg-card-bg glass-panel">
        <select 
          className="period-select" 
          value={period} 
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="30_dias">Últimos 30 dias</option>
          <option value="6_meses">Últimos 6 meses</option>
          <option value="1_ano">Último ano</option>
        </select>
      </div>

      <div className="ranking-map-wrapper">
        <MapContainer 
          center={[-8.08, -34.90]} 
          zoom={12} 
          zoomControl={false}
          scrollWheelZoom={false}
          dragging={true}
          style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        >
          <TileLayer 
            url={darkMode 
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            }
          />
          
          {heatMapData.map((data, idx) => {
            // Find its dynamic ranking count or fallback
            const rankItem = dynamicRanking.find(r => r.name === data.name);
            const count = rankItem ? rankItem.count : 5;
            
            // Dynamic color based on risk
            let color = '#27AE60'; // low
            if (count > 25) color = '#E74C3C'; // critical
            else if (count > 15) color = '#E67E22'; // high
            else if (count > 5) color = '#F1C40F'; // moderate
            
            return (
              <Circle 
                key={idx}
                center={data.center}
                pathOptions={{ fillColor: color, color: color, opacity: 0.2, fillOpacity: 0.4 }}
                radius={Math.max(500, count * 35)} // size changes based on count
              />
            );
          })}
        </MapContainer>
        <div className="map-overlay-badge glass-panel">
          <span className="caption text-primary">Mapa de Vulnerabilidade ({getPeriodLabel()})</span>
        </div>
      </div>

      <div className="ranking-list">
        <div className="ranking-header text-secondary caption">
          <span>#</span>
          <span>Bairro</span>
          <span className="text-center">Alagamentos</span>
          <span className="text-right">Nível de Risco</span>
        </div>
        
        {dynamicRanking.map((item, index) => (
          <div key={item.id} className="ranking-item-wrapper">
            <div 
              className={`ranking-item ${expandedId === item.id ? 'expanded' : ''}`}
              onClick={() => toggleExpand(item.id)}
            >
              <span className="rank-number font-bold text-secondary">{index + 1}</span>
              <span className="font-semibold">{item.name}</span>
              <span className="text-center">{item.count} vezes</span>
              <span className="text-right text-sm">{item.risk}</span>
            </div>
            
            {expandedId === item.id && (
              <div className="ranking-details animate-slide-up">
                <p className="font-semibold mb-2">{item.name} — {item.count} alagamentos {getPeriodLabel()}</p>
                <p className="caption mb-1">Ruas mais afetadas:</p>
                <ul className="affected-streets mb-3">
                  <li>Av. Domingos Ferreira — {Math.max(1, Math.round(12 * getMultiplier()))}x</li>
                  <li>Av. Conselheiro Aguiar — {Math.max(1, Math.round(8 * getMultiplier()))}x</li>
                  <li>Rua Setúbal — {Math.max(1, Math.round(5 * getMultiplier()))}x</li>
                </ul>
                <p className="caption mb-2">Nível médio de água: <strong>{item.count > 10 ? 'Grave' : 'Moderado'}</strong></p>
                
                <div className="chart-container">
                  <div className="chart-bar" style={{height: `${Math.random() * 80 + 20}%`}}></div>
                  <div className="chart-bar" style={{height: `${Math.random() * 80 + 20}%`}}></div>
                  <div className="chart-bar" style={{height: `${Math.random() * 80 + 20}%`}}></div>
                  <div className="chart-bar" style={{height: `${Math.random() * 80 + 20}%`}}></div>
                  <div className="chart-bar" style={{height: `${Math.random() * 80 + 20}%`, backgroundColor: 'var(--danger)'}}></div>
                  <div className="chart-bar" style={{height: `${Math.random() * 80 + 20}%`}}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;

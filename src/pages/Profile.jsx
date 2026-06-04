import React, { useState } from 'react';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';
import { ShieldCheck, MapPin, Clock, Plus, ExternalLink, Settings, Trash2, Award, Phone } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { user, addRoute, removeRoute, updatePreference, darkMode, toggleDarkMode } = useAppContext();
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [newRouteName, setNewRouteName] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const handleAddRoute = () => {
    if (newRouteName.trim() !== '') {
      addRoute(newRouteName);
      setNewRouteName('');
      setShowAddRoute(false);
    }
  };

  const toggleNotification = (key) => {
    updatePreference(key, !user[key]);
  };

  const clearAppData = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="profile-container animate-fade-in">
      <Header title="Perfil" showBack={true}>
        <button onClick={() => setShowSettingsModal(true)}>
          <Settings size={24} className="text-primary" />
        </button>
      </Header>

      {showSettingsModal && (
        <div className="predictive-modal-overlay" style={{ zIndex: 3000 }}>
          <div className="predictive-modal glass-card animate-slide-up">
            <h3 className="mb-4 text-center">Configurações Avançadas</h3>
            <div className="flex-col gap-3">
              <button className="btn-outline text-danger" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }} onClick={clearAppData}>
                Resetar Dados do App
              </button>
              <button className="btn-primary" onClick={() => setShowSettingsModal(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-header glass-card">
        <div className="avatar">{user.initials}</div>
        <h2 className="mt-3">{user.name}</h2>
        <p className="text-secondary">{user.neighborhood}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <ShieldCheck size={28} className="text-success mb-2" />
          <span className="stat-value">{user.stats.avoided}</span>
          <span className="caption text-center">Alagamentos evitados</span>
        </div>
        <div className="stat-card">
          <MapPin size={28} className="text-accent mb-2" />
          <span className="stat-value">{user.stats.reports}</span>
          <span className="caption text-center">Reportes enviados</span>
        </div>
        <div className="stat-card">
          <Clock size={28} className="text-alert mb-2" />
          <span className="stat-value">~{user.stats.savedTime}m</span>
          <span className="caption text-center">Tempo economizado</span>
        </div>
      </div>

      {/* NEW: Conquistas / Gamificação */}
      <div className="settings-section">
        <div className="flex justify-between items-center mb-2">
          <h3 className="section-title mb-0">Minhas Conquistas</h3>
          <span className="text-accent text-sm font-semibold">Ver todas</span>
        </div>
        <div className="badges-scroll-container">
          <div className="badge-item earned">
            <div className="badge-icon bg-accent"><Award size={24} color="white" /></div>
            <span className="badge-name">Pioneiro</span>
          </div>
          <div className="badge-item earned">
            <div className="badge-icon bg-success"><ShieldCheck size={24} color="white" /></div>
            <span className="badge-name">Guardião</span>
          </div>
          <div className="badge-item locked">
            <div className="badge-icon bg-secondary"><MapPin size={24} color="white" /></div>
            <span className="badge-name">Explorador</span>
          </div>
          <div className="badge-item locked">
            <div className="badge-icon bg-secondary"><Clock size={24} color="white" /></div>
            <span className="badge-name">Mestre</span>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Minhas Rotas</h3>
        <div className="settings-card">
          {user.routes.map(route => (
            <div key={route.id} className="setting-item flex items-center justify-between">
              <span className="font-semibold">{route.name}</span>
              <button className="text-danger text-sm cursor-pointer border-none bg-transparent flex items-center gap-1" onClick={() => removeRoute(route.id)}>
                <Trash2 size={16} /> <span className="sr-only">Remover</span>
              </button>
            </div>
          ))}
          
          {showAddRoute ? (
            <div className="setting-item border-none pb-0 flex flex-col gap-2">
              <input 
                type="text" 
                placeholder="Ex: Casa → Academia" 
                value={newRouteName}
                onChange={(e) => setNewRouteName(e.target.value)}
                autoFocus
                className="add-route-input"
              />
              <div className="flex gap-2">
                <button className="btn-success" style={{padding: '8px', fontSize: '14px'}} onClick={handleAddRoute}>Salvar</button>
                <button className="btn-outline" style={{padding: '8px', fontSize: '14px'}} onClick={() => setShowAddRoute(false)}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div className="setting-item text-accent flex items-center gap-2 cursor-pointer border-none pb-0" onClick={() => setShowAddRoute(true)}>
              <Plus size={18} /> Adicionar rota
            </div>
          )}
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Notificações</h3>
        <div className="settings-card">
          <div className="setting-item flex items-center justify-between">
            <span>Alertas preditivos</span>
            <label className="toggle">
              <input type="checkbox" checked={user.notifPredictive !== false} onChange={() => toggleNotification('notifPredictive')} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item flex items-center justify-between">
            <span>Novos alagamentos na minha rota</span>
            <label className="toggle">
              <input type="checkbox" checked={user.notifRoute !== false} onChange={() => toggleNotification('notifRoute')} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item flex items-center justify-between border-none pb-0">
            <span>Resumo diário</span>
            <label className="toggle">
              <input type="checkbox" checked={user.notifDaily === true} onChange={() => toggleNotification('notifDaily')} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Preferências</h3>
        <div className="settings-card">
          <div className="setting-item flex items-center justify-between">
            <span>Modo Escuro</span>
            <label className="toggle">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item flex items-center justify-between">
            <span>Meio de transporte</span>
            <select 
              className="simple-select text-primary font-semibold text-right" 
              style={{width: 'auto', padding: '0', border: 'none', background: 'transparent'}}
              value={user.transport || 'Carro'}
              onChange={(e) => updatePreference('transport', e.target.value)}
            >
              <option value="Carro">Carro</option>
              <option value="Moto">Moto</option>
              <option value="Bicicleta">Bicicleta</option>
              <option value="A pé">A pé</option>
            </select>
          </div>
          <div className="setting-item flex items-center justify-between border-none pb-0">
            <span>Idioma</span>
            <span className="text-secondary">Português</span>
          </div>
        </div>
      </div>

      {/* NEW: Contatos de Emergência */}
      <div className="settings-section">
        <h3 className="section-title text-danger flex items-center gap-2">
          <Phone size={18} /> SOS Emergência
        </h3>
        <div className="settings-card" style={{ borderColor: 'rgba(231, 76, 60, 0.2)', background: 'rgba(231, 76, 60, 0.05)' }}>
          <div className="setting-item flex items-center justify-between">
            <div>
              <div className="font-semibold text-danger">Defesa Civil</div>
              <div className="caption text-danger opacity-70">Para resgates e alagamentos graves</div>
            </div>
            <a href="tel:199" className="btn-primary flex items-center justify-center gap-1" style={{ width: 'auto', padding: '8px 16px', background: 'var(--danger)', borderRadius: '20px' }}>
              <Phone size={14} /> 199
            </a>
          </div>
          <div className="setting-item flex items-center justify-between border-none pb-0">
            <div>
              <div className="font-semibold text-danger">Corpo de Bombeiros</div>
              <div className="caption text-danger opacity-70">Riscos de vida imediatos</div>
            </div>
            <a href="tel:193" className="btn-outline flex items-center justify-center gap-1 text-danger" style={{ width: 'auto', padding: '8px 16px', borderColor: 'var(--danger)', borderRadius: '20px' }}>
              <Phone size={14} /> 193
            </a>
          </div>
        </div>
      </div>

      <div className="settings-section mb-6">
        <h3 className="section-title">Sobre</h3>
        <div className="settings-card text-center p-6">
          <div className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--gradient-primary)' }}>☂</div>
          <h4 className="mb-1">Rota Seca v1.0</h4>
          <p className="caption mb-3">Projeto acadêmico — ODS 11<br/>Cidades e Comunidades Sustentáveis</p>
          <a href="#" className="text-accent flex items-center justify-center gap-1 text-sm font-semibold">
            Sobre a ODS 11 <ExternalLink size={14} />
          </a>
        </div>
      </div>

    </div>
  );
};

export default Profile;

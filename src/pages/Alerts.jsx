import React from 'react';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import './Alerts.css';

const Alerts = () => {
  const { alerts, clearAlert, clearAllAlerts } = useAppContext();

  const getIcon = (type) => {
    switch(type) {
      case 'critical': return <AlertTriangle color="var(--danger)" />;
      case 'warning': return <AlertTriangle color="var(--alert)" />;
      case 'success': return <CheckCircle color="var(--success)" />;
      case 'info': return <Info color="var(--accent)" />;
      default: return <Info />;
    }
  };

  return (
    <div className="alerts-container animate-fade-in">
      <Header title="Alertas" showBack={true}>
        {alerts.length > 0 && (
          <button className="text-secondary text-sm font-semibold" onClick={clearAllAlerts}>
            Limpar
          </button>
        )}
      </Header>
      
      <div className="alerts-list">
        {alerts.length === 0 ? (
          <div className="flex-col items-center justify-center mt-8 text-secondary opacity-50">
            <CheckCircle size={48} className="mb-2" />
            <p>Nenhum alerta no momento</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div key={alert.id} className={`alert-card glass-card ${alert.type} animate-slide-up`}>
              <div className="alert-icon">
                {getIcon(alert.type)}
              </div>
              <div className="alert-content">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{alert.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="caption">{alert.time}</span>
                    <button className="text-secondary" onClick={() => clearAlert(alert.id)}>
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <p className="body-sm text-secondary">{alert.desc}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerts;

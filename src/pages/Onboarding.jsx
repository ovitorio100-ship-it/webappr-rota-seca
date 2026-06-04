import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Umbrella, ShieldCheck, Map, MapPin, Home, Briefcase } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Onboarding.css';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { onboardingDone, completeOnboarding, addRoute, updatePreference } = useAppContext();
  
  const [bairro, setBairro] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');

  // Redirect to home if already onboarded
  useEffect(() => {
    if (onboardingDone) {
      navigate('/home', { replace: true });
    }
  }, [onboardingDone, navigate]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (bairro) completeOnboarding(bairro);
      if (origem && destino) addRoute(`${origem} → ${destino}`);
      navigate('/home');
    }
  };

  if (onboardingDone) return null; // Avoid flashing the UI while redirecting

  return (
    <div className="onboarding-container animate-fade-in">
      <div className="onboarding-content">
        {step === 1 && (
          <div className="step-1 flex-col items-center justify-center h-full">
            <div className="icon-wrapper" style={{ background: 'var(--gradient-primary)' }}>
              <Umbrella size={80} color="white" />
            </div>
            <h1 className="mt-4">Rota Seca</h1>
            <p className="subtitle text-center mt-2 text-secondary">Navegue com segurança mesmo quando Recife alaga</p>
          </div>
        )}

        {step === 2 && (
          <div className="step-2 flex-col h-full justify-center">
            <h2 className="text-center mb-6">Como funciona</h2>
            <div className="features-list flex-col gap-4">
              <div className="feature-item flex items-center gap-4 glass-card p-4 rounded-xl">
                <div className="feature-icon" style={{ background: 'var(--gradient-alert)' }}><ShieldCheck size={24} color="white" /></div>
                <div className="feature-text text-main font-semibold">Alerta antes da chuva</div>
              </div>
              <div className="feature-item flex items-center gap-4 glass-card p-4 rounded-xl">
                <div className="feature-icon" style={{ background: 'var(--gradient-success)' }}><Map size={24} color="white" /></div>
                <div className="feature-text text-main font-semibold">Rotas seguras em tempo real</div>
              </div>
              <div className="feature-item flex items-center gap-4 glass-card p-4 rounded-xl">
                <div className="feature-icon" style={{ background: 'var(--gradient-primary)' }}><MapPin size={24} color="white" /></div>
                <div className="feature-text text-main font-semibold">Mapa colaborativo</div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-3 flex-col h-full justify-center">
            <h2 className="mb-6">Configuração Inicial</h2>
            
            <div className="form-group mb-4">
              <label className="caption mb-2 block">Seu bairro</label>
              <select value={bairro} onChange={(e) => setBairro(e.target.value)}>
                <option value="" disabled>Selecione seu bairro</option>
                <option value="Boa Viagem">Boa Viagem</option>
                <option value="Casa Forte">Casa Forte</option>
                <option value="Espinheiro">Espinheiro</option>
                <option value="Madalena">Madalena</option>
                <option value="Derby">Derby</option>
              </select>
            </div>

            <div className="form-group mb-6">
              <label className="caption mb-2 block">Rota habitual</label>
              <div className="flex items-center gap-2 mb-2 relative">
                <Home className="input-icon" size={18} color="var(--text-secondary)" />
                <input type="text" placeholder="De onde? (Ex: Casa)" className="with-icon" value={origem} onChange={e => setOrigem(e.target.value)} />
              </div>
              <div className="flex items-center gap-2 relative">
                <Briefcase className="input-icon" size={18} color="var(--text-secondary)" />
                <input type="text" placeholder="Para onde? (Ex: Trabalho)" className="with-icon" value={destino} onChange={e => setDestino(e.target.value)} />
              </div>
            </div>

            <div className="form-group flex items-center justify-between mb-4">
              <span className="body-sm">Permitir notificações</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked onChange={(e) => updatePreference('notifPredictive', e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
            <div className="form-group flex items-center justify-between mb-6">
              <span className="body-sm">Permitir localização</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="onboarding-footer">
        <div className="step-indicators flex justify-center gap-2 mb-6">
          <div className={`indicator ${step === 1 ? 'active' : ''}`} />
          <div className={`indicator ${step === 2 ? 'active' : ''}`} />
          <div className={`indicator ${step === 3 ? 'active' : ''}`} />
        </div>
        <button className="btn-primary pulse-animation-subtle" style={{ background: 'var(--gradient-primary)' }} onClick={handleNext}>
          {step === 1 ? 'Começar' : step === 2 ? 'Próximo' : 'Entrar no Rota Seca'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;

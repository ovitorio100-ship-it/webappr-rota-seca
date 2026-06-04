import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Umbrella, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      loginUser(name, email);
      navigate('/onboarding');
    }
  };

  return (
    <div className="login-container animate-fade-in">
      <div className="login-header">
        <div className="logo-container pulse-animation-subtle">
          <Umbrella size={48} color="white" />
        </div>
        <h1 className="text-white mt-4">Rota Seca</h1>
        <p className="text-white opacity-80 text-center px-6 mt-2">
          Sua navegação inteligente e segura em dias de chuva.
        </p>
      </div>

      <div className="login-form-container glass-card">
        <h2 className="mb-6 text-center">Criar Perfil</h2>
        
        <form onSubmit={handleSubmit} className="flex-col gap-4">
          <div className="input-group">
            <label className="text-sm font-semibold text-secondary mb-1 block">Nome Completo</label>
            <input 
              type="text" 
              placeholder="Ex: João da Silva" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group mb-4">
            <label className="text-sm font-semibold text-secondary mb-1 block">E-mail</label>
            <input 
              type="email" 
              placeholder="Ex: joao@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ background: 'var(--gradient-primary)' }}>
            Começar Agora <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

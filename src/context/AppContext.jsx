import React, { createContext, useState, useContext, useEffect } from 'react';
import { floodPoints as initialFloodPoints, mockAlerts as initialAlerts, userData as initialUserData } from '../data/mockData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [floodPoints, setFloodPoints] = useState(() => {
    const saved = localStorage.getItem('rs_floodPoints');
    return saved ? JSON.parse(saved) : initialFloodPoints;
  });

  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('rs_alerts');
    return saved ? JSON.parse(saved) : initialAlerts;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rs_user');
    return saved ? JSON.parse(saved) : initialUserData;
  });

  const [onboardingDone, setOnboardingDone] = useState(() => {
    return localStorage.getItem('rs_onboarding') === 'true';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('rs_auth') === 'true';
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('rs_darkMode');
    return saved !== null ? saved === 'true' : true; // Default to true
  });

  const [predictiveAlertDismissed, setPredictiveAlertDismissed] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('rs_floodPoints', JSON.stringify(floodPoints));
  }, [floodPoints]);

  useEffect(() => {
    localStorage.setItem('rs_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('rs_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('rs_onboarding', onboardingDone);
  }, [onboardingDone]);

  useEffect(() => {
    localStorage.setItem('rs_darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // Actions
  const addFloodPoint = (point) => {
    const newPoint = {
      ...point,
      id: Date.now(),
      source: 'Usuário',
      probability: 0
    };
    setFloodPoints(prev => [...prev, newPoint]);
    
    // Add an alert for the new point
    addAlert({
      title: 'REPORTE ENVIADO',
      desc: `Seu alerta para ${point.name || 'um novo local'} foi registrado com sucesso.`,
      type: 'success'
    });
  };

  const addAlert = (alert) => {
    const newAlert = {
      ...alert,
      id: Date.now(),
      time: 'agora mesmo'
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const clearAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  const completeOnboarding = (neighborhood) => {
    setUser(prev => ({ ...prev, neighborhood: `${neighborhood}, Recife` }));
    setOnboardingDone(true);
  };

  // Profile actions
  const addRoute = (routeName) => {
    setUser(prev => ({
      ...prev,
      routes: [...prev.routes, { id: Date.now(), name: routeName }]
    }));
  };

  const removeRoute = (id) => {
    setUser(prev => ({
      ...prev,
      routes: prev.routes.filter(r => r.id !== id)
    }));
  };

  const updatePreference = (key, value) => {
    setUser(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const dismissPredictiveAlert = () => {
    setPredictiveAlertDismissed(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const loginUser = (name, email) => {
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    setUser(prev => ({ ...prev, name, email, initials }));
    setIsAuthenticated(true);
    localStorage.setItem('rs_auth', 'true');
  };

  return (
    <AppContext.Provider value={{
      floodPoints, addFloodPoint,
      alerts, addAlert, clearAlert, clearAllAlerts,
      user, addRoute, removeRoute, updatePreference,
      onboardingDone, completeOnboarding,
      predictiveAlertDismissed, dismissPredictiveAlert,
      darkMode, toggleDarkMode,
      isAuthenticated, loginUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

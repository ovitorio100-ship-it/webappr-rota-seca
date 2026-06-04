import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Bell, BarChart2, User } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: <Map size={24} />, label: 'Mapa' },
    { path: '/alerts', icon: <Bell size={24} />, label: 'Alertas' },
    { path: '/ranking', icon: <BarChart2 size={24} />, label: 'Ranking' },
    { path: '/profile', icon: <User size={24} />, label: 'Perfil' },
  ];

  // Do not show BottomNav on onboarding, alternate route, or report pages
  const hidePaths = ['/', '/route', '/report'];
  if (hidePaths.includes(location.pathname)) return null;

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          {item.icon}
          <span className="nav-label">{item.label}</span>
          {item.path === '/alerts' && <span className="badge">3</span>}
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;

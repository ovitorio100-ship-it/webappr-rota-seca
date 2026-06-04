import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './Header.css';

const Header = ({ title, subtitle, showBack = false, transparent = false, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={`app-header ${transparent ? 'transparent' : ''}`}>
      <div className="header-left">
        {showBack && (
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
        )}
      </div>
      
      <div className="header-center">
        {title && <h2 className="header-title">{title}</h2>}
        {subtitle && <span className="header-subtitle">{subtitle}</span>}
      </div>

      <div className="header-right">
        {children}
      </div>
    </header>
  );
};

export default Header;

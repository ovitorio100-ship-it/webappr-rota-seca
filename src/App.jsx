import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Onboarding from './pages/Onboarding';
import HomeMap from './pages/HomeMap';
import Alerts from './pages/Alerts';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import Report from './pages/Report';
import AlternativeRoute from './pages/AlternativeRoute';
import ActiveNavigation from './pages/ActiveNavigation';
import Login from './pages/Login';
import { useAppContext } from './context/AppContext';
import './App.css';

function MainLayout() {
  const { pathname } = window.location;
  const hideBottomNav = pathname === '/onboarding' || pathname === '/login' || pathname === '/';
  
  return (
    <>
      <div className="content-area">
        <Routes>
          <Route path="/" element={<Navigate to={useAppContext().isAuthenticated ? (useAppContext().onboardingDone ? "/home" : "/onboarding") : "/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<HomeMap />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/report" element={<Report />} />
          <Route path="/route" element={<AlternativeRoute />} />
          <Route path="/navigate" element={<ActiveNavigation />} />
        </Routes>
      </div>
      {!hideBottomNav && <BottomNav />}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <MainLayout />
      </div>
    </Router>
  );
}

export default App;

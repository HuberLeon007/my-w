'use client';

import { useState } from 'react';
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';
import ForecastView from './components/ForecastView';

export default function Home() {
  const [currentView, setCurrentView] = useState('home');

  const handleViewChange = (viewId) => {
    setCurrentView(viewId);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'forecast':
        return <ForecastView onBack={handleBackToHome} />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navigation 
        currentView={currentView} 
        onViewChange={handleViewChange} 
      />
      {renderCurrentView()}
    </div>
  );
}

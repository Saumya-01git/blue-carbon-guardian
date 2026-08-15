import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { LocationDetail } from './pages/LocationDetail';
import { ClimateComparison } from './pages/ClimateComparison';
import { EnvironmentalReporting } from './pages/EnvironmentalReporting';
import { PlantRestore } from './pages/PlantRestore';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { FutureMLPage } from './pages/FutureMLPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { useAuthStore } from './hooks/useAuthStore';
import { useDataStore } from './hooks/useDataStore';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Dark / Light Theme state management
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('blue_carbon_theme');
      return saved || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    const bodyClass = document.body.classList;
    bodyClass.remove('dark', 'light');
    bodyClass.add(theme);
    localStorage.setItem('blue_carbon_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const { user, login, register, logout } = useAuthStore();
  const {
    locations,
    environmentalData,
    dataSources,
    mlPipeline,
    fsiMangroveTrends,
    cycloneHistory,
    reports,
    plantations,
    loading,
    error,
    addReport,
    addPlantation,
    getLocationData
  } = useDataStore();

  const handleSelectLocation = (locId) => {
    setSelectedLocationId(locId);
    setActiveTab('location-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setSelectedLocationId(null);
    setActiveTab('dashboard');
  };

  const selectedLocData = selectedLocationId ? getLocationData(selectedLocationId) : null;

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 relative overflow-x-hidden">
      {/* VIBRANT HIGH-CONTRAST TAMIL NADU MANGROVE & TROPICAL COASTAL BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* High-Contrast Vivid Lush Mangrove Lagoon Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-vibrant-pan filter brightness-115 saturate-180 opacity-65 dark:opacity-75 light:opacity-40 transition-all duration-700"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=80')`
          }}
        />

        {/* Tropical Sunlit Emerald Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#022c22]/40 via-[#064e3b]/25 to-[#01140e]/60 dark:from-[#022c22]/40 dark:via-[#064e3b]/25 dark:to-[#01140e]/60 light:from-[#f0fdf4]/80 light:via-[#d1fae5]/70 light:to-[#f0fdf4]/85" />

        {/* Vibrant Floating Sun Glimmer & Emerald Water Light Blobs */}
        <div className="absolute top-10 left-1/4 w-[32rem] h-[32rem] bg-amber-400/30 dark:bg-amber-400/35 light:bg-amber-300/25 rounded-full blur-3xl animate-sun-glimmer pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-[36rem] h-[36rem] bg-emerald-400/35 dark:bg-emerald-400/40 light:bg-emerald-300/30 rounded-full blur-3xl animate-emerald-pulse pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-400/30 dark:bg-cyan-400/35 light:bg-cyan-300/25 rounded-full blur-3xl animate-sun-glimmer pointer-events-none" />
      </div>

      {/* Main App Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'location-detail') setSelectedLocationId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={logout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main Content View */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="text-sm font-mono text-emerald-400">Loading verified open-data records...</div>
            </div>
          ) : error ? (
            <div className="py-20 text-center text-rose-400 text-sm">
              {error}
            </div>
          ) : (
            <>
              {activeTab === 'landing' && (
                <LandingPage
                  onExplore={() => setActiveTab('dashboard')}
                  onOpenAuth={() => setIsAuthOpen(true)}
                  user={user}
                />
              )}

              {activeTab === 'dashboard' && (
                <Dashboard
                  locations={locations}
                  user={user}
                  onSelectLocation={handleSelectLocation}
                  dataSourcesCount={dataSources.length}
                />
              )}

              {activeTab === 'location-detail' && selectedLocData && (
                <LocationDetail
                  location={selectedLocData.location}
                  records={selectedLocData.records}
                  fsiLocationTrends={selectedLocData.fsiLocationTrends}
                  locationCyclones={selectedLocData.locationCyclones}
                  onBack={handleBackToDashboard}
                  onNavigateToSources={() => setActiveTab('data-sources')}
                />
              )}

              {activeTab === 'explore-climate' && (
                <ClimateComparison
                  locations={locations}
                  environmentalData={environmentalData}
                  fsiMangroveTrends={fsiMangroveTrends}
                  cycloneHistory={cycloneHistory}
                />
              )}

              {activeTab === 'environmental-reporting' && (
                <EnvironmentalReporting
                  locations={locations}
                  reports={reports}
                  onAddReport={addReport}
                  user={user}
                />
              )}

              {activeTab === 'plant-restore' && (
                <PlantRestore
                  locations={locations}
                  plantations={plantations}
                  onAddPlantation={addPlantation}
                  user={user}
                />
              )}

              {activeTab === 'glossary' && (
                <GlossaryPage />
              )}

              {activeTab === 'data-sources' && (
                <DataSourcesPage dataSources={dataSources} />
              )}

              {activeTab === 'future-ml' && (
                <FutureMLPage mlSchema={mlPipeline} />
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={login}
        onRegister={register}
      />
    </div>
  );
}

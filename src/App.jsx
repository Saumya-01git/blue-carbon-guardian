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
import { ScrollToTop } from './components/ScrollToTop';
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
      {/* SOLID HIGH-CONTRAST PRESENTATION CANVAS (Zero muddy translucency, optimized for projectors) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Solid Deep Dark Canvas */}
        <div className="absolute inset-0 bg-[#040d12] dark:bg-[#040d12] light:bg-[#f8fafc]" />

        {/* Crisp Top Ambient Vignette (No noisy photos, no moving fish) */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent dark:from-emerald-950/20 dark:via-transparent light:from-slate-200/40 light:via-transparent" />
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

        {/* Main Content View with Expanded 1600px Width for Projector Presentation */}
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-6">
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

      {/* Floating Back-To-Top Button */}
      <ScrollToTop />
    </div>
  );
}

import React from 'react';
import { Shield, Map, BarChart3, Database, FileText, TreePine, Cpu, LogOut, LogIn, BookOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar({ activeTab, setActiveTab, user, onOpenAuth, onLogout, theme, onToggleTheme }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Map className="w-3.5 h-3.5 mr-1 shrink-0" /> },
    { id: 'explore-climate', label: 'Explore Climate', icon: <BarChart3 className="w-3.5 h-3.5 mr-1 shrink-0" /> },
    { id: 'environmental-reporting', label: 'Community Reporting', icon: <FileText className="w-3.5 h-3.5 mr-1 shrink-0" /> },
    { id: 'plant-restore', label: 'Plant / Restore', icon: <TreePine className="w-3.5 h-3.5 mr-1 shrink-0" /> },
    { id: 'glossary', label: 'Glossary & Terms', icon: <BookOpen className="w-3.5 h-3.5 mr-1 shrink-0" /> },
    { id: 'data-sources', label: 'Data Sources', icon: <Database className="w-3.5 h-3.5 mr-1 shrink-0" /> },
    { id: 'future-ml', label: 'Future AI Pipeline', icon: <Cpu className="w-3.5 h-3.5 mr-1 shrink-0" /> }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 dark:bg-slate-950/90 light:bg-white/90 backdrop-blur-md border-b border-slate-800 light:border-slate-200 shadow-lg">
      <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Logo */}
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-2 text-left cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 light:from-emerald-700 light:via-teal-700 light:to-cyan-800 bg-clip-text text-transparent tracking-tight">
                BLUE CARBON GUARDIAN
              </span>
              <span className="block text-[9px] text-slate-400 light:text-slate-600 uppercase tracking-widest font-mono">
                Academic Project — Tamil Nadu, India
              </span>
            </div>
          </button>

          {/* Flexible Horizontal Nav Bar with Smooth Scrolling Protection */}
          <nav className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-1 min-w-0 max-w-full">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2 py-1.5 rounded-lg text-xs xl:text-[13.5px] font-medium flex items-center whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  activeTab === item.id
                    ? 'bg-emerald-950/70 text-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 light:bg-emerald-100 light:text-emerald-800 border border-emerald-600/40 shadow-sm font-semibold'
                    : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-900 dark:hover:bg-slate-900 light:hover:bg-slate-100'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Section: Theme Toggle & User Auth */}
          <div className="flex items-center space-x-2 shrink-0">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1.5 bg-slate-900 light:bg-slate-100 px-2.5 py-1 rounded-full border border-slate-800 light:border-slate-300">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover border border-emerald-500"
                  />
                  <span className="text-xs font-medium text-slate-200 light:text-slate-800">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-emerald-950/40 flex items-center cursor-pointer transition-all shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 mr-1" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

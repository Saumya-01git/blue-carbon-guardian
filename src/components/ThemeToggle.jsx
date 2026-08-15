import React from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ theme, onToggleTheme }) {
  return (
    <button
      onClick={onToggleTheme}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="p-2 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-slate-200 border border-slate-700 light:border-slate-300 text-amber-400 dark:text-amber-400 light:text-indigo-600 hover:scale-105 transition-all cursor-pointer"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600" />
      )}
    </button>
  );
}

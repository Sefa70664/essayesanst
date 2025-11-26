import React from 'react';
import { Home, Tv, Film, Clapperboard, Heart, Settings, Info, MonitorPlay } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'live', icon: Tv, label: 'Live TV' },
    { id: 'movies', icon: Film, label: 'Films' },
    { id: 'series', icon: Clapperboard, label: 'Séries' },
    { id: 'favorites', icon: Heart, label: 'Favoris' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
    { id: 'about', icon: Info, label: 'À Propos' },
  ];

  const handleNav = (id: string) => {
    onChangeView(id as ViewState);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white/95 dark:bg-[#020617]/95 border-r border-slate-200 dark:border-slate-800/50 backdrop-blur-xl
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-slate-200 dark:border-slate-800/50">
          <MonitorPlay className="w-8 h-8 text-blue-600 dark:text-blue-500 mr-3" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent tracking-wide">
            SEFINITY
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`
                  w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-500 shadow-sm dark:shadow-[0_0_20px_rgba(37,99,235,0.15)]' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }
                `}
              >
                <Icon 
                  size={20} 
                  className={`mr-3 transition-colors ${isActive ? 'text-blue-600 dark:text-blue-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-white'}`} 
                />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800/50">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 text-xs text-slate-500 text-center border border-slate-200 dark:border-slate-800">
            <p>Premium Account</p>
            <p className="text-emerald-600 dark:text-emerald-500 mt-1">● Connected</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
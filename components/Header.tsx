import React from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  return (
    <header className="sticky top-0 z-30 h-20 px-6 flex items-center justify-between bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/50 transition-colors duration-300">
      
      {/* Left: Mobile Menu Trigger & Search */}
      <div className="flex items-center flex-1 gap-4">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="relative group max-w-md w-full hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Rechercher des films, séries, chaînes..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-800 rounded-full leading-5 bg-slate-100 dark:bg-slate-900/50 text-slate-800 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 sm:text-sm transition-all"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#020617]"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800/50 cursor-pointer group">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-700 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">John Doe</p>
            <p className="text-xs text-slate-500">Premium</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
               <User className="text-slate-400 dark:text-slate-300" size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
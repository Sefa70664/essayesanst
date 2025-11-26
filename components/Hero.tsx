import React from 'react';
import { Play, Info } from 'lucide-react';
import { MediaItem } from '../types';

interface HeroProps {
  item: MediaItem;
  onPlay: (item: MediaItem) => void;
}

const Hero: React.FC<HeroProps> = ({ item, onPlay }) => {
  return (
    <div className="relative w-full h-[65vh] sm:h-[80vh] overflow-hidden rounded-b-3xl sm:rounded-none">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
        style={{ backgroundImage: `url(${item.backdrop})` }}
      />
      
      {/* Gradient Overlay - Adaptive theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent dark:from-[#020617] dark:via-[#020617]/40 dark:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/80 via-transparent to-transparent dark:from-[#020617]/90 dark:via-transparent dark:to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl flex flex-col gap-4">
        <span className="inline-block px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-xs font-bold rounded uppercase tracking-wider w-fit">
          Top #1 Today
        </span>
        
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight drop-shadow-xl">
          {item.title}
        </h1>
        
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 text-sm font-medium">
          <span className="text-emerald-600 dark:text-green-400 font-bold">{item.rating} Match</span>
          <span>{item.year}</span>
          <span className="border border-slate-400 dark:border-slate-500 px-1 rounded text-xs">HD</span>
          <span>{item.duration}</span>
        </div>

        <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg line-clamp-3 md:line-clamp-none drop-shadow-md max-w-lg">
          {item.description}
        </p>

        <div className="flex items-center gap-4 mt-4">
          <button 
            onClick={() => onPlay(item)}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30"
          >
            <Play size={24} fill="currentColor" />
            <span>Regarder</span>
          </button>
          
          <button className="flex items-center gap-2 px-8 py-3 bg-white/60 dark:bg-slate-600/40 hover:bg-white/80 dark:hover:bg-slate-600/60 backdrop-blur-md text-slate-900 dark:text-white font-semibold rounded-lg transition-all duration-300">
            <Info size={24} />
            <span>Plus d'infos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
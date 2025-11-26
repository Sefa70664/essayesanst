import React from 'react';
import { Play, Plus } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onPlay: (item: MediaItem) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onPlay }) => {
  return (
    <div 
      className="group relative flex-none w-[160px] md:w-[220px] aspect-[2/3] bg-slate-200 dark:bg-slate-900 rounded-lg overflow-hidden transition-all duration-300 hover:z-20 hover:scale-105 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer"
      onClick={() => onPlay(item)}
    >
      <img 
        src={item.poster} 
        alt={item.title}
        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-40"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
        <div className="absolute inset-0 flex items-center justify-center -translate-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play size={24} fill="currentColor" className="ml-1" />
          </div>
        </div>

        <div className="relative translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-bold text-sm leading-tight mb-1 drop-shadow-md">{item.title}</h3>
          <div className="flex items-center justify-between text-[10px] text-slate-200 font-medium">
            <span>{item.year}</span>
            <span className="px-1 py-0.5 border border-slate-400 rounded bg-black/50">{item.rating}</span>
          </div>
          <div className="mt-2 flex gap-2">
            <button className="flex-1 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded text-[10px] text-white font-semibold flex items-center justify-center gap-1 transition-colors">
              <Plus size={12} /> List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
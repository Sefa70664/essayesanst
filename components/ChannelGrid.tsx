import React from 'react';
import { ChannelItem } from '../types';
import { Play, Radio } from 'lucide-react';

interface ChannelGridProps {
  channels: ChannelItem[];
  onPlay: (channel: ChannelItem) => void;
}

const ChannelGrid: React.FC<ChannelGridProps> = ({ channels, onPlay }) => {
  return (
    <div className="p-8 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="w-2 h-8 bg-red-600 rounded-full inline-block animate-pulse"></span>
          Chaînes en Direct
        </h2>
        <div className="flex items-center gap-2 text-sm text-slate-500">
           <span className="w-2 h-2 rounded-full bg-green-500"></span>
           {channels.length} chaînes actives
        </div>
      </div>
      
      {/* Grid Layout: Adapted for 16:9 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {channels.map((channel) => (
          <div 
            key={channel.id}
            onClick={() => onPlay(channel)}
            className="group relative aspect-video bg-slate-900 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl dark:hover:shadow-[0_0_25px_rgba(37,99,235,0.2)] transition-all duration-300 transform hover:scale-[1.03] border border-slate-200 dark:border-slate-800"
          >
            {/* Background Preview Image */}
            <img 
              src={channel.preview} 
              alt={channel.currentProgram}
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />

            {/* LIVE Badge */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-red-600/90 backdrop-blur-sm rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
              <Radio size={10} className="animate-pulse" />
              Direct
            </div>

            {/* Logo Badge (Top Right) */}
            <div className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-xs shadow-lg">
              {channel.logo}
            </div>

            {/* Dark Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Content Info (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              {/* Progress Bar Simulation */}
              <div className="w-full h-1 bg-white/20 rounded-full mb-3 overflow-hidden">
                 <div className="h-full bg-red-600 w-2/3" style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}></div>
              </div>

              <h3 className="text-white font-bold text-lg leading-tight mb-1 drop-shadow-md line-clamp-1 group-hover:text-blue-400 transition-colors">
                {channel.currentProgram}
              </h3>
              <div className="flex items-center justify-between text-slate-300 text-xs font-medium">
                <span>{channel.name}</span>
                <span className="px-1.5 py-0.5 border border-slate-500 rounded bg-black/40 text-[10px]">HD</span>
              </div>
            </div>

            {/* Play Button Overlay (Center) - Visible on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 bg-black/20 backdrop-blur-[1px]">
              <div className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                <Play size={28} fill="currentColor" className="ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelGrid;
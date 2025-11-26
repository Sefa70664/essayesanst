
export interface MediaItem {
  id: number;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  type: 'movie' | 'series';
  rating: number;
  year: number;
  duration?: string;
  sourceUrl?: string; // New field for real playback
}

export interface ChannelItem {
  id: number;
  name: string;
  logo: string;
  category: string;
  currentProgram?: string;
  preview?: string;
  sourceUrl?: string; // New field for real playback
}

export interface UserSettings {
  streamMode: 'm3u' | 'xtream';
  m3uUrl: string;
  xtreamUrl: string;
  xtreamUser: string;
  xtreamPass: string;
  darkMode: boolean;
  useProxy: boolean; // New setting for CORS
}

export type ViewState = 'home' | 'live' | 'movies' | 'series' | 'favorites' | 'settings' | 'about';


import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import MediaCard from './components/MediaCard';
import VideoPlayer from './components/VideoPlayer';
import ChannelGrid from './components/ChannelGrid';
import Settings from './components/Settings';
import About from './components/About';
import { ViewState, MediaItem, ChannelItem, UserSettings } from './types';
import { MOCK_MOVIES, MOCK_SERIES, MOCK_CHANNELS, DEFAULT_M3U } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<MediaItem | ChannelItem | null>(null);
  
  // Data State (Starts with Mocks, populated by Real M3U later)
  const [movies, setMovies] = useState<MediaItem[]>(MOCK_MOVIES);
  const [series, setSeries] = useState<MediaItem[]>(MOCK_SERIES);
  const [channels, setChannels] = useState<ChannelItem[]>(MOCK_CHANNELS);
  
  // Settings State
  const [userSettings, setUserSettings] = useState<UserSettings>({
    streamMode: 'm3u',
    m3uUrl: DEFAULT_M3U,
    xtreamUrl: '',
    xtreamUser: '',
    xtreamPass: '',
    darkMode: true,
    useProxy: false
  });

  const handlePlay = (item: MediaItem | ChannelItem) => {
    setActiveMedia(item);
  };

  const handlePlaylistLoaded = (data: { channels: ChannelItem[], movies: MediaItem[], series: MediaItem[] }) => {
     setChannels(data.channels);
     setMovies(data.movies);
     setSeries(data.series);
     setCurrentView('home'); // Redirect to home to see new content
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="pb-20">
            <Hero item={movies.length > 0 ? movies[0] : MOCK_MOVIES[0]} onPlay={handlePlay} />
            
            <div className="px-8 mt-[-4rem] relative z-10 space-y-12">
              <section>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 pl-1 border-l-4 border-blue-600 dark:border-blue-500">
                   {movies.length > 5 ? 'Films Récents' : 'Récemment Ajoutés'}
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-8 pt-2 scrollbar-hide">
                  {movies.slice(0, 20).map(movie => (
                    <MediaCard key={movie.id} item={movie} onPlay={handlePlay} />
                  ))}
                  {movies.length === 0 && <p className="text-slate-500">Aucun film chargé.</p>}
                </div>
              </section>

              <section>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 pl-1 border-l-4 border-blue-600 dark:border-blue-500">
                    {series.length > 5 ? 'Séries Populaires' : 'Séries'}
                 </h3>
                 <div className="flex gap-4 overflow-x-auto pb-8 pt-2 scrollbar-hide">
                  {series.slice(0, 20).map(s => (
                    <MediaCard key={s.id} item={s} onPlay={handlePlay} />
                  ))}
                  {series.length === 0 && <p className="text-slate-500">Aucune série chargée.</p>}
                </div>
              </section>
            </div>
          </div>
        );
      
      case 'live':
        return <ChannelGrid channels={channels} onPlay={handlePlay} />;
      
      case 'movies':
        return (
          <div className="p-8 pb-20">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Films ({movies.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movies.map((movie) => (
                <div key={movie.id} className="w-full">
                   <MediaCard item={movie} onPlay={handlePlay} />
                </div>
              ))}
            </div>
          </div>
        );

      case 'series':
          return (
            <div className="p-8 pb-20">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Séries TV ({series.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {series.map((s) => (
                  <div key={s.id} className="w-full">
                     <MediaCard item={s} onPlay={handlePlay} />
                  </div>
                ))}
              </div>
            </div>
          );

      case 'favorites':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
            <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-full mb-4">
               <span className="text-4xl">💔</span>
            </div>
            <p className="text-xl">Aucun favori pour le moment.</p>
          </div>
        );

      case 'settings':
        return (
            <Settings 
                settings={userSettings} 
                onSave={setUserSettings} 
                onPlaylistLoaded={handlePlaylistLoaded}
            />
        );

      case 'about':
        return <About />;
        
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden text-slate-900 dark:text-white selection:bg-blue-500 selection:text-white font-sans ${userSettings.darkMode ? 'dark' : ''}`}>
      
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
        {/* Background Gradient Layer for dark mode depth, hidden in light mode or replaced */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-[#020617] dark:to-[#0f172a] -z-10" />

        <Header toggleMobileMenu={() => setIsMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-blue-900 scrollbar-track-transparent">
          {renderContent()}
        </main>
      </div>

      {activeMedia && (
        <VideoPlayer 
          item={activeMedia} 
          onClose={() => setActiveMedia(null)} 
        />
      )}
    </div>
  );
};

export default App;

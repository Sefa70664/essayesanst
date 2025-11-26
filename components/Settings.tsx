
import React, { useState } from 'react';
import { UserSettings, ChannelItem, MediaItem } from '../types';
import { Save, Server, Link, Power, CheckCircle, RefreshCw, Moon, Sun, ShieldAlert } from 'lucide-react';
import { parseM3U } from '../utils';

interface SettingsProps {
  settings: UserSettings;
  onSave: (settings: UserSettings) => void;
  onPlaylistLoaded: (data: { channels: ChannelItem[], movies: MediaItem[], series: MediaItem[] }) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onSave, onPlaylistLoaded }) => {
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  const [activeTab, setActiveTab] = useState<'m3u' | 'xtream'>(settings.streamMode);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field: keyof UserSettings, value: string | boolean) => {
    const newSettings = { ...localSettings, [field]: value };
    setLocalSettings(newSettings);
    // Auto save theme changes immediately
    if (field === 'darkMode') {
       onSave(newSettings);
    }
  };

  const handleConnect = async () => {
    if (!localSettings.m3uUrl && activeTab === 'm3u') return;

    setIsLoading(true);
    setStatus('idle');
    setErrorMsg('');
    
    try {
      let urlToFetch = localSettings.m3uUrl;
      
      // Use CORS proxy if enabled
      if (localSettings.useProxy) {
        urlToFetch = `https://api.allorigins.win/raw?url=${encodeURIComponent(localSettings.m3uUrl)}`;
      }

      const response = await fetch(urlToFetch);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const text = await response.text();
      
      if (!text.includes('#EXTM3U')) {
        throw new Error("Ce n'est pas un fichier M3U valide (#EXTM3U manquant).");
      }

      const parsedData = parseM3U(text);

      if (parsedData.channels.length === 0 && parsedData.movies.length === 0) {
        throw new Error("Aucun contenu trouvé dans la playlist.");
      }

      // Success
      onPlaylistLoaded(parsedData);
      onSave({ ...localSettings, streamMode: activeTab });
      setStatus('success');

    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message || "Erreur de connexion. Essayez d'activer le mode Proxy.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Paramètres Général</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Configurez votre source de contenu IPTV.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Tabs */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setActiveTab('m3u')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'm3u' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Link size={18} />
              <div className="text-left">
                <span className="block font-semibold text-sm">Playlist M3U</span>
                <span className="block text-[10px] opacity-70">URL directe</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('xtream')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mt-2 transition-all ${
                activeTab === 'xtream' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Server size={18} />
              <div className="text-left">
                <span className="block font-semibold text-sm">Xtream Codes</span>
                <span className="block text-[10px] opacity-70">API Login</span>
              </div>
            </button>
          </div>

          <div className="bg-white dark:bg-[#0f172a] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {localSettings.darkMode ? <Moon size={16} className="text-blue-500" /> : <Sun size={16} className="text-orange-500" />}
                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Dark Mode</span>
              </div>
              <button 
                className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out relative ${localSettings.darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
                onClick={() => handleChange('darkMode', !localSettings.darkMode)}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 shadow-md ${localSettings.darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-[#0f172a] p-8 rounded-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-sm">
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

            {activeTab === 'm3u' ? (
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-600/10 rounded-lg text-blue-600 dark:text-blue-500">
                    <Link size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Connexion M3U</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Collez le lien de votre playlist ci-dessous.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">URL de la Playlist</label>
                  <input 
                    type="text" 
                    value={localSettings.m3uUrl}
                    onChange={(e) => handleChange('m3uUrl', e.target.value)}
                    placeholder="http://example.com/playlist.m3u"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-400 dark:placeholder-slate-600"
                  />
                  <div className="flex justify-between items-start">
                     <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <CheckCircle size={12} className="text-emerald-500" />
                        Formats supportés: .m3u, .m3u8
                     </p>
                  </div>
                </div>

                {/* Proxy Toggle for CORS */}
                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg">
                    <ShieldAlert className="text-yellow-600 dark:text-yellow-500 shrink-0" size={20} />
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-500">Mode Proxy (Anti-CORS)</p>
                        <p className="text-[10px] text-yellow-700 dark:text-yellow-400 opacity-80">Activez si le chargement échoue ou reste bloqué.</p>
                    </div>
                    <button 
                        className={`w-10 h-5 rounded-full transition-colors duration-200 ease-in-out relative ${localSettings.useProxy ? 'bg-yellow-500' : 'bg-slate-300'}`}
                        onClick={() => handleChange('useProxy', !localSettings.useProxy)}
                    >
                        <span className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform duration-200 shadow-sm ${localSettings.useProxy ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>

              </div>
            ) : (
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-blue-600/10 rounded-lg text-blue-600 dark:text-blue-500">
                    <Server size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Xtream Codes API</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Connectez-vous via votre fournisseur.</p>
                  </div>
                </div>
                 <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded text-sm text-center text-slate-500">
                    Bientôt disponible dans cette démo. Utilisez M3U pour l'instant.
                 </div>
              </div>
            )}

            {status === 'error' && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg text-red-600 dark:text-red-400 text-sm">
                    {errorMsg}
                </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="text-sm">
                   {status === 'success' && <span className="text-emerald-500 font-medium animate-pulse">Playlist chargée avec succès !</span>}
                </div>
                <button 
                  onClick={handleConnect}
                  disabled={isLoading}
                  className={`
                    flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all
                    ${isLoading ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 hover:scale-105 active:scale-95'}
                  `}
                >
                  {isLoading ? (
                    <>
                       <RefreshCw size={20} className="animate-spin" />
                       Chargement...
                    </>
                  ) : (
                    <>
                      <Power size={20} />
                      Charger la Playlist
                    </>
                  )}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

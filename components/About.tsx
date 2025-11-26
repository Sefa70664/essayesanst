import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">À Propos</h1>
      <div className="bg-white dark:bg-[#0f172a] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full shadow-xl dark:shadow-2xl">
        <div className="mb-6">
           <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">SEFINITY</span>
           <span className="ml-2 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-xs rounded border border-blue-200 dark:border-blue-800">v2.0.1</span>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Sefinity est une interface de démonstration moderne pour les services IPTV, conçue avec les dernières technologies Web pour offrir une expérience utilisateur fluide et cinématographique.
        </p>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-2 text-sm text-slate-500">
           <p>© 2024 Sefinity Technologies.</p>
           <p>Développé avec React, TypeScript & Tailwind CSS.</p>
           <p className="text-xs mt-4 opacity-50">Ceci est une démo. Aucun contenu réel n'est hébergé.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
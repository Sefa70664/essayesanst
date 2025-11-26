
import { ChannelItem, MediaItem } from './types';

export const parseM3U = (content: string): { channels: ChannelItem[], movies: MediaItem[], series: MediaItem[] } => {
  const lines = content.split('\n');
  const channels: ChannelItem[] = [];
  const movies: MediaItem[] = [];
  const series: MediaItem[] = [];

  let currentItem: any = {};

  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith('#EXTINF:')) {
      // Parse metadata
      const info = line.substring(8);
      const params: string[] = info.match(/([a-zA-Z0-9-]+)="([^"]*)"/g) || [];
      
      const metadata: any = {};
      params.forEach(param => {
        const [key, val] = param.split('=');
        metadata[key.replace(/"/g, '')] = val.replace(/"/g, '');
      });

      // Extract Name (after the last comma)
      const nameParts = info.split(',');
      const name = nameParts[nameParts.length - 1].trim();

      currentItem = {
        id: Date.now() + Math.random(),
        name: name,
        logo: metadata['tvg-logo'] || '',
        group: metadata['group-title'] || 'General',
        tvgId: metadata['tvg-id']
      };
    } else if (line.startsWith('http')) {
      // It's a URL
      if (currentItem.name) {
        const groupLower = (currentItem.group || '').toLowerCase();
        
        // Simple heuristics to categorize content
        if (groupLower.includes('movie') || groupLower.includes('film') || groupLower.includes('vod')) {
            movies.push({
                id: currentItem.id,
                title: currentItem.name,
                description: `Catégorie: ${currentItem.group}`,
                poster: currentItem.logo || 'https://via.placeholder.com/300x450?text=No+Poster',
                backdrop: 'https://via.placeholder.com/1920x1080?text=Cinema', // Placeholder
                type: 'movie',
                rating: 0,
                year: new Date().getFullYear(),
                sourceUrl: line
            });
        } else if (groupLower.includes('series') || groupLower.includes('série')) {
            series.push({
                id: currentItem.id,
                title: currentItem.name,
                description: `Catégorie: ${currentItem.group}`,
                poster: currentItem.logo || 'https://via.placeholder.com/300x450?text=No+Poster',
                backdrop: 'https://via.placeholder.com/1920x1080?text=Series',
                type: 'series',
                rating: 0,
                year: new Date().getFullYear(),
                sourceUrl: line
            });
        } else {
            // Default to Live TV
            channels.push({
                id: currentItem.id,
                name: currentItem.name,
                logo: currentItem.logo || 'TV',
                category: currentItem.group,
                currentProgram: 'Programme en cours', // No EPG parser yet
                preview: 'https://via.placeholder.com/600x340?text=Live+TV',
                sourceUrl: line
            });
        }
        currentItem = {}; // Reset
      }
    }
  });

  return { channels, movies, series };
};
